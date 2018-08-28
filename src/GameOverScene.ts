import TimesteppedScene from "./base/TimesteppedScene";
import PhaserTextStyle = Phaser.PhaserTextStyle;
import { Events } from "phaser-ce";

export default class TitleScene extends TimesteppedScene {

	/**
	 * Load sprites and various assets here.
	 */
	preload() {
		this.game.load.spritesheet('retryButton', 'assets/startButton.png', 200, 40);
		//this.game.load.image('gameOverScreen', 'assets/gameover.png');
	}

	/**
	 * Ran once at initialization.
	 */
	create() {
		//const gameOverScreen = this.game.add.sprite(0,0,'gameOverScreen');

		const title = this.game.add.text(this.game.width / 2, 200, 'Retry?');
		title.anchor.set(0.5, 0.5);
		title.align = 'center';
		title.font = 'Arial';
		title.fontSize = 45;
		title.fill = '#ffffff';

		const button = this.game.add.button(this.game.width / 2, 300, 'retryButton', this.OnClick, this, 2, 1, 0);
		button.anchor.set(0.5, 0.5);
	}

	/**
	 * Ran every frame (this.fixedDt).
	 */
	fixedUpdate(dt: number) {
		// Skip to next scene with space or return
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER) 
		|| this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)
		){
			this.OnClick();
		}
}

	/**
	 * Callback for button.
	 */
	OnClick() {
		this.game.state.start('GameScene',true, false);
	}
}
