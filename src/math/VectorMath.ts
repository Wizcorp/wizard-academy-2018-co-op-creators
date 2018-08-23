import TimesteppedScene from "../base/TimesteppedScene";

type Vector2 = { x: number, y: number };

export default class VectorMath extends TimesteppedScene {

	ResetVelocityWithinTime(vector: Vector2, speed: number) {
		if (vector.x > 0) vector.x -= speed;
		else if (vector.x < 0) vector.x += speed;
		if (vector.y > 0) vector.y -= speed;
		else if (vector.y < 0) vector.y += speed;

		if (vector.x > 0 && vector.x < speed) vector.x = 0;
		else if (vector.x < 0 && vector.x > speed) vector.x = 0;
		if (vector.y > 0 && vector.y < speed) vector.y = 0;
		else if (vector.y < 0 && vector.y > speed) vector.y = 0;
	}

}