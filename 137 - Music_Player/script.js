// play and pause music

//music info

const musicInfo = [
  {
    musicName: "BlackSheep",
    artistName: "Raftaar",
    musicSrc:
      "https://songs14.vlcmusic.com/download.php?track_id=35459&format=48",
    musicPoster:
      "http://a10.gaanacdn.com/images/albums/31/3840631/crop_480x480_3840631.jpg"
  },
  {
    musicName: "Saza E Maut",
    artistName: "Raftaar x KR$NA",
    musicSrc:"https://songs14.vlcmusic.com/download.php?track_id=36735&format=48",
    musicPoster: "https://i.ytimg.com/vi/o907r6NsK9s/maxresdefault.jpg",
    liked: true
  },
  {
    musicName: "Click Pow Get Down",
    artistName: "Raftaar x Fortnite",
    musicSrc:
      "https://songs14.vlcmusic.com/download.php?track_id=34737&format=48",
    musicPoster: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg",
    liked: false
  },
  {
    musicName: "Tu Phir Se Aana",
    artistName: "Raftaar x Salim Merchant x Karma",
    musicSrc:
      "https://songs14.vlcmusic.com/download.php?track_id=34213&format=48",
    musicPoster:
      "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
  },
  {
    musicName: "Naachne Ka Shaunq",
    artistName: "Raftaar x Brobha V",
    musicSrc:
      "https://songs14.vlcmusic.com/download.php?track_id=16270&format=48",
    musicPoster: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
  },
  {
    musicName: "Mantoiyat",
    artistName: "Raftaar x Nawazuddin Siddiqui",
    musicSrc:
      "https://songs14.vlcmusic.com/download.php?track_id=38604&format=48",
    musicPoster:      "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
  },
  {
    musicName: "I'm ready",
    artistName: "Raftaar x KR$NA",
    musicSrc:
      "https://songs14.vlcmusic.com/download.php?track_id=37975&format=48",
    musicPoster:
      "https://a10.gaanacdn.com/images/albums/90/2009690/crop_480x480_2009690.jpg"
  },
  {
    musicName: "Microphone Check",
    artistName: "Raftaar",
    musicSrc:
      "https://songs14.vlcmusic.com/download.php?track_id=33726&format=48",
    musicPoster:
      "https://1.bp.blogspot.com/-3xC8UxACBBs/X7O5YLd5Y0I/AAAAAAAAEdc/Jhf3_uWkhBQH3grgqD878SHr-Aiz4L-uACLcBGAsYHQ/w640/microphone%2Bcheck.webp"
  },
  {
    musicName: "Saath Ya Khilaaf ",
    artistName: "Raftaar x KR$NA",
    musicSrc:
      "https://songs14.vlcmusic.com/download.php?track_id=32599&format=48",
    musicPoster:
      "https://1.bp.blogspot.com/-nIkGlZdgqII/X3PvZQk5VYI/AAAAAAAADrQ/Rx7lCvdcuGY4Q2PnyMwJKYVVz9rxXEE3wCLcBGAsYHQ/w640/saath%2Bya%2Bkhilaaf.jpg"
  },
  {
    musicName: "Dilli Waali Baatcheet",
    artistName: "Raftaar",
    musicSrc:
      "https://pwdown.com/14642/variation/190K/Dilli%20Waali%20Baatcheet%20-%20Raftaar.mp3",
    musicPoster:
      "https://a10.gaanacdn.com/images/song/49/28009549/crop_480x480_1566383860.jpg"
  },
  {
    musicName: "Damn",
    artistName: "Raftaar x kr$na",
    musicSrc:
      "https://songs14.vlcmusic.com/download.php?track_id=28811&format=48",
    musicPoster: "https://i.ytimg.com/vi/yBRKqRc-vyQ/maxresdefault.jpg"
  },
  {
    musicName: "Feeling You",
    artistName: "Raftaar x Harjas",
    musicSrc:
      "https://songs14.vlcmusic.com/download.php?track_id=40238&format=48",
    musicPoster:
      "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
  }
];

// playlist
const musicPlaylist = document.querySelector(".music-playlist");
const musicPlayer = document.querySelector(".music-player");
const playlistOpenBtn = document.querySelector(".playlist-open-btn");
const playlistCloseBtn = document.querySelector(".playlist-close-btn");
const playlist = document.querySelector(".playlist");

const openPlaylist = () => {
  musicPlayer.classList.add("open");
  musicPlaylist.classList.add("open");
};

const closePlaylist = () => {
  musicPlayer.classList.remove("open");
  musicPlaylist.classList.remove("open");
};

playlistOpenBtn.onclick = () => openPlaylist();
playlistCloseBtn.onclick = () => closePlaylist();

// swap up and down
let manager1 = new Hammer.Manager(musicPlayer);

// Create a recognizer
let Swipe1 = new Hammer.Swipe();

manager1.add(Swipe1);

manager1.on("swipe", function (e) {
  let direction = e.offsetDirection;
  if (direction == 16) {
    openPlaylist();
  }
  if (direction == 8) {
    closePlaylist();
  }
});
// swap left and right
const playerCenter = document.querySelector(".player-center");
let manager = new Hammer.Manager(playerCenter);

// Create a recognizer
let Swipe = new Hammer.Swipe();

manager.add(Swipe);

manager.on("swipe", function (e) {
  let direction = e.offsetDirection;
  if (direction == 4) {
    musicIndex = musicIndex - 1;
    currentMusic(musicIndex);
    playMusic();
  } else if (direction == 2) {
    musicIndex = musicIndex + 1;
    currentMusic(musicIndex);
    playMusic();
  }
});

musicInfo.forEach((item, index) => {
  let playlistItem = document.createElement("div");
  playlistItem.classList.add("playlist-item");

  let playlistItemPoster = document.createElement("div");
  playlistItemPoster.classList.add("playlist-item-poster");
  playlistItem.appendChild(playlistItemPoster);

  let playlistItemPosterImg = document.createElement("img");
  playlistItemPosterImg.src = item.musicPoster;
  playlistItemPoster.appendChild(playlistItemPosterImg);

  let playlistItemInfo = document.createElement("div");
  playlistItemInfo.classList.add("playlist-item-info");
  playlistItem.appendChild(playlistItemInfo);

  let playlistItemName = document.createElement("p");
  playlistItemName.classList.add("plalist-item-name");
  playlistItemName.innerText = item.musicName;
  playlistItemInfo.appendChild(playlistItemName);

  let playlistItemArtist = document.createElement("p");
  playlistItemArtist.classList.add("playlist-artist-name");
  playlistItemArtist.innerText = item.artistName;
  playlistItemInfo.appendChild(playlistItemArtist);

  let playlistHeartBtn = document.createElement("div");
  playlistHeartBtn.classList.add("playlist-heart-btn");
  playlistItem.appendChild(playlistHeartBtn);

  let playlistHeartIcon = document.createElement("i");
  playlistHeartIcon.setAttribute("class", "fa fa-heart playlist-heart-icon");
  playlistHeartBtn.appendChild(playlistHeartIcon);

  let playlistMenuBtn = document.createElement("div");
  playlistMenuBtn.classList.add("playlist-heart-btn");
  playlistItem.appendChild(playlistMenuBtn);

  let playlistMenuIcon = document.createElement("i");
  playlistMenuIcon.setAttribute(
    "class",
    "fa fa-ellipsis-v playlist-item-menu-icon"
  );
  playlistMenuBtn.appendChild(playlistMenuIcon);

  playlist.appendChild(playlistItem);
});

const playlistItems = document.querySelectorAll(".playlist-item");
playlistItems.forEach((item, index) => {
  item.onclick = () => {
    currentMusic(index);
    closePlaylist();
    playMusic();
  };
});

const posterContainer = document.querySelector(".poster-container");
musicInfo.forEach((item, index) => {
  let poster = document.createElement("img");
  poster.classList.add("poster");
  poster.src = item.musicPoster;
  poster.alt = item.musicName;
  posterContainer.appendChild(poster);
});
const audio = document.querySelector(".audio");
const bg = document.querySelector(".bg");
let musicName = document.querySelector(".music-name");
let artistName = document.querySelector(".artist-name");
let musicIndex = 0;
const currentMusic = (index) => {
  let i = index % musicInfo.length;
  bg.src = musicInfo[i].musicPoster;
  posterContainer.style.left = -(index * 100) + "%";
  musicName.innerText = musicInfo[i].musicName;
  artistName.innerText = musicInfo[i].artistName;
  audio.src = musicInfo[i].musicSrc;
};
currentMusic(musicIndex);

// music controls
const prevBtn = document.querySelector(".back-btn");
const playBtn = document.querySelector(".play-btn");
const nextBtn = document.querySelector(".forward-btn");
const loopBtn = document.querySelector(".loop-btn");
const shuffleBtn = document.querySelector(".shuffle-btn");
let isPlaying = false;
let isShuffle = false;
let isLoop = false;

playBtn.onclick = () => {
  startMusic();
};
const startMusic = () => {
  isPlaying ? pauseMusic() : playMusic();
};
loopBtn.onclick = () => {
  isLoop = !isLoop;
  if (isLoop == true) {
    loopBtn.classList.add("active");
  } else {
    loopBtn.classList.remove("active");
  }
};
shuffleBtn.onclick = () => {
  isShuffle = !isShuffle;
  if (isShuffle == true) {
    shuffleBtn.classList.add("active");
  } else {
    shuffleBtn.classList.remove("active");
  }
};

nextBtn.onclick = () => {
  nextMusic();
};
const nextMusic = () => {
  musicIndex = musicIndex + 1;
  currentMusic(musicIndex);
  playMusic();
};
prevBtn.onclick = () => {
  prevMusic();
};
const prevMusic = () => {
  musicIndex = musicIndex - 1;
  currentMusic(musicIndex);
  playMusic();
};
const playMusic = () => {
  isPlaying = true;
  audio.play();
  playBtn.classList.replace("fa-play-circle", "fa-pause-circle-o");
};

function pauseMusic() {
  isPlaying = false;
  audio.pause();
  playBtn.classList.replace("fa-pause-circle-o", "fa-play-circle");
}

// timebar

// music time
const current = document.querySelector(".music-current-time");
const duration = document.querySelector(".music-duration-time");
if (duration.innerText == "NaN:0NaN") {
  duration.innerText = "0:00";
}

audio.addEventListener("timeupdate", () => {
  let time = audio.currentTime;
  let seconds = Math.floor(time % 60);
  let minutes = Math.floor(time / 60);
  if (seconds < 10) {
    current.innerText = minutes + ":0" + seconds;
  } else if (minutes >= 0 && seconds >= 0) {
    current.innerText = minutes + ":" + seconds;
  } else {
    current.innerText = minutes + ":0" + seconds;
  }

  //duration time
  time = audio.duration;
  seconds = Math.floor(time % 60);
  minutes = Math.floor(time / 60);
  if (seconds < 10) {
    duration.innerText = minutes + ":0" + seconds;
  } else if (minutes >= 0 && seconds >= 0) {
    duration.innerText = minutes + ":" + seconds;
  } else {
    duration.innerText = "0:00";
  }

  // time bar
  const timebarCicle = document.querySelector(".music-current-length-circle");
  const timebar = document.querySelector(".music-current-length");

  timebar.style.width = (audio.currentTime / audio.duration) * 100 + "%";
  timebarCicle.style.left = (audio.currentTime / audio.duration) * 100 + "%";
  if (
    isLoop == false &&
    isShuffle == false &&
    audio.currentTime == audio.duration
  ) {
    musicIndex = musicIndex + 1;
    currentMusic(musicIndex);
    playMusic();
  } else if (isLoop == true && audio.currentTime == audio.duration) {
    audio.currentTime = 0;
    playMusic();
  } else if (isShuffle == true && audio.currentTime == audio.duration) {
    musicIndex = Math.floor(Math.random() * musicInfo.length);
    currentMusic(musicIndex);
    playMusic();
  }
});

const musicTimebar = document.querySelector(".music-timebar");
musicTimebar.addEventListener("click", (e) => {
  let a = e.offsetX;
  const b = e.srcElement.clientWidth;
  audio.currentTime = (a / b) * audio.duration;
});

window.addEventListener("keydown", (e) => {
  let code = e.keyCode;
  if (code == 32) {
    startMusic();
  }
  if (code == 39) {
    audio.currentTime += 5;
    playMusic();
  }
  if (code == 37) {
    playMusic();
    audio.currentTime -= 5;
  }
});