var c = document.getElementById('bg');
var ctx = c.getContext('2d');

var s = document.getElementById('ship');
var ship = s.getContext('2d');
var stars = [];

var speed = 0.1;
var maxSpeed = 200;
var distance = 0;

c.width = window.innerWidth;
c.height = window.innerHeight;
s.width = window.innerWidth;
s.height = window.innerHeight;

var shipCenter = {x: s.width / 2, y: s.height / 2 - 100};
var decreaseInterval = null;

var flameEndX = shipCenter.x;

draw();
createStars();
eventListeners();

function eventListeners(){
	$('body').on('keydown', function(e){				
		switch(e.keyCode){
			case 32:
				$('h1').addClass('pressed');
				console.log(speed);
				
				clearInterval(decreaseInterval);
				
				if(speed < maxSpeed){
					speed += (speed / 10);
				}
				break;
		}
	});
	
	$('body').on('keyup', function(){
		$('h1').removeClass('pressed');
		
		decreaseInterval = setInterval(function(){
			if(speed > 0.1){
				decreaseSpeed();
			} else {
				clearInterval(decreaseInterval);
				speed = .1;
			}
		}, 100);
	});
}

function decreaseSpeed(){
	speed -= (speed / 10);
}

function draw(){
	
	drawBg();
	drawStars();
	moveStars();
	drawSpeed();
	
	clearShipBg();
	drawRocketship();
	
	updateDistance();
	
	window.requestAnimationFrame(draw);
}

function drawBg(){
	ctx.rect(0, 0, c.width, c.height);
	ctx.fillStyle = 'rgb(10, 15, 30)';
	ctx.fill();
}

function createStars(){
	for(i = 0; i < 1000; i++){
		stars.push({
			x: Math.random() * 3000,
			y: Math.random() * 3000,
			r: Math.random() * 2,
			o: Math.random(),
			m: Math.random()
		});
	}
}

function drawStars(){
	for(i = 0; i < stars.length; i++){
		
		// Draw trail
		
		if(speed > 100){
			var alpha = (speed - 100) / 100;
					
			ctx.beginPath();
			ctx.rect((stars[i].x - stars[i].r), stars[i].y, (stars[i].r * 2), 150);
			ctx.fillStyle = 'rgba(100, 150, 200, ' + alpha + ')';
			ctx.closePath();
			ctx.fill();
		}
		
		// Draw normal stars
		ctx.beginPath();
		ctx.arc(stars[i].x, stars[i].y, stars[i].r, 0, Math.PI * 2);
		ctx.fillStyle = 'rgba(255, 255, 255, ' + stars[i].o + ')';
		ctx.closePath();
		ctx.fill();
	}
}

function moveStars(){
	for(i = 0; i < stars.length; i++){
		
		if(stars[i].y + .1 > c.height){
			stars[i].y = -(Math.random() * 1000);
		} else {
			stars[i].y += (speed + stars[i].m);
		}
		
		// if(stars[i].x + .1 > c.width){
		// 	stars[i].x = -(Math.random() * 1000);
		// } else {
		// 	stars[i].x += speed + 0.15;
		// }
	}
}

function clearShipBg(){
	ship.clearRect(0, 0, s.width, s.height);
}

function drawRocketship(){	
	drawShipLeftWing();
	drawShipRightWing();
	drawShipBody();
	drawShipHead();
	drawWindow();
	drawWindowShine();
	drawShine();
	drawFlames(shipCenter.y + 200, 'rgba(230, 110, 0, .8)');
	drawFlames(shipCenter.y + 180, 'rgba(240, 150, 0, .9)');
	drawFlames(shipCenter.y + 160, 'rgba(250, 170, 0, 1)');
	
	changeFlameEnd();
	
	ship.translate(shipCenter.x, (shipCenter.y + 50));
	//ship.rotate(Math.PI / 3000);
	ship.translate(-shipCenter.x, (-shipCenter.y - 50));
}

function changeFlameEnd(){
	flameEndX = shipCenter.x + Math.random() * 5;
}

function drawShipLeftWing(){
	ship.beginPath();
	ship.moveTo(shipCenter.x, shipCenter.y + 50);
	ship.quadraticCurveTo(shipCenter.x - 80, shipCenter.y + 80, shipCenter.x - 30, shipCenter.y + 150);
	ship.quadraticCurveTo(shipCenter.x - 40, shipCenter.y + 90, shipCenter.x, shipCenter.y + 100);
	ship.fillStyle = 'rgb(200, 0, 0)';
	ship.closePath();
	ship.fill();
}

function drawShipRightWing(){
	ship.beginPath();
	ship.moveTo(shipCenter.x, shipCenter.y + 50);
	ship.quadraticCurveTo(shipCenter.x + 80, shipCenter.y + 80, shipCenter.x + 30, shipCenter.y + 150);
	ship.quadraticCurveTo(shipCenter.x + 40, shipCenter.y + 90, shipCenter.x, shipCenter.y + 100);
	ship.fillStyle = 'rgb(200, 0, 0)';
	ship.closePath();
	ship.fill();
}

function drawShipBody(){
	ship.beginPath();
	ship.moveTo(shipCenter.x, shipCenter.y);
	ship.bezierCurveTo(shipCenter.x - 40, shipCenter.y + 50, shipCenter.x - 30, shipCenter.y + 80, shipCenter.x - 20, shipCenter.y + 100);
	ship.lineTo(shipCenter.x + 20, shipCenter.y + 100)
	ship.bezierCurveTo(shipCenter.x + 30, shipCenter.y + 80, shipCenter.x + 40, shipCenter.y + 50, shipCenter.x, shipCenter.y);
	ship.fillStyle = 'rgb(200, 200, 200)';
	ship.closePath();
	ship.fill();
}

function drawShipHead(){
	ship.beginPath();
	ship.moveTo(shipCenter.x, shipCenter.y);
	ship.quadraticCurveTo(shipCenter.x - 8, shipCenter.y + 10, shipCenter.x - 14, shipCenter.y + 20);
	ship.lineTo(shipCenter.x + 14, shipCenter.y + 20)
	ship.quadraticCurveTo(shipCenter.x + 8, shipCenter.y + 10, shipCenter.x, shipCenter.y);
	ship.fillStyle = 'rgb(200, 0, 0)';
	ship.closePath();
	ship.fill();
}

function drawShine(){
	ship.beginPath();
	ship.moveTo(shipCenter.x, shipCenter.y + 15);
	ship.quadraticCurveTo(shipCenter.x - 30, shipCenter.y + 65, shipCenter.x - 10, shipCenter.y + 90);
	ship.lineWidth = 6;
	ship.lineCap = 'round';
	ship.strokeStyle = 'rgba(255, 255, 255, .25)'
	ship.stroke();
	ship.closePath();
}

function drawWindow(){
	ship.beginPath();
	ship.arc(shipCenter.x, shipCenter.y + 50, 12, 0, Math.PI * 2);
	ship.lineWidth = 4;
	ship.strokeStyle = 'rgb(120, 120, 130)';
	ship.fillStyle = 'rgb(100, 150, 250)';
	ship.closePath();
	ship.fill();
	ship.stroke();
}

function drawWindowShine(){
	ship.beginPath();
	ship.arc(shipCenter.x, shipCenter.y + 50, 10, Math.PI * 1.65, Math.PI * .65, true);
	ship.fillStyle = 'rgba(255, 255, 255, .25)';
	ship.closePath();
	ship.fill();
}

function drawSpeed(){
	var speedHeight = (speed / maxSpeed) * 100;
	
	ctx.beginPath();
	ctx.rect(50, 50, 10, 100);
	ctx.fillStyle = 'rgba(255, 255, 255, .2)'
	ctx.closePath();
	ctx.fill();
	
	ctx.beginPath();
	ctx.rect(50, 150 - speedHeight, 10, speedHeight);
	ctx.fillStyle = 'rgb(100, 220, 180)';
	ctx.closePath();
	ctx.fill();
}

function updateDistance(){
	distance += speed;
	$('[data-distance]').text(parseInt(distance));
	$('[data-speed]').text(Math.ceil(speed) + '0');
}

function drawFlames(flameHeight, color){
	flameHeight += (speed / 3);
	
	ship.beginPath();
	ship.moveTo(shipCenter.x, shipCenter.y + 110);
	ship.quadraticCurveTo(shipCenter.x - 40, shipCenter.y + 110, flameEndX, flameHeight);
	ship.quadraticCurveTo(shipCenter.x + 40, shipCenter.y + 110, shipCenter.x, shipCenter.y + 110);
	ship.fillStyle = color;
	ship.fill();
	ship.closePath();
}