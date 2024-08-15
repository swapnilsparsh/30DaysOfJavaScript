const canvas = document.getElementById("canva");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//particle array to store randomised particle
let particleArray;
//get mouse cursor position
let mouse = {
    x: null,
    y: null,
    radius: (canvas.height/80)*(canvas.width/80)
};
//every time mouse position changes get access to it
window.addEventListener('mousemove',
    function(e) {
        mouse.x = e.x;
        mouse.y = e.y;
    }
);

//create particle so that every time we call it we get a randomised particle
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        //holds the number of pixel particles animate in x and y axis
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    //method to draw individual particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2,false);
        ctx.fillStyle = '#F64C72';
        ctx.fill();
    }
    //check particle position, check mouse position, move the particle, draw the particle
    update() {
        //if particle position is beyond the screen edge, reverse it
        if(this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }

        if(this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // check if correct mouse position overlaps with current mouse position, i.e, collision detection
        let opacityvalue = 1;
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dis = Math.sqrt(dx*dx + dy*dy);
        if(dis < mouse.radius+this.size) {
            if(mouse.x < this.size && this.x < canvas.width - this.size * 10) {
                this.x += 10;
            }
            if(mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }
            if(mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10;
            }
            if(mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
            }
        }
        //move particles which are not colliding in a direction
        this.x += this.directionX;
        this.y += this.directionY;
        //draw it
        this.draw();
    }
}

//function that will randomize values for each particle and push it to the particle array
function getParticles() {
    particleArray = [];
    let numParticle = (canvas.height * canvas.width)/10000;
    for(let i=0; i<numParticle*2; i++) {
        // let size = (Math.random()*5) + 1;
        let size = 1;
        let x = (Math.random() * ((innerWidth-size*2) - (size*2)) + size*2);
        let y = (Math.random() * ((innerHeight-size*2) - (size*2)) + size*2);
        let directionX = (Math.random()*5) - 2.5;
        let directionY = (Math.random()*5) - 2.5;
        let color = '#99738E';

        particleArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

//check if particles are close enough to connect them with line
function connectPossible() {
    let opacityvalue = 0.25;
    for(let i=0;i<particleArray.length;i++) {
        for(let j=i;j<particleArray.length;j++) {
            let distance = ((particleArray[i].x - particleArray[j].x)*(particleArray[i].x - particleArray[j].x)) + ((particleArray[i].y - particleArray[j].y)*(particleArray[i].y - particleArray[j].y));
            if(distance < (canvas.width/8)*(canvas.height/8)) {
                // opacityvalue = 1- (distance/20000);
                ctx.strokeStyle = 'rgba(255,255,255,'+opacityvalue+')';
                ctx.linewidth = 1;
                ctx.beginPath();
                ctx.moveTo(particleArray[i].x,particleArray[i].y);
                ctx.lineTo(particleArray[j].x,particleArray[j].y);
                ctx.stroke();
            }
        }
    }
}

function sunray() {
    let opacityvalue = 1;
    for(let i=0;i<particleArray.length;i++) {
        let dx = mouse.x-particleArray[i].x;
        let dy = mouse.y-particleArray[i].y;
        let distance = Math.sqrt(dx*dx+dy*dy);
        if(distance < mouse.radius+particleArray[i].size) {
            let opacityvalue = 1-(distance/20000);
            ctx.strokeStyle = 'rgba(0,0,0,'+opacityvalue+')';
            ctx.linewidth = 1;
            ctx.beginPath();
            ctx.moveTo(particleArray[i].x,particleArray[i].y);
            ctx.lineTo(mouse.x,mouse.y);
            ctx.stroke();
        }
    }
}

//windown resize and canve donot streach
window.addEventListener('resize', 
    function() {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mouse.radius = (canvas.width/80)*(canvas.height/80);
        getParticles();
    }
);

//animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight);

    for(let i=0; i<particleArray.length; i++) {
        particleArray[i].update();
    }
    // sunray();
    sunray();
    connectPossible();
}

//mouse out event
window.addEventListener('mouseout',
    function() {
        mouse.x = undefined;
        mouse.y = undefined;
    }
)

getParticles();
animate();