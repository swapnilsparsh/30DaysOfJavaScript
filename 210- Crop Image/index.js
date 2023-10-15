document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let img = new Image();
    let crop = false;
    let cropWidth = 400;
    let cropHeight = 300;
  
    document.getElementById('loadImageButton').addEventListener('click', () => {
      const imageUrl = document.getElementById('imageUrl').value;
      img.src = imageUrl;
    });
  
    document.getElementById('cropButton').addEventListener('click', () => {
      crop = true;
      drawImage();
    });
  
    document.getElementById('resetButton').addEventListener('click', () => {
      crop = false;
      drawImage();
    });
  
    document.getElementById('downloadButton').addEventListener('click', () => {
      if (crop) {
        const dataUrl = canvas.toDataURL();
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = 'cropped_image.png';
        a.click();
      }
    });
  
    document.getElementById('cropWidth').addEventListener('change', (event) => {
      cropWidth = parseInt(event.target.value) || 0;
      drawImage();
    });
  
    document.getElementById('cropHeight').addEventListener('change', (event) => {
      cropHeight = parseInt(event.target.value) || 0;
      drawImage();
    });
  
    img.onload = function() {
      drawImage();
    };
  
    function drawImage() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (crop) {
        // Draw a resizable rectangle for cropping
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect((canvas.width - cropWidth) / 2, (canvas.height - cropHeight) / 2, cropWidth, cropHeight);
        ctx.clearRect((canvas.width - cropWidth) / 2, (canvas.height - cropHeight) / 2, cropWidth, cropHeight);
        ctx.drawImage(img, (canvas.width - cropWidth) / 2, (canvas.height - cropHeight) / 2, cropWidth, cropHeight,
          (canvas.width - cropWidth) / 2, (canvas.height - cropHeight) / 2, cropWidth, cropHeight);
      } else {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    }
  });
  