const songs = ["distance.mp3", "沒出息.mp3"];
let current = 0;

const player = document.getElementById("player");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

playBtn.addEventListener("click", () => {
  if (player.paused) player.play();
  else player.pause();
});

nextBtn.addEventListener("click", () => {
  current = (current + 1) % songs.length;
  player.src = songs[current];
  player.play();
});

prevBtn.addEventListener("click", () => {
  current = (current - 1 + songs.length) % songs.length;
  player.src = songs[current];
  player.play();
});
