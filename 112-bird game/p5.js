const canvas=document.getElementById("canvas1");
const ctx=canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;


const collision=document.getElementById("collision");
const collisionctx=collision.getContext('2d');
collision.width=window.innerWidth;
collision.height=window.innerHeight;


let gameover=false;
let score=0;
ctx.font='50px Impact';
let timetoNextraven=0;
let ravenInterval=500;
let lastTime=0;

let ravens=[];



class Raven {
    constructor(){
        this.spritewidth=271;
        this.spritheight=194;
        this.sizeModifier=Math.random()*0.3+0.7;
        this.width=this.spritewidth*this.sizeModifier;
        this.height=this.spritheight*this.sizeModifier;
        this.x=canvas.width;
        this.y=Math.random()*(canvas.height-this.height);
        this.dierctionX=Math.random()*5+3;
        this.dierctionY=Math.random()*5-2.5;
        this.markedfordelete=false;
        this.image=new Image();
        this.image.src="raven.png";
        this.frame=0;
        this.maxFrame=4;
        this.timesinceflap=0;
        this.flapInterval=Math.random()*50+50;
        this.randomColors=[Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255)]
        this.color='rgb('+this.randomColors[0]+','+this.randomColors[1]+','+this.randomColors[2]+')';
        this.hastrail=Math.random()>0.5;

    }
    update(deltatime){
        if(this.y<0 ||this.y>canvas.height-this.height){
            this.dierctionY=this.dierctionY*-1;
        }
        this.x-=this.dierctionX;
        this.y+=this.dierctionY;
        if(this.x<0-this.width) this.markedfordelete=true;
        this.timesinceflap+=deltatime;
        if(this.timesinceflap>this.flapInterval){
            
        if(this.frame>this.maxFrame) this.frame=0;
        else this.frame++
        this.timesinceflap=0;
        if(this.hastrail){
            for(let i=0;i<5;i++){
         particles.push(new Particles(this.x,this.y,this.width,this.color));
            }
        }
        }
      if(this.x<0-this.width)gameover=true;


        
    }
    draw(){
       
        collisionctx.fillStyle=this.color;
        collisionctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(this.image,this.frame*this.spritewidth,0,this.
            spritewidth,this.spritheight,this.x,this.y,this.width,this.height);
    }
}

let explosions=[];
class Explosions{
      constructor(x,y,size){
        this.image=new Image();
        this.image.src='boom.png'
        this.spritewidth=200;
        this.spritheight=179;
        this.size=size;
        this.x=x;
        this.y=y;
        this.frame=0;
        this.sound=new Audio();
        this.sound.src="Ice attack 2.wav";
        this.timesinceflap=0;
        this.flapInterval=200;
        this.markedfordelete=false;
      }
      update(deltatime){
        if(this.frame===0)this.sound.play();
        this.timesinceflap+=deltatime;
        if(this.timesinceflap>this.flapInterval){
            this.frame++;
            this.timesinceflap=0;
            if(this.frame>5)this.markedfordelete=true;
        }
      }
      draw(){
        ctx.drawImage(this.image,this.frame*this.spritewidth,0,this.spritewidth,this.spritheight,this.x,this.y-this.size/4,this.size,this.size)
      }
}
let particles=[];

class Particles{
  constructor(x,y,size,color){
     this.size=size;
    this.x=x+this.size/2+Math.random()*50-25;
    this.y=y+this.size/3+Math.random()*50-25;
    
    this.radius=Math.random()*this.size/10;
    this.maxRadius=Math.random()*20+35;
    this.markedfordelete=false;
    this.speedX=Math.random()*1+0.5;
    this.color=color;

  }
  update(){
    this.x+=this.speedX;
    this.radius+=0.3;
    if(this.radius>this.maxRadius-5)this.markedfordelete=true;
  }
  draw(){
    ctx.save();
    ctx.globalAlpha=1-this.radius/this.maxRadius;
    ctx.beginPath();
    ctx.fillStyle=this.color;
    ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
    ctx.fill();
    ctx.restore();
  }
}

function drawScore(){
    ctx.fillStyle='black';
    ctx.fillText("score: "+ score, 50, 75);
    ctx.fillStyle='white';
    ctx.fillText("score: "+ score, 55, 80);
    
};

function drawGameover(){
 ctx.textAlign='center';
  ctx.fillStyle='black';
  ctx.fillText('Game Over,your Score is:'+score,canvas.width/2,canvas.height/2);
  ctx.fillStyle='white';
  ctx.fillText('Game Over,your Score is:'+score,canvas.width/2+5,canvas.height/2+5);
}

window.addEventListener('click',function(e){
    const detectPixelcolor=collisionctx.getImageData(e.x,e.y,1,1);

    console.log(detectPixelcolor);
    const pc = detectPixelcolor.data;
    ravens.forEach(object=>{
        if(object.randomColors[0]===pc[0] && object.randomColors[1]===pc[1] &&object.randomColors[2]===pc[2] ){
           //collision detected
           
            object.markedfordelete=true;
            score++;
            explosions.push(new Explosions(object.x,object.y,object.width));
        }
    })
});


function animate(timestamp){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    collisionctx.clearRect(0,0,canvas.width,canvas.height);
   
    let deltatime=timestamp-lastTime;
    lastTime=timestamp;
    timetoNextraven+=deltatime;
   
    if(timetoNextraven > ravenInterval){
        ravens.push(new Raven());
        timetoNextraven=0;
        ravens.sort(function(a,b){
            return a.width-b.width;//to draw raven smaller on downside and bigger on upper

        });
    };
    drawScore();
    
     [...particles,...ravens, ...explosions].forEach(object=>object.update(deltatime));
     [...particles,...ravens, ...explosions].forEach(object=>object.draw());
     ravens=ravens.filter(object=>!object.markedfordelete);
     explosions=explosions.filter(object=>!object.markedfordelete);
     particles=particles.filter(object=>!object.markedfordelete)

  
    if(!gameover){requestAnimationFrame(animate);}
    else {drawGameover();}
}
animate(0);