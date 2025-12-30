// 取得 HTML 元素
const player = document.getElementById('player');
const songTitle = document.getElementById('title');
const artistName = document.getElementById('artist');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById('play');
const shuffleBtn = document.getElementById('shuffle');
const repeatBtn = document.getElementById("repeat");
const cover = document.getElementById("cover");

// 歌曲清單
const songs = [
  { title: "沒出息", src: "music/song.mp3", artist:"王世堅", cover: "image/song.jpg" },
  { title: "Distance", src: "music/distance.mp3", artist:"bixby", cover: "image/distance.jpg" },
  { title: "Intentions", src: "music/intentions.mp3", artist:"starfall", cover: "image/intentions.jpg" },
  { title: "太陽與地球", src: "music/sun_and_earth.m4a", artist:"盧廣仲", cover: "image/song.jpg" },
  { title: "左轉燈", src: "music/turn_left_light.mp3", artist:"超派", cover: "image/turn_left_light.jpg" }
];

let currentindex = 0;
let isShuffle = false;

// 載入歌曲
function loadSong(index) {
  songTitle.innerText = songs[index].title;
  artistName.innerText = songs[index].artist;
  player.src = songs[index].src;

  // 你 cover 在 HTML 如果是 <div id="cover"> 就不能用 src
  // 你如果是 <img id="cover"> 才能用 cover.src
  // 先用比較通用的寫法：
  if (cover && cover.tagName === "IMG") {
    cover.src = songs[index].cover;
  } else if (cover) {
    cover.style.backgroundImage = `url('${songs[index].cover}')`;
    cover.style.backgroundSize = "cover";
    cover.style.backgroundPosition = "center";
  }
}

function playSong() {
  player.play();
}

// 隨機選下一首（不跟現在一樣）
function shuffleSong() {
  if (songs.length <= 1) return;

  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * songs.length);
  } while (newIndex === currentindex);

  currentindex = newIndex;
  loadSong(currentindex);
  playSong();
}

// 下一首
function nextSong() {
  currentindex++;
  if (currentindex > songs.length - 1) currentindex = 0;
  loadSong(currentindex);
  playSong();
}

// 上一首
function prevSong() {
  currentindex--;
  if (currentindex < 0) currentindex = songs.length - 1;
  loadSong(currentindex);
  playSong();
}

// 按鈕：播放/暫停（不要在這裡動 loop）
playBtn.addEventListener('click', () => {
  if (player.paused) player.play();
  else player.pause();

  // 要不要播放鍵也變色（可選）
  playBtn.classList.toggle("active", !player.paused);
});

// 按鈕：隨機（只切狀態+變色，不立刻切歌）
shuffleBtn.addEventListener("click", () => {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle("active", isShuffle);
});

// 按鈕：重複（切 loop + 變色）
repeatBtn.addEventListener("click", () => {
  player.loop = !player.loop;
  repeatBtn.classList.toggle("active", player.loop);
});

// prev/next
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// ✅ 只保留一個 ended：
// - repeat 開：audio 自己 loop（ended 不會跑或就算跑也直接 return）
// - shuffle 開：播隨機下一首
// - 否則：播下一首
player.addEventListener("ended", () => {
  if (player.loop) return;
  if (isShuffle) shuffleSong();
  else nextSong();
});

// 初始載入
loadSong(currentindex);
