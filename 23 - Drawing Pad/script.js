const colorInput = document.getElementById('color');
const weight = document.getElementById('weight');
const clear = document.getElementById('clear');
const paths = [];
let currentPath = [];

const pencil = document.querySelector("#pencil");
const line = document.querySelector("#line");
const rect = document.querySelector("#rect");
const circle = document.querySelector("#circle");

let dataURL;

function setup() {
    // create a canvas which is full width and height
  	createCanvas(window.innerWidth, window.innerHeight);
    // Add a white background to the canvas
  	background(255);
	dataURL = canvas.toDataURL();
}

function draw() {
    // disabled filling
	noFill();
	
	if(mouseIsPressed){
        // Store the location of the mouse
		const point = {
			x: mouseX,
			y: mouseY,
            // storing the color and weights provided by the inputs for each point
			color: colorInput.value,
			weight: weight.value
		};
        // Adding the point to the currentPath array
		currentPath.push(point);
	}
	// Looping over all the paths and drawing all the points inside them
	paths.forEach(path => {
		beginShape();
		path.forEach(point => {
            // create a vertex at the specified location and using the color and the weight to style the stroke
			stroke(point.color);
			strokeWeight(point.weight);
			vertex(point.x, point.y);
		});
		endShape();
	});
}

function mousePressed() {
	// Clean up the currentPath
	currentPath = [];
	if(pencil.checked){
		// Push the path inside the paths array
		paths.push(currentPath);
	}
}

clear.addEventListener('click', () => {
    // Remove all the paths
	paths.splice(0);
    // Clear the background
	background(255);
	dataURL = canvas.toDataURL();
});


window.onload = () => {
	var c = document.querySelector("#defaultCanvas0");
	var ctx = c.getContext("2d");
	let x1,y1,x2,y2,x3,y3;
	let gradient;
	let isDown = false;
	const color2 = document.querySelector("#color2");

	document.querySelector("#gradient").addEventListener('click', () => {
		if(document.querySelector("#gradient").checked){
			color2.disabled = false;
		}
		else{
			color2.disabled = true;
		}
	})
	
	document.querySelector("#defaultCanvas0").addEventListener("mousedown", (e) => {
		x1 = e.clientX;
		y1 = e.clientY - 42;
		isDown = true
	});
	document.querySelector("#defaultCanvas0").addEventListener("mousemove", (e) => {
		if(isDown){
			const image = new Image();
			image.src = dataURL;
			image.addEventListener("load", () => {
				ctx.drawImage(image, 0, 0, window.innerWidth, window.innerHeight);
			});
			drawing(e);
		}
	});
	document.querySelector("#defaultCanvas0").addEventListener("mouseup", (e) => {
		isDown = false;
		drawing(e);
		dataURL = canvas.toDataURL();
	});
	function drawing(e){
		if(line.checked){
			x2 = e.clientX;
			y2 = e.clientY - 42;

			ctx.beginPath();
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);
			if(document.querySelector("#gradient").checked){
				gradient = ctx.createLinearGradient(x1, y1, x2, y2);
				gradient.addColorStop(0, colorInput.value);
				gradient.addColorStop(1, color2.value);
				ctx.strokeStyle = gradient;
			}
			else{
				ctx.strokeStyle = colorInput.value;
			}
			ctx.lineWidth = weight.value;
			ctx.stroke();
		}
		else if(rect.checked){
			x2 = e.clientX - x1;
			y2 = (e.clientY - 42) - y1;

			ctx.beginPath();
			if(document.querySelector("#gradient").checked){
				x3 = e.clientX;
				y3 = e.clientY - 42;
				gradient = ctx.createLinearGradient(x1, y1, x3, y3);
				gradient.addColorStop(0, colorInput.value);
				gradient.addColorStop(1, color2.value);
				ctx.fillStyle = gradient;
			}
			else{
				ctx.fillStyle = colorInput.value;
			}
			ctx.fillRect(x1, y1, x2, y2);
		}
		else if(circle.checked){
			x2 = e.clientX - x1;
			y2 = (e.clientY - 42) - y1;

			ctx.beginPath();
			ctx.arc(x1 + x2/2, y1 + y2/2, Math.abs(Math.max(Math.abs(x2),Math.abs(y2))/2), 0, 2 * Math.PI, false);
			if(document.querySelector("#gradient").checked){
				x3 = e.clientX;
				y3 = e.clientY - 42;
				gradient = ctx.createLinearGradient(x1, y1, x3, y3);
				gradient.addColorStop(0, colorInput.value);
				gradient.addColorStop(1, color2.value);
				ctx.fillStyle = gradient;
			}
			else{
				ctx.fillStyle = colorInput.value;
			}
			ctx.fill();
		}
	}
}