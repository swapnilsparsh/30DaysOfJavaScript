"use strict";
const Start = document.querySelector(".HomePage");
const spinner = document.querySelector(".spinner");
const ReelPage = document.querySelector(".ReelPage");
let Video = document.querySelector("#videoPlayer");
const stor = document.querySelector(".story");
const images = document.querySelector(".backGr");
const reelbutton = document.querySelector(".button1");
const allfilters = document.querySelector(".filter");
const iconflip = document.querySelector(".icon");
const FilterCover = document.querySelector(".FilterBlockScope");
const PFilters = document.querySelector(".ParentFilter");
const Toreels = document.querySelector(".reels");
const ReelSection = document.querySelector(".ReelPage");
const InstPage = document.querySelector(".Instagram-Page");
// const backbutton=document.querySelector('.InstIcon');
let ReelAnswers;
let tracks = [];
let instagramFiltersContent = [
  {
    link: "273884287_1162311734577078_3652211896240796441_n.mp4",
    channelName: "murbanvideo",
    likes: "36.6K",
    comments: "98",
    middlesection: "Which is your favourite? Filmed in SLOG-3 ..",
    song: "omura Nolanomura",
  },
  {
    link: "273470311_678773606827659_2545209592104638155_n.mp4",
    channelName: "japan_.carss",
    likes: "277K",
    comments: "1058",
    middlesection: "R34 or R35? 😍",
    song: "japan_carss .Orignal Audio",
  },
  {
    link: "272906367_471067674682932_5387380735934833246_n.mp4",
    channelName: "carlee.horton",
    likes: "27K",
    comments: "108",
    middlesection: "January 🎞",
    song: "Suffer with me Sandiego",
  },
  {
    link: "274006084_161179402932069_5607339682707444194_n.mp4",
    channelName: "mrexpress_r6",
    likes: "105K",
    comments: "106",
    middlesection: "⚡⚡⚡ ....",
    song: "omura Nolanomura",
  },
];

let linearGrad = [
  "https://www.itl.cat/pngfile/big/99-992191_wallpaper-linear-gradient-green-blue-spring-green-dark.jpg",
  "gradienta-LeG68PrXA6Y-unsplash.jpg",
];

class App {
  timerfilter;
  history;
  constructor() {
    this._getReuqestfromMedia(0);
    iconflip.addEventListener("click", this._CamNot);
    allfilters.addEventListener("mousedown", this._startfilter.bind(this));
    Toreels.addEventListener("click", this._shifttoPage.bind(this));
    // backbutton.addEventListener('click',this._shiftBack.bind(this));
  }
  _shiftBack() {
    document.querySelector("body").style.overflow = "hidden";
    let up = document.querySelector(".Instagram-Page-Header");
    let down = document.querySelector(".nextpart");
    up.classList.add("newtranslate");
    down.classList.add("newtranslate");
    this._getReuqestfromMedia(1);
    // InstPage.classList.add('newtranslate');
    setTimeout(() => {
      // tracks[0].start();
      // InstPage.classList.remove('newtranslate');
      up.classList.remove("newtranslate");
      down.classList.remove("newtranslate");
      InstPage.style.display = "none";
      ReelSection.style.display = "flex";
    }, 1000);
  }
  _shifttoPage() {
    document.querySelector("body").style.overflow = "auto";
    this._setupInstagramPage();
    ReelSection.classList.add("translatex");
    setTimeout(() => {
      tracks[0].stop();
      // ReelSection.classList.add('hidden');
      ReelSection.classList.remove("translatex");
      ReelSection.style.display = "none";
      InstPage.classList.remove("hidden");
      InstPage.style.display = "initial";
      // this._setupInstagramPage();
      let backbutton = document.querySelector(".BackToReel");
      backbutton.addEventListener("click", this._shiftBack.bind(this));
      this._likebutton();
      this._VideoToBeloaded();
    }, 1000);
  }

  _likebutton() {
    let checkarr = [2, 2, 2, 2];
    // let check=2;
    let song = document.querySelector(".Hadjust");
    const heart = document.querySelectorAll(".heart");
    heart.forEach((element) => {
      element.addEventListener("click", function (e) {
        let search = e.target.closest("section");
        let curr = search.dataset.number;
        element.src = `heart(${checkarr[curr]}).png`;
        if (checkarr[curr] === 2) {
          checkarr[curr] = 1;
        } else {
          checkarr[curr] = 2;
        }
      });
    });
  }

  _setupInstagramPage() {
    // InstPage.innerHTML='';
    let InstPageinside = document.querySelector(".nextpart");
    InstPageinside.innerHTML = "";
    instagramFiltersContent.forEach((data, i) => {
      let html = `
  <section data-number="${i}" class="actualContent InstCont${i + 1}">
    <div class="videoContainer">
      <div class="topVideoSection">
        <img class="InstIcon" src="back.png" alt="">
        <div class="reeltext">Reels</div>
      </div>
      <div class="feedbacksystem">
        <div class="likes">
          <img class="feedbackAdjust heart" src="heart(1).png" alt="">
          <span class="numberRep">${data.likes}</span>
        </div>
        <div class="comments">
          <img class="feedbackAdjust" src="chat.png" alt="">
          <span class="numberRep">${data.comments}</span>
        </div>
        <div class="send">
          <img class="feedbackAdjust" src="send (1).png" alt="">
        </div>
        <div class="moreoption">
          <img class="SepAdjust" src="three-dots.png" alt="">
        </div>
      </div>
      <video loop class="Hadjust Video${i + 1}">
      <source  type="video/mp4" src="${data.link}">
      </video>
      <div class="videoDetails">
        <div class="topDetailing">
          <div class="pictitle"></div>
          <div class="titleVideo">${data.channelName}</div>
          <div class="followbutton">Follow</div>
        </div>
        <div class="middleDetailing">${data.middlesection}</div>
        <div class="bottomdetailing"><img class="Musical-Note" src="musical-note.png" alt="">
          <div class="Song-Name">
           <div class="MoveText-1">${data.song}</div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
      InstPageinside.insertAdjacentHTML("beforeend", html);
    });
  }
  _VideoToBeloaded() {
    const obsoptions = {
      root: null,
      threshold: [0.8],
    };
    const obscallback = function (entries) {
      const [mediaObj] = entries;
      const videoToPlay = mediaObj.target.querySelector(".Hadjust");
      // console.log(mediaObj);
      if (mediaObj.isIntersecting) {
        videoToPlay.play();
      } else {
        videoToPlay.pause();
      }
    };
    let video = document.querySelector(".Video1");
    const select = document.querySelectorAll("section");
    const observer = new IntersectionObserver(obscallback, obsoptions);
    select.forEach((data) => {
      observer.observe(data);
    });
  }

  _CamNot() {
    alert("Buddy Back Camera not available");
  }
  _ClearInDiv(parent) {
    parent.innerHTML = "";
  }
  _insertInsideElement(html, parent) {
    this._ClearInDiv(parent);
    parent.insertAdjacentHTML("beforeend", html);
  }

  _CurrentActiveFilter(val) {
    let filters = [
      `<div class="quetion">
    WHERE IS YOUR SOUL MATE?
    <div class="arrow-left"></div>
  </div>
  <div class="answer">
    <div class="arrow-right"></div>
    <img
      src="outline_location_on_white_24dp.png"
      alt=""
    /><span class="ReelAnswer">North Korea</span>
  </div>`,
      `<div class="question-die-reel">🆃🅷🅸🆂 🅵🅸🅻🆃🅴🆁🆂 🆃🅴🅻🅻🆂 🆆🅷🅰🆃 🅰🅶🅴 🆈🅾🆄 🆆🅸🅻🅻 🅳🅸🅴</div>
  <div class="answer-die-reel">6</div>`,
      ` <div class="quetion-reel-3">
  What emoji are you
  <div class="Emoji emoji-Adjust">&#128512;</div>
  <div class="indicatediv"></div>
</div>`,
    ];
    if (val == 1) {
      let trash = 0;
      let count = 0;
      let countries = [
        "Tokyo",
        "London",
        "New York",
        "Paris",
        "Beijing",
        "Shanghai",
        "Los Angeles",
        "Madrid",
        "Barcelona",
        "Chicago",
        "Amsterdam",
        "Bangkok",
        "Sydney",
        "Melboune",
        "Moscow",
        "Mexico City",
        "Mumbai",
        "Berlin",
        "Lisbon",
        "Denmark",
        "Sweden",
        "Ukraine",
      ];
      this._insertInsideElement(filters[val - 1], PFilters);
      FilterCover.classList.remove("hidden");
      ReelAnswers = document.querySelector(".ReelAnswer");
      this.timerfilter = setInterval(() => {
        if (count === 70) {
          let randomnum = Math.ceil(Math.random() * countries.length);
          ReelAnswers.innerHTML = countries[randomnum - 1];
          let answerbackground = document.querySelector(".answer");
          let arrowright = document.querySelector(".arrow-right");
          answerbackground.style.backgroundColor = "#FF5733";
          arrowright.style.borderLeft = "10px solid #FF5733";
          clearInterval(this.timerfilter);
          return;
        }
        trash = trash % 19;
        ReelAnswers.innerHTML = countries[trash];
        trash = trash + 1;
        count++;
      }, 100);
    }
    if (val == 2) {
      let count = 0;
      this._insertInsideElement(filters[val - 1], PFilters);
      let answerdeath = document.querySelector(".answer-die-reel");
      FilterCover.classList.remove("hidden");
      this.timerfilter = setInterval(() => {
        let random = Math.ceil(Math.random() * 100) + 1;
        answerdeath.innerHTML = random;
        count++;
        if (count === 70) {
          clearInterval(this.timerfilter);
          if (random <= 50) {
            answerdeath.style.color = "#C3272B";
          }
          if (random > 50) {
            answerdeath.style.color = "#26C281";
          }
          return;
        }
      }, 100);
    }
    if (val == 3) {
      let count = 0;
      let images = 16;
      let emojilist=['&#128513;','&#128514;','&#128517;','&#128518','&#128519;','&#128520','&#128524;','&#128525','&#128526','	&#128529','&#129324;','&#129314;','&#129316','&#129297','&#128564;','&#128552;','	&#128561;','&#129299;','	&#128549;'];
      this._insertInsideElement(filters[val - 1], PFilters);
      let emojiimg = document.querySelector(".Emoji");
      FilterCover.classList.remove("hidden");
      this.timerfilter = setInterval(() => {
        // emojiimg.src = `/Asset/emojis/emoji-${(count + 1) % images}.png`;
        emojiimg.innerHTML=emojilist[count%19];
        count++;
        if (count === 80) {
          let mathrandom = Math.ceil(Math.random() * 19);
          emojiimg.innerHTML=emojilist[mathrandom];
          // emojiimg.innerHTML='&#128512;';
          clearInterval(this.timerfilter);
        }
      }, 100);
    }
  }
  _startWaitTimer(cani) {
    if (cani == 1) {
      return;
    }
    setTimeout(() => {
      Start.classList.add("hidden");
      ReelPage.classList.remove("hidden");
    }, 3000);
    setTimeout(() => {
      Start.classList.add("transition");
    }, 2000);
  }

  _startfilter(e) {
    function mouseDown(item) {
      item.classList.add("movingAnimation");
    }

    function mouseUp(item) {
      FilterCover.classList.add("hidden");
      this._ClearInDiv(PFilters);
      item.classList.remove("movingAnimation");
      clearInterval(this.timerfilter);
    }

    function mouseleaving(item) {
      FilterCover.classList.add("hidden");
      item.classList.remove("movingAnimation");
      clearInterval(this.timerfilter);
    }

    let item = e.target.closest(".reelbutton");
    if (!item) {
      return;
    }
    this._CurrentActiveFilter(item.dataset.indexnumber);
    mouseDown(item);
    item.addEventListener("mouseup", mouseUp.bind(this, item));
    item.addEventListener("mouseleave", mouseleaving.bind(this, item));
  }

  async _getReuqestfromMedia(cani) {
    const isit = new Promise((resolve, reject) => {
      resolve(navigator.mediaDevices.getUserMedia({ video: true }));
    });

    await this._ContinueData(isit, cani);
  }

  _ContinueData(isit, cani) {
    isit
      .then((data) => {
        this._startWaitTimer(cani);
        Video.srcObject = data;
        const mediastream = Video.srcObject;
        tracks = mediastream.getTracks();
        Video.play();
        let random = Math.trunc(Math.random() * 2);
        images.src = linearGrad[random];
      })
      .catch((error) => {
        console.error("Resolving the error");
        alert("Please Enable the Media Acess");
        console.error(error);
      });
  }
}

const Insta = new App();
