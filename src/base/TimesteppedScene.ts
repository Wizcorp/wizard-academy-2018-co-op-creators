
const BASIC_DT = 1.0 / 60.0;
const MAX_DT = 1.0;

export default class TimesteppedScene extends Phaser.State {
	lastUpdateTime: number = 0;

	update(): void {
		let time = this.game.time.totalElapsedSeconds();

		if (time - this.lastUpdateTime > MAX_DT) {
			this.lastUpdateTime = time - BASIC_DT;
		}

		while (time - this.lastUpdateTime >= BASIC_DT) {
			this.fixedUpdate(BASIC_DT);
			this.lastUpdateTime += BASIC_DT;
		}
	}

	fixedUpdate(dt: number) {
		console.log(`Please override fixedUpdate`);
	}
}
