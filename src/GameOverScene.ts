import TimesteppedScene from "./base/TimesteppedScene";
import PhaserTextStyle = Phaser.PhaserTextStyle;
import { Events , Sound } from "phaser-ce";

export default class TitleScene extends TimesteppedScene {

	private gameOverBGM: Sound;

	/**
	 * Load sprites and various assets here.
	 */
	preload() {
		this.game.load.spritesheet('restartButton', 'assets/restartbutton.png', 270, 130);
		this.game.load.image('gameOverScreen', 'assets/gameover.png');
		this.game.load.audio("gameOverBGM", "assets/audio/GameOver.ogg");
	}

	/**
	 * Ran once at initialization.
	 */
	create() {
		this.game.sound.stopAll(); 
		this.gameOverBGM = this.game.add.audio("gameOverBGM",.5,false);
		const gameOverScreen = this.game.add.sprite(0, 0, 'gameOverScreen');
		const button = this.game.add.button(this.game.width / 2, 270, 'restartButton', this.OnClick, this, 2, 1, 0);
		
		button.anchor.set(0.5, 0.5);
		this.gameOverBGM.play();
	}

	/**
	 * Ran every frame (this.fixedDt).
	 */
	fixedUpdate(dt: number) {
		// Skip to next scene with space or return
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)
			|| this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)
		) {
			this.OnClick();
		}
	}

	/**
	 * Callback for button.
	 */
	OnClick() {
		this.gameOverBGM.stop();
		this.game.state.start('GameScene', true, false);
	}
}
