import TimesteppedScene from "./base/TimesteppedScene";
import { Keyboard, Sprite, TileSprite, Input, Tileset } from "phaser-ce";
import Player from "./object/Player";
import Enemy from "./object/enemy";
import StageManager from "./stage/StageManager";

export default class GameScene extends TimesteppedScene {
	private player: Player;
	private enemy: Enemy;
	private stageManager: StageManager;

	preload() {
		// Load images
		this.game.load.atlasJSONHash("player", "assets/player/player4.png", "assets/player/player4.json");
		this.game.load.image('bullet', 'assets/player/bullet.png');
		this.game.load.atlasJSONHash('demon', 'assets/enemy/demon.png', "assets/enemy/demon.json");
		this.game.load.atlasJSONHash("dragon","assets/enemy/dragon.png","assets/enemy/dragon.json");

		this.game.load.image('background', 'assets/stage1.png');
		this.game.load.atlasJSONHash("playerLife", "assets/player/player_life.png", "assets/player/player_life.json");
		this.game.load.image('background', 'assets/stage1.png');
		this.game.load.image('collision', 'assets/collision.png');

		this.game.load.audio("stage1BGM","assets/audio/BGM.ogg");
		this.game.load.audio("playerAttack", "assets/audio/player_attack.ogg");
		this.game.load.audio("playerHurt","assets/audio/player/player_hurt.ogg");
		this.game.load.audio("playerDeath", "assets/audio/player_death.ogg");
		this.game.load.audio("enemyHurt","assets/audio/enemy_hurt.ogg");
		this.game.load.audio("enemyDeath", "assets/audio/enemy_death.ogg");

		// Load tilemap layer
		this.game.load.tilemap("stage1", "assets/Tilemap/maptest7.json", null, Phaser.Tilemap.TILED_JSON);
	}

	create() {
		// For showing FPS
		this.time.advancedTiming = true;

		// Add player
		this.player = new Player(this.game);
		this.player.create();

		// Add enemy
		this.enemy = new Enemy(this.game, this.player);
		this.enemy.create();

		// Add stage
		this.stageManager = new StageManager(this.game, this.player, this.enemy, 1);
		this.stageManager.create();

		this.game.world.sendToBack(this.stageManager.background);
		this.game.world.bringToTop(this.player.playerSprite);
		this.game.world.bringToTop(this.player.lifeGroup);
	}

	// fixedUpdate is not working
	fixedUpdate(dt: number) {
		console.log("FIXED UPDATE!");
	}

	update() {
		this.game.debug.text(this.time.fps.toString(), 20, 50); // Show FPS on screen
		this.player.update();
		this.stageManager.update();
		this.enemy.update();
	}
}
