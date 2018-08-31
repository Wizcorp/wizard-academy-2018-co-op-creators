import TimesteppedScene from "./base/TimesteppedScene";
import PhaserTextStyle = Phaser.PhaserTextStyle;
import { Events , Sound } from "phaser-ce";

export default class GameClearScene extends TimesteppedScene {

	private gameClearBGM: Sound;

	/**
	 * Load sprites and various assets here.
	 */
	preload() {
		this.game.load.spritesheet('restartButton', 'assets/restartbutton.png', 270, 130);
		this.game.load.image('gameClearScreen', 'assets/gameclear.png');
		//this.game.load.audio("gameClearBGM", "assets/audio/GameOver_2.ogg");
	}

	/**
	 * Ran once at initialization.
	 */
	create() {
		this.game.sound.stopAll(); 
		//this.gameClearBGM = this.game.add.audio("gameClearBGM",.5,false);
		const gameClearScreen = this.game.add.sprite(0, 0, 'gameClearScreen');
		//const button = this.game.add.button(this.game.width / 2, this.game.height / 1.2, 'restartButton', this.OnClick, this, 2, 1, 0);
        //button.anchor.set(0.5, 0.5);
        //this.gameClearBGM.play();
	}

	/**
	 * Ran every frame (this.fixedDt).
	 */
	fixedUpdate(dt: number) {
		// Skip to next scene with space or return
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)
            || this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)
            || this.game.input.activePointer.isDown)
		{
			this.OnClick();
		}
	}

	/**
	 * Callback for button.
	 */
	OnClick() {
		//this.gameClearBGM.stop();
		this.game.state.start('TitleScene', true, false);
	}
}
