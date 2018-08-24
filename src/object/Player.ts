import { Keyboard, Sprite, TileSprite, Input, Game } from "phaser-ce";
import VectorMath from "../math/VectorMath";

type Vector2 = { x: number, y: number };

export default class Player {
	public playerVelocity: Vector2;
	public useKeyboard: boolean;
	public playerSprite: Phaser.Sprite;

	private mouseTemp: Vector2 = {x:0, y:0};

	private vectorMath: VectorMath;
	private game: Game;

	// Import game scene data into Player.ts
	constructor(game: Game,_useKeyboard: boolean) {
		this.game = game;
		this.useKeyboard = _useKeyboard;
		//this.game.load.image('player', 'assets/wizard1.png');
		this.vectorMath = new VectorMath();

		// Create a click listener to request to hide the mouse pointer if clicked
			this.game.canvas.addEventListener('mousedown', () => {
				this.game.input.mouse.requestPointerLock();
			});
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
		if(!this.game.input.mouse.locked){
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

			if(mouse.x > this.mouseTemp.x)mouseDirection.x++;
			else if(mouse.x < this.mouseTemp.x)mouseDirection.x--;
			else if(mouse.x == this.mouseTemp.x)
			this.vectorMath.ResetVelocityWithinTime(mouseDirection,.1,0);

			if(mouse.y > this.mouseTemp.y)mouseDirection.y++;
			else if(mouse.y < this.mouseTemp.y)mouseDirection.y--;
			else if(mouse.y == this.mouseTemp.y)
			this.vectorMath.ResetVelocityWithinTime(mouseDirection,0,.1);

			this.playerVelocity.x += mouseDirection.x * playerSpeed.x;
			this.playerVelocity.y += mouseDirection.y * playerSpeed.y;
			
			this.mouseTemp = mouse;
			//
			console.log(mouseDirection);
			/**if (Phaser.Rectangle.contains(this.player.body, this.game.input.x, this.game.input.y)) {
				this.player.body.velocity.setTo(0, 0);
			}**/
			
		}
		this.playerSprite.body.velocity = this.playerVelocity;
		this.vectorMath.ResetVelocityWithinTime(this.playerVelocity,10);
	}

	// Create player sprite and set default scale/position
	AddPlayer() {
		this.playerSprite = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'player');
		this.playerSprite.smoothed = false;
		this.playerSprite.anchor.set(0.5, 0.5);
		this.playerSprite.scale.set(2, 2);
		this.game.physics.arcade.enable(this.playerSprite); // enable physic system for player
	}
}
