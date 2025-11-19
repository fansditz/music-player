const songs = [
  {
    src: "music/distance.mp3",
    name: "distance",
    artist: "bixby"
  },
  {
    src: "music/song.mp3",
    name: "沒出息",
    artist: "王世堅"
  },
  {
    src: "music/intentions.mp3",
    name: "intentions",
    artist: "starfall"
  }
];

let current = 0;
const player = document.getElementById("player");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const shuffleBtn = document.getElementById("shuffle");
const repeatBtn = document.getElementById("repeat");

function updateInfo() {
  document.getElementById("song-title").textContent = 
  `${songs[current].name} - ${songs[current].artist}`;
}


function loadSong() {
  player.src = songs[current].src;
  updateInfo();
}

// 下一首
nextBtn.addEventListener("click", () => {
  current = (current + 1) % songs.length;
  loadSong();
  player.play();
});

// 上一首
prevBtn.addEventListener("click", () => {
  current = (current - 1 + songs.length) % songs.length;
  loadSong();
  player.play();
});

shuffleBtn.addEventListener("click", () => {
  current = Math.floor(Math.random() * songs.length);
  loadSong();
  player.play();
});

repeatBtn.addEventListener("click", () => {
  player.loop = !player.loop;
  repeatBtn.textContent = player.loop ? "取消重複" : "重複播放";
});


// 首次初始化
loadSong();