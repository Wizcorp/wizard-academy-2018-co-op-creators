import TimesteppedScene from "./base/TimesteppedScene";
import { Events } from "phaser-ce";

export default class TitleScene extends TimesteppedScene {

	/**
	 * Load sprites and various assets here.
	 */
	preload() {
		this.game.load.image('titleScreen', 'assets/title.png');
	}

	/**
	 * Ran once at initialization.
	 */
	create() {
		const titleScreen = this.game.add.sprite(0,0,'titleScreen');
	}

	/**
	 * Ran every frame (this.fixedDt).
	 */
	fixedUpdate(dt: number) {
		// Skip to next scene with space or return
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER) 
		|| this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)
		|| this.game.input.activePointer.isDown) {
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