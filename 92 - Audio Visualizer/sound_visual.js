const WIDTH = 100;
const HEIGHT = 100;

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = WIDTH;
canvas.height = HEIGHT;

const stream = navigator.mediaDevices.getUserMedia({ audio: true });

const audioCtx = new AudioContext();
audioCtx.resume();
var analyzer;

async function getAudio() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const audioCtx = new AudioContext();
  analyzer = audioCtx.createAnalyser();
}

async function getAudio() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const audioCtx = new AudioContext();
  analyzer = audioCtx.createAnalyser();
  const source = audioCtx.createMediaStreamSource(stream);
  source.connect(analyzer);
}

analyzer.fftSize = 2 ** 10;

const timeData = new Uint8Array(analyzer.frequencyBinCount);

async function getAudio() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const audioCtx = new AudioContext();
  analyzer = audioCtx.createAnalyser();
  const source = audioCtx.createMediaStreamSource(stream);
  source.connect(analyzer);

  analyzer.fftSize = 2 ** 10;

  const timeData = new Uint8Array(analylzer.frequencyBinCount);
  console.log(timeData);
}
getAudio();

function handleError(err) {
  console.log("You must give access to your mic in order to proceed");
}
async function getAudio() {
  const stream = await navigator.mediaDevices
    .getUserMedia({ audio: true })
    .catch(handleError);
}

const frequencyData = new Uint8Array(analyzer.frequencyBinCount);
console.log(frequencyData);
