getPost()
getPost()
getPost()

window.addEventListener("scroll", function() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement

  console.log( { scrollTop, scrollHeight, clientHeight })

  if (clientHeight + scrollTop >= scrollHeight - 5) {
    // We are at the top, we should show the loader animation
    showLoading()
  }
})

function showLoading() {
  loader.classList.add("show")
  // Wait a second to be able to see the loader image
  setTimeout(getPost(), 1000)
}

async function getPost() {
  fetch(`https://rickandmortyapi.com/api/character/${getRandomNumber()}`)
    .then(function(response) {
      return response.json()
    }).then(function(data) {
      console.log(data)
      addItemToCollection(data)
    })
}

function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1
}

function addItemToCollection(data) {
  const newElement = document.createElement("div")

  newElement.classList.add("item")
  newElement.innerHTML = (`
    <div class="char-id">${data.id}</div>
    <div class="char-name">${data.species}</div>
    <img class="char-img" src=${data.image} />
    <div class="char-species">${data.name}</div>
  `)
  items_container.appendChild(newElement)
  loader.classList.remove("show")
}
