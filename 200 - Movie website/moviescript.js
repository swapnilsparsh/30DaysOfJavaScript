console.log("connected");

//api only
const api_key = "api_key=87f4ac324b0604d0d0b6fafc2cb21192";
const api_req = "https://api.themoviedb.org/3";
const api_popular =
  api_req + "/discover/movie?sort_by=popularity.desc&" + api_key;
const img_url = "https://image.tmdb.org/t/p/w500";
const api_latest_release =
  "https://api.themoviedb.org/3/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc&api_key=87f4ac324b0604d0d0b6fafc2cb21192";
const api_fictional =
  "https://api.themoviedb.org/3/discover/movie?with_genres=878&with_cast=500&sort_by=vote_average.descc&api_key=87f4ac324b0604d0d0b6fafc2cb21192";
const api_comedy =
  "https://api.themoviedb.org/3/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc&api_key=87f4ac324b0604d0d0b6fafc2cb21192";
const search_api = api_req + "/search/movie?" + api_key;

//documents only
const posi = document.querySelector("#pop");
const latest = document.querySelector("#latest");
const latest1 = document.querySelector("#latest1");
const latest2 = document.querySelector("#latest2");
let vids = document.querySelector(".small");
const cover = document.querySelector(".coverpage");
const backy = document.querySelector(".backy");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const cross = document.querySelector(".cross");
const menu = document.querySelector(".menus");
const ran = document.querySelector(".menu");
const butss = document.querySelector(".butss");
const headerchange = document.getElementById('ttt');
const aaa = document.querySelector('.xsc')
const criss = document.querySelector('.criss')
const gggg = document.querySelector('.gggg')
let bools = 1;

// genre array
const genre = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];
var selectedGenre = [];
let empty = "";
genre.forEach((element, index) => {
  empty += `
    <div class="fil" id="${element.id}">
          ${element.name}
     </div>
    `;
});

butss.innerHTML = empty;

let raw = document.getElementsByClassName("fil");

Array.from(raw).forEach((ele, i) => {
  ele.addEventListener("click", () => {
    console.log(ele.id + "clicked");
    if (selectedGenre.length == 0) {
      selectedGenre.push(ele.id);
    } else {
      if (selectedGenre.includes(ele.id)) {
        selectedGenre.forEach((id, idx) => {
          if (id == ele.id) {
            selectedGenre.splice(idx, 1);
          }
        });
      } else {
        selectedGenre.push(ele.id);
      }
    }
    getMovies(api_popular + '&with_genres='+encodeURI(selectedGenre.join(',')))
    c=''
    selection();
    
  });
});

let c=''
function selection() {
  console.log("selection");
  Array.from(raw).forEach((element) => {
    element.classList.remove("curractive");
    headerchange.style.display='none';
    headerchange.innerText=''

  });
  if (selectedGenre.length != 0) {
    headerchange.style.display='block';
    selectedGenre.forEach((id) => {
      let tobold = document.getElementById(id);
      c+= tobold.innerText +'  '; 
      tobold.classList.add("curractive");
    });
    headerchange.innerText=c

  }
}

menu.addEventListener("click", () => {
  if (bools == 1) {
    ran.style.left = 0;
    menu.src = "close-circle-outline.svg";
    bools = 0;
  } else {
    ran.style.left = "-100vh";
    menu.src = "menu-outline.svg";
    bools = 1;
  }
});

cross.addEventListener("click", () => {
  cover.style.opacity = 0;
  cover.style.zIndex = -10;
  cover.style.width = "0%";
  backy.style.opacity = 0;
  backy.style.zIndex = -10;
  cross.style.opacity = 0;
  // credits.style.opacity = 0;
  cross.style.zIndex = -10;
  // credits.style.zIndex = -10;
});
// for getting popular releases
getMovies(api_popular);
function getMovies(url) {
  fetch(url)
    .then(res => res.json())
    .then((data) => {
      console.log(data.results);
      if (data.results.length != 0) {
        showData(data.results);
      } else {
        posi.innerHTML = "NO SEARCH RESULTS FOUND";
      }
    });
}

function showData(data) {
  let newdata = "";
  posi.innerHTML = "";
  let count = 0;
  data.forEach((element, index) => {
    count++;
    if (count > 3) {
      count = 1;
    }
    if (count == 1) {
      str = "one";
    } else if (count == 2) {
      str = "two";
    } else {
      str = "three";
    }
    newdata += `<div class="card-wrap">
        <div class="card-header ${str}">
          <i class="fas fa-code">
          <img src="${img_url + element.poster_path}">
         </i>
        </div>
        <div class="card-content">
          <h1 class="card-title">${element.title}</h1>
          <p class="card-text" id="overview">
            <b>Overview</b> : ${element.overview}
          </p>
          <p class="card-text" id="release date">
            <b>Release Date :   </b>${element.release_date}
          </p>
          <p class="card-text" id="tagline">
            <b>Popularity : </b> ${element.popularity}
          </p>
          <p class="card-text" id="rating">
            <b>IMDB : </b> ${element.vote_average}
          </p>
          <button class="card-btn ${str} buttons" id=${element.id}>
            Watch Now</button>
          <button class="${element.id} newb" >
            Credits</button>
        </div>
      </div>`;
    // document.getElementById(element.id).addEventListener('click',()=>{
    //   console.log(element.id);
    // })
  });
  posi.innerHTML = newdata;
  callme();
  callme2();
}
function callme() {
  let ele = document.getElementsByClassName("buttons");
  // console.log(ele);

  Array.from(ele).forEach((element, i) => {
    element.addEventListener("click", () => {
      // console.log('clicked');
      console.log(element.id);
      cover.style.opacity = 1;
      cover.style.zIndex = 1000;
      cover.style.width = "100%";
      backy.style.opacity = 1;
      backy.style.zIndex = 1000;
      cross.style.zIndex = 1000;
      cross.style.opacity = 1;
      video_show(element.id);
      // slider_show(element.id);
    });
  });
}





function video_show(id) {
  let video_url = api_req + "/movie/" + id + "/videos?" + api_key;

  fetch(video_url)
    .then((res1) => res1.json())
    .then((data1) => {
      // console.log(data.results);
      // let arr =[];
      let clears = "";
      data1.results.forEach((ele, i) => {
        clears += `
          <iframe width="560" height="315" src="https://www.youtube.com/embed/${ele.key}" title=${ele.name} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="ccc hide"></iframe>
          `;
      });
      cover.innerHTML = clears;
      activeslide = 0;
      videoslider();

      // console.log(final.results);
    });
}
let activeslide = 0;
let lengthit;
function videoslider() {
  let cons = document.getElementsByClassName("ccc");
  // console.log(frames);
  lengthit = cons.length;
  Array.from(cons).forEach((ele, ind) => {
    if (activeslide == ind) {
      ele.classList.add("show");
      ele.classList.remove("hide");
    } else {
      ele.classList.add("hide");
      ele.classList.remove("show");
    }
  });
}
left.addEventListener("click", () => {
  if (activeslide > 0) {
    activeslide--;
  } else {
    activeslide = lengthit - 1;
  }
  videoslider();
});

right.addEventListener("click", () => {
  if (activeslide < lengthit - 1) {
    activeslide++;
  } else {
    activeslide = 0;
  }
  videoslider();
});
//for getting latest releases

getMovies1(api_latest_release);
function getMovies1(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showData1(data.results);
    });
}
function showData1(data) {
  let newdata1 = "";
  latest.innerHTML = "";
  let count = 0;
  data.forEach((element, index) => {
    count++;
    if (count > 3) {
      count = 1;
    }
    if (count == 1) {
      str = "one";
    } else if (count == 2) {
      str = "two";
    } else {
      str = "three";
    }
    newdata1 += `<div class="card-wrap">
        <div class="card-header ${str}">
          <i class="fas fa-code">
          <img src="${img_url + element.poster_path}">
         </i>
        </div>
        <div class="card-content">
          <h1 class="card-title">${element.title}</h1>
          <p class="card-text" id="overview">
            <b>Overview</b> : ${element.overview}
          </p>
          <p class="card-text" id="release date">
            <b>Release Date :   </b>${element.release_date}
          </p>
          <p class="card-text" id="tagline">
            <b>Popularity : </b> ${element.popularity}
          </p>
          <p class="card-text" id="rating">
          <b>IMDB : </b> ${element.vote_average}
        </p>
        <button class="card-btn ${str} buttons" id=${element.id}>
          Watch Now</button>
          <button class="${element.id} newb" >
          Credits</button>
        </div>
      </div>`;
  });
  latest.innerHTML = newdata1;
  callme();
  callme2();
}

getMovies2(api_fictional);
function getMovies2(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showData2(data.results);
    });
}
function showData2(data) {
  let newdata2 = "";
  latest1.innerHTML = "";
  let count = 0;
  let str;
  data.forEach((element, index) => {
    count++;
    if (count > 3) {
      count = 1;
    }
    if (count == 1) {
      str = "one";
    } else if (count == 2) {
      str = "two";
    } else {
      str = "three";
    }
    newdata2 += `<div class="card-wrap">
        <div class="card-header  ${str}">
          <i class="fas fa-code">
          <img src="${img_url + element.poster_path}">
         </i>
        </div>
        <div class="card-content">
          <h1 class="card-title">${element.title}</h1>
          <p class="card-text" id="overview">
            <b>Overview</b> : ${element.overview}
          </p>
          <p class="card-text" id="release date">
            <b>Release Date :   </b>${element.release_date}
          </p>
          <p class="card-text" id="tagline">
            <b>Popularity : </b> ${element.popularity}
          </p>
          <p class="card-text" id="rating">
          <b>IMDB : </b> ${element.vote_average}
        </p>
        <button class="card-btn ${str} buttons" id=${element.id}>
          Watch Now</button>
          <button class="${element.id} newb" >
          Credits</button>
        </div>
      </div>`;
  });
  latest1.innerHTML = newdata2;
  callme();
  callme2();
}

getMovies3(api_comedy);
function getMovies3(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showData3(data.results);
    });
}
function showData3(data) {
  let newdata3 = "";
  latest2.innerHTML = "";
  let count = 0;
  data.forEach((element, index) => {
    count++;
    if (count > 3) {
      count = 1;
    }
    if (count == 1) {
      str = "one";
    } else if (count == 2) {
      str = "two";
    } else {
      str = "three";
    }
    newdata3 += `<div class="card-wrap">
        <div class="card-header ${str}">
          <i class="fas fa-code">
          <img src="${img_url + element.poster_path}">
         </i>
        </div>
        <div class="card-content">
          <h1 class="card-title">${element.title}</h1>
          <p class="card-text" id="overview">
            <b>Overview</b> : ${element.overview}
          </p>
          <p class="card-text" id="release date">
            <b>Release Date :   </b>${element.release_date}
          </p>
          <p class="card-text" id="tagline">
            <b>Popularity : </b> ${element.popularity}
          </p>
          <p class="card-text" id="rating">
            <b>IMDB : </b> ${element.vote_average}
          </p>
          <button class="card-btn ${str} buttons" id=${element.id}>
            Watch Now</button>
            <button class="${element.id} newb" >
            Credits</button>
        </div>
      </div>`;
  });
  latest2.innerHTML = newdata3;
  callme();
  callme2();
}

const search = document.querySelector("#s");

search.addEventListener("input", () => {
  console.log("called");
  if (search.value.length != 0) {
    let curr = search.value;
    getMovies(search_api + "&query=" + curr);
  } else {
    getMovies(api_popular);
  }
});

criss.addEventListener('click',()=>{
  aaa.style.zIndex= -10;
  aaa.style.opacity=0;
})

function callme2(){
  let credd = document.getElementsByClassName('newb')
  console.log(credd);
  
  Array.from(credd).forEach((ele,i) => {
  
    ele.addEventListener('click',()=>{
      aaa.style.zIndex=1100;
      aaa.style.opacity=1;
      console.log(ele.classList[0]);
      slider_show(ele.classList[0]);
    })
  });
}

function slider_show(id){

  // let credit_url = 'https://api.themoviedb.org/3/movie/121/credits?api_key=87f4ac324b0604d0d0b6fafc2cb21192'
  let credit_url = api_req + '/movie/' + id +'/credits?' +api_key;
  fetch(credit_url)
  .then((res2) => res2.json())
  .then((data2) => {
    let clears1 = "";
    data2.cast.forEach((ele, i) => {
      clears1 += `
      <tr>
      <td data-label="Name">${ele.name}</td>
      <td data-label="Department">${ele.known_for_department}</td>
      <td data-label="Character">${ele.character}</td>
      <td data-label="Popularity">${ele.popularity}</td>
    </tr>
        `;
    });
    gggg.innerHTML = clears1;
  });

}