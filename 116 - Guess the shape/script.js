"use strict";

// Declaring variables
const delay = 50;
const shapes = ['circle', 'square', 'diamond', 'pentagon', 'triangle', 'donut', 'star', 'bars'];
var intervalId = [];
var score = 0;
var isPlaying = true;
var chance = true;

// Music control variables
const bgMusic = new Audio('https://drive.google.com/uc?export=download&id=1RZrEjs6-lZK3B9uu20qW-sbruxjwScSi');
bgMusic.volume = 0.1;
const correct = new Audio('https://drive.google.com/uc?export=download&id=1zZHbTCgTHG_wGYk6ir_Rc4An-vL70ubd');
const wrong = new Audio('https://drive.google.com/uc?export=download&id=1hI9DPEwRic_zQOxaknoffAHR4Qg27EyI');
const win = new Audio('https://drive.google.com/uc?export=download&id=1DBRbc6x56SvfO1prnNhob6K5cVN_uaTO');
const loose = new Audio('https://drive.google.com/uc?export=download&id=1F0dr1NTXDF-J_rJvNPUa_T8DPuuv4a7a');

// Determine the shape
function generateRandomShape() {
    return shapes[Math.floor(Math.random() * shapes.length)];
}

// Declaring global variables
const options = document.getElementById('options');
const canvas = document.getElementById('myCanvas');

// At the start of the game
window.addEventListener('load', () => {
    for (let i = 0; i < shapes.length; i++) {
        let btn = document.createElement('button');
        btn.classList = shapes[i];
        btn.textContent = shapes[i].toUpperCase();
        options.appendChild(btn);
    }
    startGame();
});

// Game Started
function startGame() {
    document.addEventListener('click', () => {
        // Starting the background music
        bgMusic.play();
    });

    var ctx = canvas.getContext("2d");
    // Get the canvas width and height
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;

    // Clear the canvas
    function clearCanvas() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }
    clearCanvas();

    // Calculate boundaries with 4% margin
    let margin = 0.04;
    let boundaryLeft = canvasWidth * margin;
    let boundaryTop = canvasHeight * margin;
    let boundaryRight = canvasWidth * (1 - margin);
    let boundaryBottom = canvasHeight * (1 - margin);

    // Checking point is valid or not
    function isPointInsideCircle(x, y, cx, cy, r) {
        // Calculate the distance between the point (x, y) and the center of the circle (cx, cy)
        var distance = Math.sqrt(Math.pow(x - cx, 2) + Math.pow(y - cy, 2));

        // Compare the distance with the radius (r)
        if (distance <= r) {
            // Point is inside the circle
            return true;
        } else {
            // Point is outside the circle
            return false;
        }
    }
    // function creating circle
    function drawCircle() {
        let centerX = canvasWidth / 2;
        let centerY = canvasHeight / 2;
        let radius = (boundaryRight - boundaryLeft) / 2;

        // Generate random coordinates within the updated boundaries
        let dotX = Math.floor(Math.random() * (boundaryRight - boundaryLeft) + boundaryLeft);
        let dotY = Math.floor(Math.random() * (boundaryBottom - boundaryTop) + boundaryTop);

        if (isPointInsideCircle(dotX, dotY, centerX, centerY, radius)) {
            // Draw the dot
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(dotX, dotY, 5, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    // function creating square
    function drawSquare() {
        // Generate random coordinates within the updated boundaries
        let dotX = Math.floor(Math.random() * (boundaryRight - boundaryLeft) + boundaryLeft);
        let dotY = Math.floor(Math.random() * (boundaryBottom - boundaryTop) + boundaryTop);
        var size = boundaryRight - boundaryLeft;
        ctx.fillStyle = "transparent";
        ctx.fillRect(boundaryLeft, boundaryTop, size, size);
        // Draw the dot
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(dotX, dotY, 5, 0, 2 * Math.PI);
        ctx.fill();
    }

    // function verifying the random point in inside the polygon or not
    function isPointInsidePolygon(x, y, vertices) {
        let windingNumber = 0;
        const numVertices = vertices.length;

        for (let i = 0; i < numVertices; i++) {
            const x1 = vertices[i][0];
            const y1 = vertices[i][1];
            const x2 = vertices[(i + 1) % numVertices][0];
            const y2 = vertices[(i + 1) % numVertices][1];

            if (y1 <= y) {
                if (y2 > y && isLeft(x, y, x1, y1, x2, y2) > 0) {
                    windingNumber++;
                }
            } else {
                if (y2 <= y && isLeft(x, y, x1, y1, x2, y2) < 0) {
                    windingNumber--;
                }
            }
        }

        return windingNumber !== 0;
    }
    function isLeft(x, y, x1, y1, x2, y2) {
        return ((x2 - x1) * (y - y1) - (x - x1) * (y2 - y1));
    }

    // Store each vertex of the pentagon
    let pentagonVertices = [];
    // function creating pentagon
    function drawPentagon() {
        let centerX = (boundaryRight + boundaryLeft) / 2;
        let centerY = (boundaryBottom + boundaryTop) / 2;
        let radius = (boundaryRight - boundaryLeft) / 2;

        // Generate random angle for each vertex
        let angle = Math.PI / 2; // Start angle (90 degrees)

        ctx.fillStyle = "transparent";
        ctx.beginPath();
        ctx.moveTo(centerX + radius * Math.cos(angle), centerY - radius * Math.sin(angle));

        // storing the vertices of the pentagon
        if (pentagonVertices.length === 0) {
            for (let i = 1; i <= 5; i++) {
                const angle = (i * 2 * Math.PI) / 5;
                const vertexX = centerX + radius * Math.cos(angle);
                const vertexY = centerY - radius * Math.sin(angle);
                pentagonVertices.push([vertexX, vertexY]);
            }
        }

        // Generate random coordinates within the updated boundaries
        let dotX = Math.floor(Math.random() * (boundaryRight - boundaryLeft) + boundaryLeft);
        let dotY = Math.floor(Math.random() * (boundaryBottom - boundaryTop) + boundaryTop);

        if (isPointInsidePolygon(dotX, dotY, pentagonVertices)) {
            // Draw the dot
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(dotX, dotY, 5, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    // function verifying the point is on the bars or not
    function isPointOnBars(x, y) {
        let centerX = (boundaryRight + boundaryLeft) / 2;
        let centerY = (boundaryBottom + boundaryTop) / 2;
        let size = boundaryRight - boundaryLeft;
        let barWidth = size / 3;
        let gapWidth = 40;

        // Calculate the total height occupied by the bars and gaps
        let totalHeight = barWidth * 2 + gapWidth;

        // Calculate the starting Y position for the first bar
        let startY = centerY - totalHeight / 2;

        // Define the boundaries of the bars
        let bar1Top = startY;
        let bar1Bottom = startY + barWidth;
        let bar2Top = startY + barWidth + gapWidth;
        let bar2Bottom = startY + totalHeight;

        let barLeft = centerX - size / 2;
        let barRight = centerX + size / 2;

        // Check if the point lies within the boundaries of either bar
        if (
            (x >= barLeft && x <= barRight && y >= bar1Top && y <= bar1Bottom) ||
            (x >= barLeft && x <= barRight && y >= bar2Top && y <= bar2Bottom)
        ) {
            return true; // Point is on either of the bars
        } else {
            return false; // Point is not on the bars
        }
    }
    // function creating bars
    function drawBars() {
        let centerX = (boundaryRight + boundaryLeft) / 2;
        let centerY = (boundaryBottom + boundaryTop) / 2;
        let size = boundaryRight - boundaryLeft;
        let barWidth = size / 3;
        let gapWidth = 40; // Adjust the gap width as desired

        ctx.fillStyle = "black";

        // Calculate the total height occupied by the bars and gaps
        let totalHeight = barWidth * 2 + gapWidth;

        // Calculate the starting Y position for the first bar
        let startY = centerY - totalHeight / 2;

        // Generate random coordinates within the updated boundaries
        let dotX = Math.floor(Math.random() * (boundaryRight - boundaryLeft) + boundaryLeft);
        let dotY = Math.floor(Math.random() * (boundaryBottom - boundaryTop) + boundaryTop);

        if (isPointOnBars(dotX, dotY)) {
            // Draw the dot
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(dotX, dotY, 5, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    // Store each vertex of the diamond
    let diamondVertices = [];
    // function creating diamond
    function drawDiamond() {
        let centerX = (boundaryRight + boundaryLeft) / 2;
        let centerY = (boundaryBottom + boundaryTop) / 2;
        let radius = (boundaryRight - boundaryLeft) / 2;

        ctx.fillStyle = "transparent";
        ctx.beginPath();
        if (diamondVertices.length === 0) {
            diamondVertices.push([centerX, centerY - radius]);
            diamondVertices.push([centerX + radius, centerY]);
            diamondVertices.push([centerX, centerY + radius]);
            diamondVertices.push([centerX - radius, centerY]);
        }

        // Generate random coordinates within the updated boundaries
        let dotX = Math.floor(Math.random() * (boundaryRight - boundaryLeft) + boundaryLeft);
        let dotY = Math.floor(Math.random() * (boundaryBottom - boundaryTop) + boundaryTop);

        if (isPointInsidePolygon(dotX, dotY, diamondVertices)) {
            // Draw the dot
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(dotX, dotY, 5, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    // Store each vertex of the star
    let starVertices = [];
    // function creating star
    function drawStar() {
        let centerX = (boundaryRight + boundaryLeft) / 2;
        let centerY = (boundaryBottom + boundaryTop) / 2;
        let radius = (boundaryRight - boundaryLeft) / 2;

        ctx.fillStyle = "transparent";
        ctx.beginPath();
        if (starVertices.length === 0) {
            for (let i = 0; i < 5; i++) {
                let angle = (Math.PI / 2) + i * ((2 * Math.PI) / 5);
                let innerRadius = radius / 2;

                // Outer vertex
                let outerX = centerX + radius * Math.cos(angle);
                let outerY = centerY - radius * Math.sin(angle);
                starVertices.push([outerX, outerY]);

                // Inner vertex
                let innerX = centerX + innerRadius * Math.cos(angle + ((2 * Math.PI) / 10));
                let innerY = centerY - innerRadius * Math.sin(angle + ((2 * Math.PI) / 10));
                starVertices.push([innerX, innerY]);
            }
        }

        // Generate random coordinates within the updated boundaries
        let dotX = Math.floor(Math.random() * (boundaryRight - boundaryLeft) + boundaryLeft);
        let dotY = Math.floor(Math.random() * (boundaryBottom - boundaryTop) + boundaryTop);

        if (isPointInsidePolygon(dotX, dotY, starVertices)) {
            // Draw the dot
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(dotX, dotY, 5, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    // functin verifying the point is within the donut
    function isPointOutsideDonut(x, y, centerX, centerY, innerRadius, outerRadius) {
        // Calculate the distance between the point and the center of the donut
        const distance = Math.floor(Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2));

        // Compare the distance with the outer radius
        if (distance <= outerRadius && distance >= innerRadius) {
            // Point is inside or within the donut's ring
            return true;
        } else {
            // Point is outside the donut
            return false;
        }
    }
    // function creating donut
    function drawDonut() {
        let centerX = (boundaryRight + boundaryLeft) / 2;
        let centerY = (boundaryBottom + boundaryTop) / 2;
        let radius = (boundaryRight - boundaryLeft) / 2;
        let innerRadius = radius / 2;

        ctx.fillStyle = "transparent";
        ctx.beginPath();
        // Generate random coordinates within the updated boundaries
        let dotX = Math.floor(Math.random() * (boundaryRight - boundaryLeft) + boundaryLeft);
        let dotY = Math.floor(Math.random() * (boundaryBottom - boundaryTop) + boundaryTop);

        if (isPointOutsideDonut(dotX, dotY, centerX, centerY, innerRadius, radius)) {
            // Draw the dot
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(dotX, dotY, 5, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    // Store each vertex of the triangle
    let triangleVertices = [];
    // function creating triangle
    function drawTriangle() {
        let centerX = (boundaryRight + boundaryLeft) / 2;
        let centerY = (boundaryBottom + boundaryTop) / 2;
        let radius = (boundaryRight - boundaryLeft) / 2;

        ctx.fillStyle = "transparent";
        ctx.beginPath();
        if (triangleVertices.length === 0) {
            triangleVertices.push([centerX, centerY - radius]);
            triangleVertices.push([centerX + radius * Math.cos((3 * Math.PI) / 3), centerY + radius * Math.sin((2 * Math.PI) / 3)]);
            triangleVertices.push([centerX - radius * Math.cos((3 * Math.PI) / 3), centerY + radius * Math.sin((2 * Math.PI) / 3)]);
        }

        // Generate random coordinates within the updated boundaries
        let dotX = Math.floor(Math.random() * (boundaryRight - boundaryLeft) + boundaryLeft);
        let dotY = Math.floor(Math.random() * (boundaryBottom - boundaryTop) + boundaryTop);

        if (isPointInsidePolygon(dotX, dotY, triangleVertices)) {
            // Draw the dot
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(dotX, dotY, 5, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    var shape = generateRandomShape();
    // function handling the formation of the different shapes
    function drawFigures() {
        let figure = generateRandomShape();
        shape = figure;

        // Draw the shape
        if (shape === 'circle') {
            let id = setInterval(drawCircle, delay);
            intervalId.push(id);
        } else if (shape === 'square') {
            let id = setInterval(drawSquare, delay);
            intervalId.push(id);
        } else if (shape === 'pentagon') {
            let id = setInterval(drawPentagon, delay);
            intervalId.push(id);
        } else if (shape === 'donut') {
            let id = setInterval(drawDonut, delay);
            intervalId.push(id);
        } else if (shape === 'bars') {
            let id = setInterval(drawBars, delay);
            intervalId.push(id);
        } else if (shape === 'triangle') {
            let id = setInterval(drawTriangle, delay);
            intervalId.push(id);
        } else if (shape === 'star') {
            let id = setInterval(drawStar, delay);
            intervalId.push(id);
        } else if (shape === 'diamond') {
            let id = setInterval(drawDiamond, delay);
            intervalId.push(id);
        }
    }
    drawFigures();

    // Handle the buttons click
    const buttons = document.querySelectorAll('button');
    let updateScoreValue = document.getElementById('scoreValue');
    let lifesValue = document.getElementById('lifesValue');
    buttons.forEach(btn => {
        btn.addEventListener("click", handleButtonClick);
    });

    // Handling the button click on options
    function handleButtonClick(event) {
        if (chance && event.target.classList[0] === shape) {
            ++score;
            event.target.style.background = "#4efc4e";

            // Updating the score
            updateScoreValue.innerHTML = score;
            correct.play();

            // Winning condition
            if (score >= 10) {
                bgMusic.pause();
                isPlaying = false;
                win.play();
                win.addEventListener('ended', () => {
                    location.reload();
                });
            }
        } else if (chance) {
            buttons.forEach(btn => {
                if (btn.classList.contains(shape)) {
                    btn.style.background = "#4efc4e";
                }
            });
            event.target.style.background = "#ff2929";
            wrong.play();

            // Updating lifes
            lifesValue.innerHTML = parseInt(lifesValue.innerHTML) - 1;

            // Losing condition
            if (parseInt(lifesValue.innerHTML) <= 0) {
                bgMusic.pause();
                isPlaying = false;
                loose.play();
                loose.addEventListener('ended', () => {
                    location.reload();
                });
            }
        }
        chance = false;
        if (isPlaying) {
            setTimeout(newBoard, 2000);
        }
    }

    // erasing the board for the next chance
    function newBoard() {
        clearCanvas();
        resetButtons();
        removeIntervals();
        drawFigures();
        chance = true;
    }

    // function removing the setintervals on the draw functions
    function removeIntervals() {
        for (let i = 0; i < intervalId.length; i++) {
            clearInterval(intervalId[i]);
        }
    }

    // Resetting the state of the buttons for the next chance
    function resetButtons() {
        buttons.forEach(btn => {
            btn.style.background = "#a67ffa";
        });
    }
}