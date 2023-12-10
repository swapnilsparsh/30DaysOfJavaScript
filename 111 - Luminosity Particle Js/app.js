/* Please view in Chrome for best effects! :) */

// Configure
var MAX_DISTANCE  = 200,
    PARTICLES     = 40,
    PARTICLE_SIZE = 5;

// No configure! :p
Math.Tau = Math.PI * 2;
Math.rand = function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

Math.map = function map(value, imin, imax, omin, omax) {
  return ((value - imin) * (omax - omin) / (imax - imin) + omin);
};

window.requestAnimFrame = (function(){
  return window.requestAnimationFrame    ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    function( callback ){
      window.setTimeout(callback, 1000 / 60);
    };
})();

window.addEventListener('load', function(event) {
  var canvas  = document.getElementById('c');
  var context = canvas.getContext('2d');
  var width, height;
  var particleCounter = 0,
      hover = false,
      stats = new Stats(),
      mmon = new MousePositionMonitor(),
      is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

  stats.setMode(0); // Start off with FPS mode

  // Place the statistics at the bottom right.
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.right = '5px';
  stats.domElement.style.bottom = '5px';
  
  document.body.appendChild(stats.domElement);
  
  context.lineWidth = "hairline";
  
  var resize = function(event) {
    width  = canvas.width  = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }; resize();
  
  window.addEventListener('resize', resize);
  
  canvas.addEventListener('mouseenter', function() {
    hover = true;
  });

  canvas.addEventListener('mouseleave', function() {
    hover = false;
  });
  
  var Color = function Color(r, g, b, a) {
    this.r = Math.floor(r);
    this.g = Math.floor(g);
    this.b = Math.floor(b);
    this.a = Math.floor(a || 255);
  };
  
  Color.prototype.clone = function() {
    return new Color(this.r, this.g, this.b, this.a);
  };
  
  Color.prototype.toString = function() {
    if(this.a === 255) {
      return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
    } else {
      return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + (this.a / 255) + ')';
    }
  };
  
  var Particle = function Particle(x, y, size, color) {
    this.x  = x;
    this.y  = y;
    this.s  = size;
    this.r  = size / 2;
    this.vx = (Math.random() < 0.5 ? -1 : 1) * Math.rand(0.5, 2);
    this.vy = (Math.random() < 0.5 ? -1 : 1) * Math.rand(0.5, 2);
    this.id = particleCounter++;
    
    if(color instanceof Color) {
      this.c = color;
    } else {
      this.c = new Color(255, 255, 255, 255);
    }
  };
  
  Particle.prototype.distance = function(that) {
    if(that instanceof Particle) {
      return Math.sqrt((this.x-that.x) * (this.x - that.x) + (this.y - that.y) * (this.y - that.y));
    }
  };
  
  Particle.prototype.step = function() {
    this.x = (this.x + this.vx);
    if(this.x < this.r) {
      this.x = this.r;
      this.vx *= -1;
    } else if(this.x > width - this.r) {
      this.x = width - this.r;
      this.vx *= -1;
    }
    
    this.y = (this.y + this.vy);
    if(this.y < this.r) {
      this.y = this.r;
      this.vy *= -1;
    } else if(this.y > height - this.r) {
      this.y = height - this.r;
      this.vy *= -1;
    }
  };
  
  Particle.prototype.render = function() {
    context.fillStyle = this.c.toString();
    context.beginPath();
    context.arc(this.x, this.y, Math.floor(this.s / 2), 0, Math.Tau, false);
    context.closePath();
    context.fill();
  };
  
  var particles = [];
  for(var i = 0; i < PARTICLES - 1; i++) {
    particles.push(
      new Particle(
        Math.random() * width, 
        Math.random() * height, 
        PARTICLE_SIZE, 
        new Color(
          Math.random() * 255, 
          Math.random() * 255, 
          Math.random() * 255, 
          255)
      )
    );
  }
  
  // this one is controllable by mouse movement.
  var mouseParticle = new Particle(
    Math.random() * width, 
    Math.random() * height, 
    PARTICLE_SIZE * 2, 
    new Color(0, 200, 100, 255)
  );
  
  mouseParticle.imp = true;
  
  particles.push(mouseParticle);

  var render = function() {
    //context.clearRect(0, 0, width, height);
    context.fillStyle = 'rgba(0, 0, 0, 0.3)';
    context.fillRect(0, 0, width, height);
    
    // render all the particles and check distances
    var paired = {};
    var ipart  = PARTICLES;
    while(ipart--) {
      var p1    = particles[ipart];
      var jpart = ipart;
      
      p1.step();
      if(p1.imp && hover) {
        var pos = mmon.getMousePosition();
        p1.x = pos.x;
        p1.y = pos.y;
      }
      p1.render();
      
      while(jpart--) {
        var p2 = particles[jpart];
        
        if(p1 !== p2 && !paired[p1.id + '-' + p2.id] && !paired[p2.id + '-' + p1.id]) {
          var distance = p1.distance(p2);
          if(distance < MAX_DISTANCE) {
            if(!is_firefox) {
              var grd = context.createLinearGradient(p1.x, p1.y, p2.x, p2.y),
                  c1 = p1.c.clone(), c2 = p2.c.clone();

              c1.a = c2.a = Math.floor(Math.map(distance, MAX_DISTANCE, 0, 0, 255));

              grd.addColorStop(0, c1), grd.addColorStop(1, c2);

              context.strokeStyle = grd;
            } else {
              var c = p1.c.clone();
              c.a = Math.floor(Math.map(distance, MAX_DISTANCE, 0, 0, 255));
              context.strokeStyle = c.toString();
            }
            
            context.beginPath();
              context.moveTo(p1.x, p1.y);
              context.lineTo(p2.x, p2.y);
            context.closePath();
            context.stroke();
            
            paired[p1.id + '-' + p2.id] = paired[p2.id + '-' + p1.id] = true;
          }
        }
      }
    }
  };
  
  var loop = function() {
    requestAnimFrame(loop);
    stats.begin();
    render();
    stats.end();
  }; loop();
});