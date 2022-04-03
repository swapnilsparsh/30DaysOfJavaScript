(function () {
  // The number of bars that should be displayed
  const Bar_number = 50;

  // Get the audio element tag
  const audio = document.querySelector("audio");
  // audio.crossOrigin = "anonymous";
  const ctx = new AudioContext();

  // Creating an audio source
  const audioSource = ctx.createMediaElementSource(audio);

  const analayzer = ctx.createAnalyser();

  audioSource.connect(analayzer);
  audioSource.connect(ctx.destination);

  // Print the analyze frequencies
  const frequencyData = new Uint8Array(analayzer.frequencyBinCount);
  analayzer.getByteFrequencyData(frequencyData);
  console.log("frequencyData", frequencyData);

  // Get the visualizer container
  const visualizerContainer = document.querySelector(".visualizer-container");

  // Creating a set of pre-defined bars
  for (let i = 0; i < Bar_number; i++) {
    const bar = document.createElement("DIV");
    bar.setAttribute("id", "bar" + i);
    bar.setAttribute("class", "visualizer-container__bar");
    visualizerContainer.appendChild(bar);
  }

  // This function has the task to adjust the bar heights according to the frequency data
  function renderFrame() {
    analayzer.getByteFrequencyData(frequencyData);

    for (let i = 0; i < Bar_number; i++) {
      const index = (i + 10) * 2;

      const fd = frequencyData[index];

      const bar = document.querySelector("#bar" + i);
      if (!bar) {
        continue;
      }

      const barHeight = Math.max(4, fd || 0);
      bar.style.height = barHeight + "px";
    }

    window.requestAnimationFrame(renderFrame);
  }

  renderFrame();

  audio.volume = 0.6;
  audio.play();
})();
