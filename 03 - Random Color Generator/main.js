window.onload = function () {
    addColor();
};

for (let i = 1; i <= 9; i++) {
    const box = document.createElement('div');
    box.classList.add('box');
    document.querySelector('.container').appendChild(box);
    box.style.cursor = 'pointer';
    box.addEventListener('click', () => {
        console.log(box.innerHTML);
        navigator.clipboard.writeText(box.innerHTML);
    });
}

const btn = document.querySelector('.btn');
const randomColorBlock = document.querySelectorAll('.box');

function RandomHexColorCode () {
    var chars = '0123456789abcdef';
    var colorLength = 6;
    var color = '';

    for (var i = 0; i < colorLength; i++) {
        var randomColor = Math.floor(Math.random() * chars.length);
        color += chars.substring(randomColor, randomColor + 1);
    }
    return '#' + color;
}

function addColor () {
    randomColorBlock.forEach(e => {
        var newColor = RandomHexColorCode();
        e.style.backgroundColor = newColor;
        e.innerHTML = newColor;
    });
}
const colorContainer = document.querySelector('#color-container');
const toast = document.querySelector('#toast');

colorContainer.addEventListener('click', () => {
  // Get the color code
  const colorCode = colorContainer.style.backgroundColor;

  // Copy the color code to the clipboard
  navigator.clipboard.writeText(colorCode);

  // Show the toast message
  toast.textContent = `Color Copied: ${colorCode}`;
  toast.style.display = 'block';

  // Hide the toast message after 2 seconds
  setTimeout(() => {
    toast.style.display = 'none';
  }, 2000);
});

