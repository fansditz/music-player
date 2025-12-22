const songs = [
  { src: "music/distance.mp3", name: "distance", artist: "bixby", time: "1:57" },
  { src: "music/song.mp3", name: "沒出息", artist: "王世堅", time: "0:21" },
  { src: "music/intentions.mp3", name: "intentions", artist: "starfall", time: "3:45" }
];

let current = 0;

const player = document.getElementById("player");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const shuffleBtn = document.getElementById("shuffle");
const repeatBtn = document.getElementById("repeat");

const playlist = document.getElementById("playlist"); // ✅ 紫色區塊裡的 ul#playlist
const titleEl = document.getElementById("song-title"); // ✅ 你 HTML 是 song-title

function updateInfo() {
  titleEl.textContent = `${songs[current].name} - ${songs[current].artist}`;
}

function loadSong(index = current) {
  current = index;
  player.src = songs[current].src;
  updateInfo();
  updateActiveSong();
}

function updateActiveSong() {
  document.querySelectorAll("#playlist .playlist-item").forEach((item, i) => {
    item.classList.toggle("active", i === current);
  });
}

// 產生播放清單（左：歌名+歌手，右：秒數）
function renderPlaylist() {
  playlist.innerHTML = ""; // 清空
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.className = "playlist-item";
    li.dataset.index = index;
    li.innerHTML = `
      <span class="song-info">${song.name} - ${song.artist}</span>
      <span class="song-time">${song.time ?? ""}</span>
    `;
    playlist.appendChild(li);
  });
}

// 點擊清單切歌
playlist.addEventListener("click", (e) => {
  const item = e.target.closest(".playlist-item");
  if (!item) return;

  const index = Number(item.dataset.index);
  loadSong(index);
  player.play();
});

// 上/下一首
nextBtn.addEventListener("click", () => {
  loadSong((current + 1) % songs.length);
  player.play();
});

prevBtn.addEventListener("click", () => {
  loadSong((current - 1 + songs.length) % songs.length);
  player.play();
});

// 隨機
shuffleBtn.addEventListener("click", () => {
  loadSong(Math.floor(Math.random() * songs.length));
  player.play();
});

// 重複
repeatBtn.addEventListener("click", () => {
  player.loop = !player.loop;
  repeatBtn.textContent = player.loop ? "取消重複" : "重複播放";
});

// ✅ 初始化
renderPlaylist();
loadSong(0);
