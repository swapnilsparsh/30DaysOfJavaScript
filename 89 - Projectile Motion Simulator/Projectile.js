export class Projectile {
    constructor(element, x, y, initVelocityValue, angleValue, g = 9.8) {
        // Projectile properties
        this.element = element;
        this.x = x;
        this.y = y;
        this.initVelocityValue = initVelocityValue;
        this.angleValue = angleValue;
        this.g = g;

        // Calculate initial velocities
        this.vx = initVelocityValue * Math.cos(Math.PI * angleValue / 180);
        this.vy0 = initVelocityValue * Math.sin(Math.PI * angleValue / 180);

        // Calculate maximum height and horizontal range
        this.maxHeight = Math.round((this.vy0 * this.vy0) / (2 * this.g));
        this.horizontalRange = Math.round(this.vx * (2 * this.vy0 / this.g));

        // Animation variables
        this.currentTime = 0;
        this.motion = true;
        this.intervalCount = 0;
        this.animationFrameId = null;
        this.count = 0;
    }

    // Tooltip for displaying distance
    toolTip(toolTipStyle, maxDist) {
        let axisDist = document.createElement('div');
        let text = document.createTextNode(maxDist);
        axisDist.appendChild(text);
        axisDist.classList.add(`${toolTipStyle}`);
        axisDist.style.left = this.x + 'px';
        axisDist.style.bottom = this.y + 'px';
        this.element.parentElement.appendChild(axisDist);
    }

    // Add path element to visualize projectile trajectory
    addPath() {
        let path = document.createElement('div');
        path.classList.add('path');
        path.style.left = this.x + 'px';
        path.style.bottom = this.y + 'px';
        this.element.parentElement.appendChild(path);
    }

    // Move projectile horizontally
    moveHorizontal() {
        this.x = this.vx * this.currentTime;
        this.element.style.left = this.x + 'px';
    }

    // Move projectile vertically
    moveVertical() {
        this.vy = this.vy0 - this.g * this.currentTime;
        this.y = this.vy0 * this.currentTime - 0.5 * this.g * this.currentTime * this.currentTime;

        // Ensure projectile doesn't go below ground level
        if (this.y < 0) this.y = 0;

        // Update projectile position
        this.element.style.bottom = this.y + 'px';

        // Update vertical velocity display
        document.getElementById('ver-vel').innerText = this.vy.toFixed(2);
    }

    // Launch the projectile
    launch() {
        const animate = () => {
            if (this.motion) {
                this.currentTime += 0.1;
                this.moveHorizontal();
                this.moveVertical();
                if (this.intervalCount % 3 == 0) this.addPath();

                if (parseInt(this.vy) == 0) {
                    if (this.count == 0) {
                        this.toolTip('yDist', this.maxHeight.toFixed(2)); // Log maximum height when vy reaches zero
                        this.count++;
                    }
                }

                // Check if projectile hits ground
                if (this.y <= 0 && this.currentTime > 0) {
                    this.motion = false;
                    cancelAnimationFrame(this.animationFrameId);
                    this.toolTip('xDist', this.x.toFixed(2));
                } else this.animationFrameId = requestAnimationFrame(animate);
            }
            this.intervalCount++;
        };
        animate();
    }

    // Reset projectile to initial state
    reset() {
        // Stop animation
        this.motion = false;
        this.currentTime = 0;

        // Reset position
        this.x = this.y = 0;
        this.element.style.left = this.element.style.bottom = '0px';

        // Clear trajectory path
        let elements = document.getElementsByClassName('path');
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }

        // Clear tooltips
        let yDist = document.getElementsByClassName('yDist');
        if (yDist.length > 0) {
            yDist[0].parentNode.removeChild(yDist[0]);
        }
        let xDist = document.getElementsByClassName('xDist');
        if (xDist.length > 0) {
            xDist[0].parentNode.removeChild(xDist[0]);
        }
    }
}
