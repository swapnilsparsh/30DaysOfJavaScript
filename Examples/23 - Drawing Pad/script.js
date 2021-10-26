const colorInput = document.getElementById('color');
const weight = document.getElementById('weight');
const clear = document.getElementById('clear');
const paths = [];
let currentPath = [];

function setup() {
    // create a canvas which is full width and height
  	createCanvas(window.innerWidth, window.innerHeight);
    // Add a white background to the canvas
  	background(255);
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
    // Push the path inside the paths array
	paths.push(currentPath);
}

clear.addEventListener('click', () => {
    // Remove all the paths
	paths.splice(0);
    // Clear the background
	background(255);
});