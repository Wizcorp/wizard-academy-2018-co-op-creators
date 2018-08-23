import TimesteppedScene from "./base/TimesteppedScene";
import { Keyboard, Sprite, TileSprite, Input } from "phaser-ce";
import player from "./player";

type Vector2 = { x: number, y: number };

export default class GameScene extends TimesteppedScene {
	private player: Phaser.Sprite;
	private enemy: Phaser.Sprite;
	private bullet: Phaser.Sprite;
	private background: Phaser.TileSprite;

	public input: Input;

	public playerVelocity: Vector2;
	public useKeyboard: boolean;

	init(options: { useKeyboard: boolean }) {
		this.useKeyboard = options.useKeyboard;
	}

	preload() {
		// Load images
		this.game.load.image('player', 'assets/wizard2.png');
		this.game.load.image('bullet', 'assets/bullet.png');
		this.game.load.image('enemy', 'assets/enemy.png');
		this.game.load.image('background', 'assets/background.png');
	}

	create() {
		// For showing FPS
		this.time.advancedTiming = true;

		// Create a click listener to request to hide the mouse pointer if clicked
		if (!this.useKeyboard) {
			this.game.canvas.addEventListener('mousedown', () => {
				this.input.mouse.requestPointerLock();
			});
		}

		// Set world dimensions
		this.game.world.setBounds(0, 0, 960, 540);

		// Add background
		this.background = this.game.add.tileSprite(0, 0, 960, 540, "background");

		// Add player
		this.player = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'player');
		this.player.smoothed = false;
		this.player.anchor.set(0.5, 0.5);
		this.player.scale.set(2, 2);
		this.game.physics.arcade.enable(this.player); // enable physic system for player

		// Add enemy(For temp display)
		this.enemy = this.game.add.sprite(this.game.width / 1.5, this.game.height / 1.5, 'enemy');
		this.enemy.smoothed = false;
		this.enemy.anchor.set(0.5, 0.5);
		this.enemy.scale.set(2, 2);

		// Add bullet(For temp display)
		this.bullet = this.game.add.sprite(this.game.width / 2.5, this.game.height / 2.5, 'bullet');
		this.bullet.smoothed = false;
		this.bullet.anchor.set(0.5, 0.5);
		this.bullet.scale.set(2, 2);

	}

	// fixedUpdate is not working
	fixedUpdate(dt: number) {
		console.log("FIXED UPDATE!");
	}

	update() {
		this.game.debug.text(this.time.fps.toString(), 20, 50); // Show FPS on screen
		this.Player1Movement();
		this.BackgroundScrolling(this.background, 5);
	}

	Player1Movement() {
		const playerSpeed: Vector2 = { x: 20, y: 20 }; //speed of player acceleration
		const maxPlayerSpeed: number = 200;
		const minPlayerSpeed: number = -200;
		this.playerVelocity = this.player.body.velocity;
		
		this.playerVelocity.x = Phaser.Math.clamp(this.playerVelocity.x, minPlayerSpeed, maxPlayerSpeed);
		this.playerVelocity.y = Phaser.Math.clamp(this.playerVelocity.y, minPlayerSpeed, maxPlayerSpeed);

		if (this.useKeyboard) {
			if (this.game.input.keyboard.isDown(Keyboard.RIGHT)) this.playerVelocity.x += playerSpeed.x;
			if (this.game.input.keyboard.isDown(Keyboard.LEFT)) this.playerVelocity.x -= playerSpeed.x;
			if (this.game.input.keyboard.isDown(Keyboard.UP)) this.playerVelocity.y -= playerSpeed.y;
			if (this.game.input.keyboard.isDown(Keyboard.DOWN)) this.playerVelocity.y += playerSpeed.y;
		} else if (!this.useKeyboard && this.input.mouse.locked) {
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
		this.player.body.velocity = this.playerVelocity;
	}

	AddSpriteObject(sprite: Sprite) {

	}

	// Make the background scrolling
	BackgroundScrolling(background: TileSprite, speed: number) {
		background.tilePosition.x -= speed;
	}

	// Make a vector decrease/increase unil zero
	sResetVelocityWithinTime(vector: Vector2, speed: number) {
		if (vector.x > 0) vector.x -= speed;
		else if (vector.x < 0) vector.x += speed;
		if (vector.y > 0) vector.y -= speed;
		else if (vector.y < 0) vector.y += speed;

		if (vector.x > 0 && vector.x < speed) vector.x = 0;
		else if (vector.x < 0 && vector.x > speed) vector.x = 0;
		if (vector.y > 0 && vector.y < speed) vector.y = 0;
		else if (vector.y < 0 && vector.y > speed) vector.y = 0;
	}
}
