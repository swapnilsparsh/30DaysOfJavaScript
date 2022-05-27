class Ship {
	constructor() {
		this.x = 0.0;
		this.y = 0.0;
		this.angle = 0.0;
		this.speedX = 0.0;
		this.speedY = 0.0;
		this.damage = 0;
	}

	draw(canvas, ctx) {
		ctx.translate(0, this.y);
		ctx.rotate(this.angle);
		ctx.drawImage(Ship.shipSvg, -Ship.shipSvg.width / 2, -Ship.shipSvg.height / 2);
		ctx.rotate(-this.angle);
		ctx.translate(0, -this.y);
	}

	move() {
		let x = canvas.width / 2;
		this.speedX = (this.speedX + Math.abs(mouseX - x) / 60) / 2;
		if (this.speedX < 0.0) {
			this.speedX = 0.0;
		} else if (this.speedX > 2.0) {
			this.speedX = 2.0;
		}
		this.speedY = (this.speedY + Math.abs(mouseY - this.y) / 60) / 2;
		if (this.speedY < 0.0) {
			this.speedY = 0.0;
		} else if (this.speedY > 2.0) {
			this.speedY = 2.0;
		}
		this.angle = (this.angle + Math.atan2(mouseY - this.y, mouseX - x)) / 2;
		this.x += this.speedX * Math.cos(this.angle);
		this.y += this.speedY * Math.sin(this.angle);
	}
}

Ship.shipSvg = new Image();
Ship.shipSvg.src = "ship.svg";
