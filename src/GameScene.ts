import TimesteppedScene from "./base/TimesteppedScene";
import { Keyboard, Sprite, TileSprite, Input } from "phaser-ce";
import Player from "./object/Player";
import enemy from "./object/enemy";

type Vector2 = { x: number, y: number };

export default class GameScene extends TimesteppedScene {
	public useKeyboard: boolean;

	private background: Phaser.TileSprite;
	private player: Player;
	private enemy: enemy;

	private bullet: Phaser.Sprite;
	
	init(options: { useKeyboard: boolean }) {
		this.useKeyboard = options.useKeyboard;
	}

	preload() {
		// Load images
		this.game.load.image('player', 'assets/wizard1.png');
		this.game.load.image('bullet', 'assets/bullet.png');
		this.game.load.image('enemy', 'assets/enemy.png');
		this.game.load.image('background', 'assets/background.png');
		//this.game.load.image('playerlife',"assets/life.png");
		this.game.load.spritesheet('playerlife',"assets/life.png",120,35);
		

	}

	create() {
		// For showing FPS
		this.time.advancedTiming = true;

		// Set world dimensions
		this.game.world.setBounds(0, 0, 956, 538);

		// Add background
		this.background = this.game.add.tileSprite(0, 0, 960, 540, "background");

		// Add player
		this.player = new Player(this.game,this.useKeyboard);
		this.player.AddPlayer();
		this.player.AddPlayerLife();

		// Add enemy(For temp display)
		this.enemy = new enemy(this.game);
		this.enemy.Addenemy();

		
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
		this.player.PlayerMovement();
		this.BackgroundScrolling(this.background, 5);
<<<<<<< Updated upstream
		console.log(this.player.playerSprite.body.velocity);
=======

		if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
		 {
			this.game.load.spritesheet('playerlife',"assets/life.png",100,160);
		 }else
		 {
			this.game.load.spritesheet('playerlife',"assets/life.png",100,160);
		 }
>>>>>>> Stashed changes
	}

	// Make the background scrolling
	BackgroundScrolling(background: TileSprite, speed: number) {
		background.tilePosition.x -= speed;
	}
}
