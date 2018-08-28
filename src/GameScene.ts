import TimesteppedScene from "./base/TimesteppedScene";
import { Keyboard, Sprite, TileSprite, Input, Tileset } from "phaser-ce";
import Player from "./object/Player";
import Enemy from "./object/enemy";

type Vector2 = { x: number, y: number };
var speed = 10;
var x= 0;


export default class GameScene extends TimesteppedScene {
	//private background: Phaser.TileSprite;
	private player: Player;
	private enemy: Enemy;

	private background: Phaser.TileSprite;
	private map: Phaser.Tilemap;
	private layer: Phaser.TilemapLayer;

	preload() {
		// Load images
		this.game.load.image('player', 'assets/wizard1.png');
		var shot = this.game.load.image('bullet', 'assets/player/bullet.png');
		this.game.load.image('enemy', 'assets/enemy.png');
		this.game.load.image('background', 'assets/stage1.png');
		this.game.load.spritesheet('playerlife',"assets/player/life.png",120,35);
		
		this.game.load.image('background', 'assets/stage1.png');
		this.game.load.image('collision', 'assets/collision.png');

		// Load tilemap layer
		this.game.load.tilemap("map", "assets/Tilemap/maptest6.json", null, Phaser.Tilemap.TILED_JSON);
	}

	create() {
		// For showing FPS
		this.time.advancedTiming = true;

		// Set world dimensions
		this.game.world.setBounds(0, 0, 956, 538);

		// Add tilemap
		this.map = this.game.add.tilemap("map");
		this.map.addTilesetImage("collision", "collision");
		this.layer = this.map.createLayer("Collision");
		this.layer.resizeWorld();

		// Add background
		this.background = this.game.add.tileSprite(0, 0, 960, 540, "background");

		// Add player
		this.player = new Player(this.game);
		this.player.AddPlayer();
		this.player.AddPlayerLife();

		// Add enemy
		this.enemy = new Enemy(this.game);
		this.enemy.Addenemy();

		
	}

	// fixedUpdate is not working
	fixedUpdate(dt: number) {
		console.log("FIXED UPDATE!");
	}

	update() {
		this.game.debug.text(this.time.fps.toString(), 20, 50); // Show FPS on screen
		this.player.PlayerMovement();
		this.BackgroundScrolling(this.background, 5);
	}

	// Make the background scrolling
	BackgroundScrolling(background: TileSprite, speed: number) {
		background.tilePosition.x -= speed;
	}
}
