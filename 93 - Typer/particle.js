/* global canvas paintCircle generateRandomNumber generateRandomRgbColor */
/* eslint-disable no-unused-vars */
const particle = {
    decrease: 0.05,
    highestAlpha: 0.8,
    highestRadius: 5,
    highestSpeedX: 5,
    highestSpeedY: 5,
    lowestAlpha: 0.4,
    lowestRadius: 2,
    lowestSpeedX: -5,
    lowestSpeedY: -5,
    total: 100
  };
  
  const particles = [];
  
  const paintParticles = () => {
    for (const p of particles) {
      paintCircle(p.x, p.y, p.radius, p.color);
    }
  };
  
  const createParticles = (x, y) => {
    for (let i = 0; i < particle.total; i++) {
      const c = generateRandomRgbColor();
      const alpha = generateRandomNumber(particle.lowestAlpha, particle.highestAlpha);
      particles.push({
        x,
        y,
        radius: generateRandomNumber(particle.lowestRadius, particle.highestRadius),
        color: `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${alpha})`,
        speedX: generateRandomNumber(particle.lowestSpeedX, particle.highestSpeedX),
        speedY: generateRandomNumber(particle.lowestSpeedY, particle.highestSpeedY)
      });
    }
  };
  
  const processParticles = frames => {
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.speedX * frames;
      p.y += p.speedY * frames;
      p.radius -= particle.decrease;
      if (p.radius <= 0 || p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
        particles.splice(i, 1);
      }
    }
  };
  