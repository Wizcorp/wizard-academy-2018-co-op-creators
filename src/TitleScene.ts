import TimesteppedScene from "./base/TimesteppedScene";
import PhaserTextStyle = Phaser.PhaserTextStyle;

export default class TitleScene extends TimesteppedScene {

	/**
	 * Load sprites and various assets here.
	 */
	preload() {
		this.game.load.spritesheet('startButton', 'assets/startButton.png', 200, 40);
	}

	/**
	 * Ran once at initialization.
	 */
	create() {
		const title = this.game.add.text(this.game.width / 2, 200, 'Test Space Shooter');
		title.anchor.set(0.5, 0.5);
		title.align = 'center';
		title.font = 'Arial';
		title.fontSize = 45;
		title.fill = '#ffffff';

		const useKeyboardButton = this.game.add.button(this.game.width / 2, 300, 'startButton', this.OnClick, this, 2, 1, 0);
		useKeyboardButton.anchor.set(0.5, 0.5);
	}

	/**
	 * Ran every frame (this.fixedDt).
	 */
	fixedUpdate(dt: number) {
		// Skip to next scene with space or return
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER) || this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			this.OnClick();
		}
}

	/**
	 * Callback for button.
	 */
	OnClick() {
		this.game.state.start('GameScene',true, false,{useKeyboard: true});
	}
}
