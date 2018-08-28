import { Keyboard, Sprite, TileSprite, Input, Game } from "phaser-ce";
import VectorMath from "../math/VectorMath";
import { Vector2 } from "../math/VectorMath";

export default class Player {
	public playerVelocity: Vector2;
	public playerLife: number;

	public playerSprite: Phaser.Sprite;
	public bulletSprite: Phaser.Sprite;
	public lifeSprite: Phaser.Sprite;

	private mouseTemp: Vector2 = { x: 0, y: 0 };
	private nextFire: number = 0;
	private lifeGroup: Phaser.Group;
	private bulletGroup: Phaser.Group;
	private vectorMath: VectorMath;
	private game: Game;

	// Import game scene data into Player.ts
	constructor(game: Game) {
		this.game = game;
		this.vectorMath = new VectorMath();
		// Create a click listener to request to hide the mouse pointer if clicked
		this.game.canvas.addEventListener('mousedown', () => {
			this.game.input.mouse.requestPointerLock();
		});
	}

	create() {
		this.AddPlayer();
		this.LoadPlayerAnim();
		this.CreatePlayerLife(3);
		this.CreateBullet();
	}

	update() {
		this.PlayerMovement();
		this.PlayerAttack();
		if(this.game.input.keyboard.isDown(Keyboard.Q))this.PlayerHurt();
	}

	LoadPlayerAnim() {
		this.playerSprite.animations.add("idle", ["player_idle1"], 10, true, false);
		this.playerSprite.animations.add("attack", ["player_atk1", "player_atk2"], 5, false, false);
		//this.playerSprite.animations.add("death", ["player_death1"], 5, false, false);
	}

	PlayerMovement() {
		const playerSpeed: Vector2 = { x: 20, y: 20 }; //speed of player acceleration
		const maxPlayerSpeed: number = 200;
		const minPlayerSpeed: number = -200;

		this.playerVelocity = this.playerSprite.body.velocity;

		// Limit the max and min speed of player
		this.playerVelocity.x = Phaser.Math.clamp(this.playerVelocity.x, minPlayerSpeed, maxPlayerSpeed);
		this.playerVelocity.y = Phaser.Math.clamp(this.playerVelocity.y, minPlayerSpeed, maxPlayerSpeed);

		// Use keyboard controll if the mouse pointer is not hidden
		if (!this.game.input.mouse.locked) {
			if (this.game.input.keyboard.isDown(Keyboard.RIGHT)) this.playerVelocity.x += playerSpeed.x;
			if (this.game.input.keyboard.isDown(Keyboard.LEFT)) this.playerVelocity.x -= playerSpeed.x;
			if (this.game.input.keyboard.isDown(Keyboard.UP)) this.playerVelocity.y -= playerSpeed.y;
			if (this.game.input.keyboard.isDown(Keyboard.DOWN)) this.playerVelocity.y += playerSpeed.y;
		}
		// Use mouse controll if the mouse point is hidden (NOT FINISHED,still buggy)
		else if (this.game.input.mouse.locked) {
			//this.game.physics.arcade.moveToPointer(this.player, maxPlayerSpeed);
			let mouse: Vector2 = {
				x: this.game.input.mouse.input.activePointer.movementX,
				y: this.game.input.mouse.input.activePointer.movementY
			}

			let mouseDirection: Vector2 = {
				x: Phaser.Math.clamp(mouse.x, -1, 1),
				y: Phaser.Math.clamp(mouse.y, -1, 1)
			};

			if (mouse.x > this.mouseTemp.x) mouseDirection.x++;
			else if (mouse.x < this.mouseTemp.x) mouseDirection.x--;
			else if (mouse.x == this.mouseTemp.x)
				this.vectorMath.ResetVelocityWithinTime(mouseDirection, .1, 0);

			if (mouse.y > this.mouseTemp.y) mouseDirection.y++;
			else if (mouse.y < this.mouseTemp.y) mouseDirection.y--;
			else if (mouse.y == this.mouseTemp.y)
				this.vectorMath.ResetVelocityWithinTime(mouseDirection, 0, .1);

			this.playerVelocity.x += mouseDirection.x * playerSpeed.x;
			this.playerVelocity.y += mouseDirection.y * playerSpeed.y;

			this.mouseTemp = mouse;
			//
			//console.log(mouseDirection);
			/**if (Phaser.Rectangle.contains(this.player.body, this.game.input.x, this.game.input.y)) {
				this.player.body.velocity.setTo(0, 0);
			}**/

		}
		this.playerSprite.body.velocity = this.playerVelocity;
		this.vectorMath.ResetVelocityWithinTime(this.playerVelocity, 10);
	}

	CreateBullet(){
		this.bulletGroup = this.game.add.group();
		this.bulletGroup.enableBody = true;
		this.bulletGroup.physicsBodyType = Phaser.Physics.ARCADE;
		this.bulletGroup.createMultiple(30, "bullet");
		this.bulletGroup.setAll("checkWorldBounds", true);
		this.bulletGroup.setAll("outOfBoundsKill", true);
	}

	PlayerAttack() {
		const bulletOffset: Vector2 = { x: 10, y: 0 };
		const bulletSpeed: number = 200;
		const firerate: number = 500;

		if (
		this.game.input.keyboard.isDown(Keyboard.SPACEBAR) && 
		this.game.time.now > this.nextFire &&
		this.bulletGroup.countDead() > 0
		){
			this.nextFire = this.game.time.now + firerate;
			this.playerSprite.play("attack");
			this.bulletSprite = this.bulletGroup.getFirstDead();
			this.bulletSprite.reset(this.playerSprite.x + bulletOffset.x,this.playerSprite.y + bulletOffset.y);
			this.bulletSprite.body.velocity.x = bulletSpeed;
		}
		this.playerSprite.animations.currentAnim.onComplete.add( () =>
		{this.playerSprite.play("idle");},this);
	}

	CreatePlayerLife(maxLife: number) {
		this.playerLife = maxLife;
		// Add the sprite on the screen
		this.lifeGroup = this.game.add.group();
		for (let i = 0; i < maxLife; i++) {
			this.lifeSprite = this.lifeGroup.create((this.game.width / 25) + (i * (this.game.width / 20)), this.game.height / 25, "playerLife", "life_full");
		}
		// Set group scale
		this.lifeGroup.scale.set(2, 2);
	}

	PlayerHurt() {
		if(this.playerLife>0){
			let currentLifeSprite: Phaser.Sprite;
			currentLifeSprite = this.lifeGroup.getAt(this.playerLife - 1) as Sprite;
			currentLifeSprite.frameName = "life_empty";
			this.playerLife--;
		}else{
			//this.playerSprite.play("death");
			this.playerSprite.animations.currentAnim.onComplete.add( () =>
			{this.game.state.start('GameOverScene',true, false);},this);
			//this.game.state.start('GameOverScene',true, false);
		}
	}

	AddPlayer() {
		this.playerSprite = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'player');
		this.playerSprite.smoothed = false;
		this.playerSprite.anchor.set(0.5, 0.5);
		this.playerSprite.scale.set(2, 2);
		this.game.physics.arcade.enable(this.playerSprite); // enable physic system for player
		this.playerSprite.body.collideWorldBounds = true;
		this.playerSprite.body.linearDamping = 1;
		this.playerSprite.play("idle");
	}
}