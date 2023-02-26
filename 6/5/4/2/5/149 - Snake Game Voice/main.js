var canvas = document.getElementById("area");

canvas.style.height = "80vh";
canvas.style.width = "80%";

var clx = canvas.getContext("2d")

var xr = Math.floor(Math.random()*(canvas.width-40)+20);
var yr = Math.floor(Math.random()*(canvas.height-40)+20);

var snake = [{x:xr,y:yr},{x:xr+3,y:yr},{x:xr+6,y:yr},{x:xr+9,y:yr}]

function drawSnake(points){
    clx.fillStyle = "black";
    clx.fillRect(points.x, points.y, 2, 2);
}

var xc,yc;

function genCircle(){
    xc = Math.floor(Math.random()*(canvas.width-5));
    yc = Math.floor(Math.random()*(canvas.height-5));
    if(snake.includes({x:xc, y:yc}))
    return genCircle();
    return;
}

function drawCircle(){
    clx.fillStyle = "red";
    clx.beginPath();
    clx.arc(xc, yc, 2, 0, 360);
    clx.stroke();
    clx.fill();
}


snake.forEach(drawSnake);
genCircle()
drawCircle()

var preDir = "left";    
var dx=3,dy=3;          
var popped;

function move(dir){
    
    if(dir=="Background Noise")
        dir = preDir;
    if((preDir=="up" && dir=="down") || (preDir=="left" && dir=="right") || (preDir=="down" && dir=="up")||(preDir=="right" && dir=="left")){
        dir = preDir;
    }
    
    clx.clearRect(0,0,canvas.width, canvas.height)
    drawCircle();
    
    if(dir=="up"){
        snake.unshift({x:snake[0].x, y:snake[0].y-dy})
    }
    else if(dir=="down"){
        snake.unshift({x:snake[0].x, y:snake[0].y+dy})
    }
    else if(dir=="left"){
        snake.unshift({x:snake[0].x-dx, y:snake[0].y})
    }
    else if(dir=="right"){
        snake.unshift({x:snake[0].x+dx, y:snake[0].y})
    }
    preDir=dir;
    popped = snake.pop();
    snake.forEach(drawSnake);
}

function lose(){
    if(snake[0].x<=1 || snake[0].x>=canvas.width-1)
        return 1;
    if(snake[0].y<=1 || snake[0].y>=canvas.height-1)
        return 1;
    
    for(let i=1; i<snake.length; i++){
        if(snake[i].x==snake[0].x && snake[i].y==snake[0].y)
            return 1;
    }
    
    return 0;
}

function hasEaten(){
    if((snake[0].x>xc-2 && snake[0].x<xc+2) && (snake[0].y>yc-2 && snake[0].y<yc+2))
        snake.push(popped);
    if((snake[0].x+2>xc-2 && snake[0].x+2<xc+2) && (snake[0].y+2>yc-2 && snake[0].y+2<yc+2))
        snake.push(popped);
    else
        return;
    
    clx.clearRect(0,0,canvas.width, canvas.height)
    genCircle();
    drawCircle();       
    snake.forEach(drawSnake);
}