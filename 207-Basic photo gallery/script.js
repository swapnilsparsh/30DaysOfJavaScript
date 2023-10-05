function uploadImage() {
    const imageInput = document.getElementById('imageInput');
    const gallery = document.getElementById('gallery');
  
    const file = imageInput.files[0];
  
    if (file) {
      // Create a thumbnail
      const thumbnail = document.createElement('img');
      thumbnail.classList.add('thumbnail');
      thumbnail.src = URL.createObjectURL(file);
  
      // Add the thumbnail to the gallery
      gallery.appendChild(thumbnail);
  
      // Clear the input value
      imageInput.value = '';
    }
  }
  