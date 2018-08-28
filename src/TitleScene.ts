import TimesteppedScene from "./base/TimesteppedScene";
<<<<<<< HEAD
import PhaserTextStyle = Phaser.PhaserTextStyle;
=======
import { Events } from "phaser-ce";
>>>>>>> b81a2a2725681f5acf2104bc9520bc988d299ae5

export default class TitleScene extends TimesteppedScene {

	/**
	 * Load sprites and various assets here.
	 */
	preload() {
<<<<<<< HEAD
		this.game.load.spritesheet('startButton', 'assets/startButton.png', 200, 40);
=======
		this.game.load.image('titleScreen', 'assets/title.png');
>>>>>>> b81a2a2725681f5acf2104bc9520bc988d299ae5
	}

	/**
	 * Ran once at initialization.
	 */
	create() {
<<<<<<< HEAD
		const title = this.game.add.text(this.game.width / 2, 200, 'Test Space Shooter');
		title.anchor.set(0.5, 0.5);
		title.align = 'center';
		title.font = 'Arial';
		title.fontSize = 45;
		title.fill = '#ffffff';

		const useKeyboardButton = this.game.add.button(this.game.width / 2, 300, 'startButton', this.OnClick, this, 2, 1, 0);
		useKeyboardButton.anchor.set(0.5, 0.5);
=======
		const titleScreen = this.game.add.sprite(0,0,'titleScreen');
>>>>>>> b81a2a2725681f5acf2104bc9520bc988d299ae5
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
