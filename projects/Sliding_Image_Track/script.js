const track = document.getElementById("image-track");

// Handle mouse down event to record the initial mouse position
const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

// Handle mouse up event to reset mouse down position and store the previous percentage
const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

// Handle mouse move event to calculate and apply the new position of the images
const handleOnMove = e => {
  // If the mouse is not pressed down, exit the function
  if(track.dataset.mouseDownAt === "0") return;
  
  // Calculate the change in mouse position
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2; // Maximum delta based on half the window width
  
  // Calculate the percentage change for translation
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100); // Constrain to -100% to 0%
  
  // Update the current percentage in the dataset
  track.dataset.percentage = nextPercentage;
  
  // Animate the track's translation based on the calculated percentage
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)` // Center vertically
  }, { duration: 1200, fill: "forwards" });
  
  // Animate each image's object position for a smooth transition
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center` // Adjust horizontal position of images
    }, { duration: 1200, fill: "forwards" });
  }
}

/* -- Touch event handling for mobile devices -- */

// Attach mouse down event listener to window
window.onmousedown = e => handleOnDown(e);

// Attach touch start event listener for touch devices
window.ontouchstart = e => handleOnDown(e.touches[0]);

// Attach mouse up event listener to window
window.onmouseup = e => handleOnUp(e);

// Attach touch end event listener for touch devices
window.ontouchend = e => handleOnUp(e.touches[0]);

// Attach mouse move event listener to window
window.onmousemove = e => handleOnMove(e);

// Attach touch move event listener for touch devices
window.ontouchmove = e => handleOnMove(e.touches[0]);