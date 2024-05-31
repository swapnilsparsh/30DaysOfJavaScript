const fig = document.getElementById("fig");
const timeTaken = document.getElementById("timeTaken");
let start = new Date().getTime();

// Function to change color of the figure
const figureColor = () => {
    const colorArray = '0123456789ABCDEF';
    let hash = '#';
    for (let i = 0; i < 6; i++) {
        hash += colorArray[Math.floor(Math.random() * 16)];
    }
    fig.style.backgroundColor = hash;
}

// Function to change the figure position
const figurePosition = (top, left) => {
    fig.style.top = `${top}%`;
    fig.style.left = `${left}%`;
    fig.style.transform = `translate(-50%, -50%)`;
}

// Function to change the figure shape
const figureShape = (size) => {
    start = new Date().getTime();

    const choice = Math.floor(Math.random() * 2);
    fig.style.width = `${size}px`;
    fig.style.height = `${size}px`;
    fig.style.borderRadius = choice == 0 ? "50%" : "0";
}

// Event listener to change the figure properties once it is clicked
fig.addEventListener("click", () => {
    const end = new Date().getTime();
    timeTaken.innerHTML = (end - start) / 1000;

    const top = Math.floor(Math.random() * 100);
    const left = Math.floor(Math.random() * 100);
    const size = Math.floor(Math.random() * 100) + 50;

    figurePosition(top, left);
    figureShape(size);
    figureColor();
});
