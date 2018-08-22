import TimesteppedScene from "./base/TimesteppedScene";

export default class GameScene extends TimesteppedScene {
	private player: Phaser.Sprite;

	preload() {
		this.game.load.image('player', 'assets/player.png');
	}

	create() {
		this.player = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'player');
		this.player.smoothed = false;
		this.player.anchor.set(0.5, 0.5);
		this.player.scale.set(2, 2);
	}

	fixedUpdate(dt: number) {
	}
}
