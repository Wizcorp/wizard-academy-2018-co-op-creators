import TimesteppedScene from "./base/TimesteppedScene";
import { Keyboard, Sprite, TileSprite } from "phaser-ce";

type Vector2 = { x: number, y: number };

function addVectors(a: Vector2, b: Vector2): Vector2 {
	return { x: a.x + b.x, y: a.y + b.y };
}

function minusVectors(a: Vector2, b: Vector2): Vector2 {
	return { x: a.x - b.x, y: a.y - b.y };
}

function multVector(a: Vector2, s: number): Vector2 {
	return { x: a.x * s, y: a.y * s };
}

export default class GameScene extends TimesteppedScene {
	private player: Phaser.Sprite;
	private enemy: Phaser.Sprite;
	private bullet: Phaser.Sprite;
	private background: Phaser.TileSprite;

	public playerVelocity: Vector2; 

	preload() {
		// load image
		this.game.load.image('player', 'assets/wizard2.png');
		this.game.load.image('bullet', 'assets/bullet.png');
		this.game.load.image('enemy', 'assets/enemy.png');
		this.game.load.image('background', 'assets/background.png');
	}

	create() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE); // Add physic system
		this.background = this.game.add.tileSprite(0,0,960,540,"background"); // Add background

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

	// fixedUpdate are not working
	fixedUpdate(dt: number) {
		console.log("FIXED UPDATE!");
	}

	update(){
		this.PlayerMovement();
		this.BackgroundScrolling(this.background,5);
	}

	PlayerMovement() {
		const playerSpeedPerFrame: Vector2 = {x:20,y:20}; //speed of player acceleration
		const maxPlayerSpeed: number = 200;
		const minPlayerSpeed: number = -200;
		this.playerVelocity = this.player.body.velocity;

		this.DampToZero(this.playerVelocity,10);
		this.playerVelocity.x = Phaser.Math.clamp(this.playerVelocity.x,minPlayerSpeed,maxPlayerSpeed);
		this.playerVelocity.y = Phaser.Math.clamp(this.playerVelocity.y,minPlayerSpeed,maxPlayerSpeed);

		if(this.game.input.keyboard.isDown(Keyboard.RIGHT))this.playerVelocity.x += playerSpeedPerFrame.x;
		if(this.game.input.keyboard.isDown(Keyboard.LEFT))this.playerVelocity.x -= playerSpeedPerFrame.x;
		if(this.game.input.keyboard.isDown(Keyboard.UP))this.playerVelocity.y -= playerSpeedPerFrame.y;
		if(this.game.input.keyboard.isDown(Keyboard.DOWN))this.playerVelocity.y += playerSpeedPerFrame.y;

		this.player.body.velocity = this.playerVelocity;
	}

	// make the background scrolling
	BackgroundScrolling(background: TileSprite,speed: number){
		background.tilePosition.x -= speed;
	}

	// make a vector damping to zero
	DampToZero(Vector: Vector2, dampPerFrame: number){

		if(Vector.x > 0)Vector.x -= dampPerFrame;
		else if (Vector.x < 0)Vector.x += dampPerFrame;
		if(Vector.y > 0)Vector.y -= dampPerFrame;
		else if(Vector.y < 0)Vector.y += dampPerFrame;
	}
}
