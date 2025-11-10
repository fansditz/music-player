const songs = ["music/distance.mp3", "music/song.mp3"];
let current = 0;

const player = document.getElementById("player");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

playBtn.addEventListener("click", () => {
  if (player.paused) {
    player.play().catch(e => console.log("播放被阻擋", e));
  } else {
    player.pause();
  }
});


nextBtn.addEventListener("click", () => {
  current = (current + 1) % songs.length;
  player.src = songs[current];
  player.play().catch(e => console.log("播放被阻擋", e));
});


prevBtn.addEventListener("click", () => {
  current = (current - 1) % songs.length;
  player.src = songs[current];
  player.play().catch(e => console.log("播放被阻擋", e));
});
