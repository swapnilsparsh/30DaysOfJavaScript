const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const context = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const click = document.querySelector('.snap');
const redRadio = document.querySelector('#red-filter')
const greenRadio = document.querySelector('#green-filter')
const blueRadio = document.querySelector('#blue-filter')
const splitRadio = document.querySelector('#split-filter')
const ghostRadio = document.querySelector('#ghost-filter')
const customRadio = document.querySelector('#custom-filter')
const noRadio = document.querySelector('#no-filter')

// Gets the Video from Webcam
function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(localMediaStream => {
            console.log(localMediaStream);
            video.srcObject = localMediaStream; 
            video.play();
        })
        .catch(error => {
            console.error("Please allow Webcam Access to take Photo", error);
        })
}

// Takes an image of the video every 16 milliseconds and inputs the image data to the canvas element.
function previewToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        context.drawImage(video, 0 , 0, width, height);
        let pixels = context.getImageData(0, 0, width, height);
        if(noRadio.checked === true) {
            pixels = context.getImageData(0, 0, width, height);
            context.globalAlpha = 1;
        }
        // Sets Red Filter
        if(redRadio.checked === true) {
            pixels = redFilter(pixels);
        }
        // Sets Green Filter 
        if(greenRadio.checked === true) {
            pixels = greenFilter(pixels);
        }
        // Sets Blue Filter 
        if(blueRadio.checked === true) {
            pixels = blueFilter(pixels);
        }
        // Set RGG Split Filter
        if(splitRadio.checked === true) {
            pixels = rgbSplit(pixels);
        }
        // Sets Ghost Filter
        if(ghostRadio.checked === true) {
            pixels = ghostFilter(pixels);
        }
        // Sets Custom Filter
        if(customRadio.checked === true) {
            pixels = customFilter(pixels);
        }
        context.putImageData(pixels, 0, 0);
    }, 16);
}
// context.getImageData(0, 0, width, height); returns a special array which contains red green blue alpha values or each pixel in intervals of 4.
// Doing operations with each pixel creates the filter.

// Red Filter 
function redFilter(pixels) {
    for (let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i + 0] += 120;
        context.globalAlpha = 1; // Default alpha value.
    }
    return pixels;
}
// Green Filter 
function greenFilter(pixels) {
    for (let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i + 1] += 120;
        context.globalAlpha = 1;
    }
    return pixels;
}
// Blue Filter 
function blueFilter(pixels) {
    for (let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i + 2] += 120;
        context.globalAlpha = 1;
    }
    return pixels;
}
// RGB Split Filter
function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i - 150] = pixels.data[i + 0]; // RED
        pixels.data[i + 200] = pixels.data[i + 1]; // GREEN
        pixels.data[i - 250] = pixels.data[i + 2]; // Blue
        context.globalAlpha = 1;
    }
    return pixels;
}
// Ghost Filter
function ghostFilter(pixels) {
    for (let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i - 100] = pixels.data[i + 0]; // RED
        pixels.data[i + 150] = pixels.data[i + 1]; // GREEN
        pixels.data[i - 200] = pixels.data[i + 2]; // Blue
        context.globalAlpha = 0.1; // Sets alpha 10 times behind current.
    }
    return pixels;
}
// Custom Filter takes rgb values from the input of type range.
// Its much slower than the other filters due to user defined values.
function customFilter(pixels) {
    for (let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i + 0] -= red.value; // RED
        pixels.data[i + 1] -= green.value; // GREEN
        pixels.data[i + 2] -= blue.value; // Blue
        context.globalAlpha = 1;
        pixels.data[i + 3] -= alpha.value; //
    }
    return pixels;
}

// Takes photo and inserts it into the Strip like a Clipboard.
function takePhoto() {
    click.currentTime = 0;
    click.play();

    const data = canvas.toDataURL('image/jpeg'); // Converts the image to a URL.
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'Snap');
    link.innerHTML = `<img src="${data}" alt="Snap"/>`; // Sets the "src" attribute for downloading the picture.
    strip.insertBefore(link, strip.firstChild);
}

getVideo(); 
video.addEventListener('canplay', previewToCanvas)