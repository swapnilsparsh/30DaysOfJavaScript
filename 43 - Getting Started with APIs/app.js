btn_generate.addEventListener("click", function() {
  fetch("https://api.thecatapi.com/v1/images/search?limit=5&page=10&order=Desc")
    .then(function(response) {
      return response.json()
    })
    .then(function(data) {
      console.log(data)
      let newImg = null
      data.forEach(function(image) {
        newImg = document.createElement("img")
        newImg.src = image.url
        newImg.classList.add('gallery__img')
        gallery.appendChild(newImg)
      })
    })
})
