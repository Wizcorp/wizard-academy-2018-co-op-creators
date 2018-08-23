import TimesteppedScene from "../base/TimesteppedScene";
import { Keyboard, Sprite, TileSprite, Input, Game } from "phaser-ce";
import VectorMath from "../math/VectorMath";

type Vector2 = { x: number, y: number };

export default class Player {
	public playerVelocity: Vector2;
	public useKeyboard: boolean;
	public playerSprite: Phaser.Sprite;

	private vectorMath: VectorMath;

	private game: Game;

	constructor(game: Game,_useKeyboard: boolean) {
		this.game = game;
		this.useKeyboard = _useKeyboard;
		//this.game.load.image('player', 'assets/wizard1.png');
		this.vectorMath = new VectorMath();		
	}

	create(){
		// Create a click listener to request to hide the mouse pointer if clicked
		if (!this.useKeyboard) {
			this.game.canvas.addEventListener('mousedown', () => {
				this.game.input.mouse.requestPointerLock();
			});
		}
	}

	update(){
	}

	PlayerMovement() {
		const playerSpeed: Vector2 = { x: 20, y: 20 }; //speed of player acceleration
		const maxPlayerSpeed: number = 200;
		const minPlayerSpeed: number = -200;
		this.playerVelocity = this.playerSprite.body.velocity;
		
		this.playerVelocity.x = Phaser.Math.clamp(this.playerVelocity.x, minPlayerSpeed, maxPlayerSpeed);
		this.playerVelocity.y = Phaser.Math.clamp(this.playerVelocity.y, minPlayerSpeed, maxPlayerSpeed);

		this.vectorMath.ResetVelocityWithinTime(this.playerVelocity,10);

		if (this.useKeyboard) {
			if (this.game.input.keyboard.isDown(Keyboard.RIGHT)) this.playerVelocity.x += playerSpeed.x;
			if (this.game.input.keyboard.isDown(Keyboard.LEFT)) this.playerVelocity.x -= playerSpeed.x;
			if (this.game.input.keyboard.isDown(Keyboard.UP)) this.playerVelocity.y -= playerSpeed.y;
			if (this.game.input.keyboard.isDown(Keyboard.DOWN)) this.playerVelocity.y += playerSpeed.y;
		} else if (!this.useKeyboard && this.game.input.mouse.locked) {
			//this.game.physics.arcade.moveToPointer(this.player, maxPlayerSpeed);
			let mouseX = this.game.input.mouse.input.activePointer.movementX;
			let mouseY = this.game.input.mouse.input.activePointer.movementY;

			let mouseDirection: Vector2 = {
				x: Phaser.Math.clamp(mouseX, -1, 1),
				y: Phaser.Math.clamp(mouseY, -1, 1)
			};

			console.log(mouseDirection);

			this.playerVelocity.x += mouseDirection.x * playerSpeed.x;
			this.playerVelocity.y += mouseDirection.y * playerSpeed.y;

			/**if (Phaser.Rectangle.contains(this.player.body, this.game.input.x, this.game.input.y)) {
				this.player.body.velocity.setTo(0, 0);
			}**/
		}
		this.playerSprite.body.velocity = this.playerVelocity;
	}

	AddPlayer() {
		this.playerSprite = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'player');
		this.playerSprite.smoothed = false;
		this.playerSprite.anchor.set(0.5, 0.5);
		this.playerSprite.scale.set(2, 2);
		this.game.physics.arcade.enable(this.playerSprite); // enable physic system for player
	}
}
