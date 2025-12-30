// 取得 HTML 元素
const player = document.getElementById('player');
const songTitle = document.getElementById('title');
const artistName = document.getElementById('artist');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById('play');
const shuffleBtn = document.getElementById('shuffle');

// 歌曲清單 (請確認你的音樂檔案真的在 music 資料夾內)
// 根據你的截圖，檔名應該是這些：
const songs = [
    { title: "沒出息", src: "music/song.mp3", artist:"王世堅" },
    { title: "Distance", src: "music/distance.mp3", artist:"bixby" },
    { title: "Intentions", src: "music/intentions.mp3", artist:"starfall"},
    { title: "太陽與地球", src: "music/sun_and_earth.m4a", artist:"盧廣仲" },
    { title: "左轉燈", src: "music/turn_left_light.mp3", artist:"超派" }
];

let currentindex = 0;

// 初始化：載入第一首歌
function loadSong(index) {
    songTitle.innerText = songs[index].title;
    player.src = songs[index].src;
    artistName.innerText = songs[index].artist;
}

// 播放歌曲
function playSong() {
    player.play();
}

// 下一首
function nextSong() {
    currentindex++;
    if (currentindex > songs.length - 1) {
        currentindex = 0; // 回到第一首
    }
    loadSong(currentindex);
    playSong();
}

// 上一首
function prevSong() {
    currentindex--;
    if (currentindex < 0) {
        currentindex = songs.length - 1; // 跳到最後一首
    }
    loadSong(currentindex);
    playSong();
}

// 隨機播放
function shuffleSong() {
    // 產生一個隨機索引，但不要跟現在的一樣
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * songs.length);
    } while (newIndex === currentindex && songs.length > 1);
    
    currentindex = newIndex;
    loadSong(currentindex);
    playSong();
}

// 事件監聽 (綁定按鈕功能)
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
playBtn.addEventListener('click', () => {
    if (player.paused) {
        player.play();
    } else {
        player.pause();
    }
});
shuffleBtn.addEventListener('click', shuffleSong);

// 當歌曲播完時，自動播下一首
player.addEventListener('ended', nextSong);

// 一開始先載入第一首(但不自動播放)
loadSong(currentindex);