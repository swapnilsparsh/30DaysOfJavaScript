// Variable to store if the current search need anime or manga
var nameType = "Manga";
const api = "https://api.jikan.moe/v4/"

// Changes the name type to anime or manga on window load
window.onload = changeNameType();

// function to swap the name type
function changeNameType() {
    nameType = nameType==="Manga"?"Anime":"Manga";
    document.getElementById('output').innerHTML = nameType;
    document.getElementById('search-anime').innerHTML = nameType;
    document.getElementById('swap-anime').innerHTML = nameType==="Manga"?"Anime":"Manga";
};

function createElement(direct_url, image_url, title) {
    // <div class="card">
    //     <a href="https://myanimelist.net/anime/20/Naruto" target="_blank">
    //         <img 
    //             src="https://cdn.myanimelist.net/images/anime/13/17405.jpg"
    //             alt="Naruto Poster" 
    //         />
    //     <h3>Naruto</h3>
    //     </a>
    // </div>
    var card = document.createElement('div');
    card.className = "card";
    var link = document.createElement('a');
    link.href = direct_url;
    link.target = "_blank";
    var img = document.createElement('img');
    img.src = image_url;
    img.alt = title + 'Poster';
    var h3 = document.createElement('h3');
    h3.innerHTML = title;
    link.appendChild(img);
    link.appendChild(h3);
    card.appendChild(link);
    return card;
}

// Removes all the children of the element
function removeElemt(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// function to search anime or manga
function searchWeeb() {
    const mainElement = document.getElementsByClassName('main')[0];
    removeElemt(mainElement);
    fetch(api + nameType.toLowerCase() + "?q=" + document.getElementById('search').value)
            .then(response => response.json())
            .then(data => data.data)
            .then(data => {
                data.forEach(element => {
                    var card = createElement(element.url, element.images.webp.image_url, element.title);
                    mainElement.appendChild(card);
                })
            })
            .catch(error => console.log(error));
};
