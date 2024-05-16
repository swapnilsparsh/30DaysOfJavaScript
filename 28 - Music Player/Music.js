let play = document.getElementById("Play");
let previous = document.getElementById("Previous");
let next = document.getElementById("Next");
let audio = document.querySelector("audio");
let img = document.querySelector("img");
let title = document.getElementById("title");
let artist = document.getElementById("artist");
let songs = [
    {
        name: "Alone",
        title: "Alone",
        artist: "Alan Walker",
    },
    {
        name: "Sugar",
        title: "sugar & Brownies",
        artist: "Dharia",
    },
    {
        name: "Peaches",
        title: "Peaches",
        artist: "Justin Bieber",
    },
];
let isplaying = false;

let playmusic = () => {
    isplaying = true;
    audio.play();
    play.classList.replace('fa-play', 'fa-pause');
    img.classList.add("anime");
};

let pausemusic = () => {
    isplaying = false;
    audio.pause();
    play.classList.replace('fa-pause', 'fa-play');
};

play.addEventListener("click", () => {
    if (isplaying == false) {
        playmusic();
    } else {
        pausemusic();
    };
});

const loadsong = (songs) => {
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    audio.src = "Music/" + songs.name + ".mp3";
    img.src = "images/" + songs.name + ".jpg";
}

let songindex = 1;

const nextsong = () => {
    songindex = (songindex + 1) % songs.length;
    loadsong(songs[songindex]);
    playmusic();
}

const prevsong = () => {
    songindex = (songindex - 1 + songs.length) % songs.length;
    loadsong(songs[songindex]);
    playmusic();
}

next.addEventListener('click', nextsong);
previous.addEventListener('click', prevsong);

// Volume control
let volume_slider = document.querySelector('.volume_slider');

function setVolume() {
    audio.volume = volume_slider.value / 100;
}

// Progress control
let progress_slider = document.querySelector('.progress_slider');

function setProgress() {
    audio.currentTime = audio.duration * (progress_slider.value / 100);
}

// Update progress slider as the audio plays
audio.addEventListener('timeupdate', () => {
    let progress = (audio.currentTime / audio.duration) * 100;
    progress_slider.value = progress;

    // Update progress slider's background to fill up as the song plays
    let fillWidth = (audio.currentTime / audio.duration) * 100;
    progress_slider.style.background = `linear-gradient(to right, #4CAF50 0%, #4CAF50 ${fillWidth}%, #ddd ${fillWidth}%, #ddd 100%)`;
});

// Update the audio time as the progress slider changes
progress_slider.addEventListener('input', () => {
    setProgress();
});
