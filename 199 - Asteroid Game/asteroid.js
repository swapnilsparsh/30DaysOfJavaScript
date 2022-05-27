class Asteroid {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	draw(canvas, ctx) {
		ctx.translate(this.x, this.y);
		ctx.drawImage(Asteroid.asteroidSvg, -Asteroid.asteroidSvg.width / 2, -Asteroid.asteroidSvg.height / 2);
		ctx.translate(-this.x, -this.y);
	}
}

Asteroid.asteroidSvg = new Image();
Asteroid.asteroidSvg.src = "asteroid.svg";
