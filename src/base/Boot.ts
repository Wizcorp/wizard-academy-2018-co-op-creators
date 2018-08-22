
export default class Boot extends Phaser.State {

	init() {
		//  Unless you specifically need to support multitouch I would recommend setting this to 1
		this.input.maxPointers = 1;

		//  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
		this.stage.disableVisibilityChange = true;

		// Enable physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this.scale.setResizeCallback(this.onResize, this);
		this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
		this.scale.pageAlignHorizontally = false;
		this.scale.forceLandscape = !this.game.device.desktop;
	}

	create() {
		//  By this point the preloader assets have loaded to the cache, we've set the game settings
		//  So now let's start the real preloader going
		this.game.state.start('TitleScene');
	}

	shutdown() {}

	onResize() {
		const contentDiv = document.querySelector('#content') as HTMLDivElement;
		// Update size to an integer factor (min. 1)
		const width = contentDiv.offsetWidth;
		const height = window.innerHeight - contentDiv.offsetTop;
		const scaleFactor = Math.max(1, Math.floor(Math.min(width / this.game.width, height / this.game.height)));
		this.scale.setUserScale(scaleFactor, scaleFactor);
	}
}
