import TimesteppedScene from "./base/TimesteppedScene";
import { Events } from "phaser-ce";

export default class TitleScene extends TimesteppedScene {

	//private startSprite: Phaser.Sprite;

	/**
	 * Load sprites and various assets here.
	 */
	preload() {
		this.game.load.image('titleScreen', 'assets/title.png');
		this.game.load.atlasJSONHash("start", "assets/start.png", "assets/start.json");
	}

	/**
	 * Ran once at initialization.
	 */
	create() {
		const titleScreen = this.game.add.sprite(0,0,'titleScreen');
		let startSprite = this.game.add.sprite(this.game.width/2.5,this.game.height/1.3,"start");
		startSprite.animations.add("start",["start1","start2"],2,true,false);
		startSprite.play("start");
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