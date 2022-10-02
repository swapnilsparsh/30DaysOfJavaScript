<template>
  <div id="app">
    <header>
      <h1>My Music</h1>
    </header>
  </div>
     <main>
       <section class="player">
           <h2 class="song-title">{{ current.title }} - <span>{{ current.artist }}</span> </h2>
           <div class="controls">
             <button class="prev" @click="prev">Prev</button>
             <button class="play" v-if="!isPlaying" @click="play">Play</button>
             <button class="pause" v-else @click="pause">Pause</button>
             <button class="next" @click="next">Next</button>
           </div>
       </section>
       <section class="playlist">
         <h3>Playlist</h3>
         <button v-for="song in songs" :key="song.src" @click="play(song)" :class="(song.src == current.src) ? 'song playing' : 'song'">
           {{ song.title }} - {{ song.artist }}
         </button>
       </section>
     </main>
</template>

<script>


export default {
  name: 'App',
  data () {
    return {
      current: {},
      index: 0,
      isPlaying: false,
      songs: [
      {
        title: 'Grateful',
        artist: 'Neffex',
        src: require('./assets/neffex-grateful.mp3')
      },
      {
        title: 'Invincible',
        artist: 'Deaf Kev',
        src: require('./assets/deaf-kev-invincible.mp3')
      },
      {
        title: 'Gaaliyan',
        artist: 'Ankit Tiwari',
        src: require('./assets/01 - Galliyan - DownloadMing.SE.mp3')
      },
      {
        title: 'Gerua',
        artist: 'Arijit Singh',
        src: require('./assets/01 - Gerua - DownloadMing.SE.mp3')
      },
      {
        title: 'Ae Watan',
        artist: 'Arijit Singh',
        src: require('./assets/01 - Raazi - Ae Watan [DJMaza.Fun].mp3')
      },
      {
        title: 'Hamari Adhuri Kahani',
        artist: 'Arijit Singh',
        src: require('./assets/01 Hamari Adhuri Kahani (Title Song) Arijit Singh 190Kbps.mp3')
      },
      {
        title: 'Ik Vaari Aa',
        artist: 'Arijit Singh',
        src: require('./assets/01 Ik Vaari Aa - Raabta (Arijit Singh) 190Kbps.mp3')
      },
      {
        title: 'Sukoon Mila',
        artist: 'Arijit Singh',
        src: require('./assets/01 Sukoon Mila - Mary Kom (Arijit Singh) 160Kbps.mp3')
      },
      {
        title: 'Suno Na Sangemarmar',
        artist: 'Arijit Singh',
        src: require('./assets/01 Suno Na Sangemarmar - Youngistaan (Arijit Singh).mp3')
      },
      {
        title: 'Bolna',
        artist: 'Arijit Singh',
        src: require('./assets/02 Bolna - Arijit Singh 190Kbps.mp3')
      }
    ],
    player: new Audio()
   }
  },
  methods: {
    play (song) {
      if (typeof song.src != "undefined") {
        this.current = song;

        this.player.src = this.current.src;
      }
      this.player.play();
      this.player.addEventListener('ended', function () {
        this.index++;
        if (this.index > this.songs.length-1) {
          this.index = 0;
        }

        this.current = this.songs[this.index];
        this.play(this.current);
      }.bind(this));
      this.isPlaying = true;
    },
    pause () {
      this.player.pause();
      this.isPlaying = false;
    },
    next () {
      this.index++;
      if (this.index > this.songs.length-1) {
        this.index = 0;
      }

      this.current = this.songs[this.index];
      this.play(this.current);
    },
    prev () {
      this.index--;
      if (this.index < 0) {
        this.index = this.songs.length-1;
      }

      this.current = this.songs[this.index];
      this.play(this.current);
    }
  },
  created () {
    this.current = this.songs[this.index];
    this.player.src = this.current.src;
  }
}
</script>

<style>
 #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
 }
 *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
 }
 body {
    font-family: sans-serif;
 }
 header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    background-color: #b23366;
    color: #FFF;
 }
 main {
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
    padding: 25px;
 }

 .song-title {
    color: #53565A;
    font-size: 32px;
    font-weight: 900;
    text-transform: uppercase;
    text-align: center;
 }
 .song-title span {
   font-weight: 400;
   font-style: italic;
 }

 .controls {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 15px;
 }

 button {
   appearance: none;
   background: none;
   border: none;
   outline: none;
   cursor: pointer;
 }
 .play, .pause {
   font-size: 20px;
   font-weight: 700;
   padding: 15px 25px;
   margin: 0px 15px;
   border-radius: 8px;
   color: #FFF;
   background-color: #CC2E5D;
 }

 button:hover {
   opacity: 0.7;
 }
 .next,.prev {
   font-size: 16px;
   font-weight: 700;
   padding: 10px 20px;
   margin: 0px 15px;
   border-radius: 6px;
   color: #FFF;
   background-color: #FF5858;
 }
 .playlist {
  padding: 0px 30px;
}
.playlist h3{
  color: #212121;
  font-size: 28px;
  font-weight: 400;
  margin-bottom: 30px;
  text-align: center;
}
.playlist .song{
  display: block;
  width: 100%;
  padding: 15px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
}
.playlist .song:hover {
  color: #FF5858;
}
.playlist .song.playing {
  color: #FFF;
  background-image: linear-gradient(to right, #CC2E5D, #FF5858);

}
</style>
