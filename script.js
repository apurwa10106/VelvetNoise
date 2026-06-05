const songs = [
    { songName: "Never Ending Story", artist: "Limahl", time: "1:38", album: "Echora", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
{ songName: "Diet Mountain Dew (Demo)", artist: "Lana Del Rey", time: "3:43", album: "Echora", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
{ songName: "Love Story", artist: "Taylor Swift", time: "4:00", album: "Echora", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
{ songName: "Him & I", artist: "G-Eazy & Halsey", time: "4:26", album: "Echora", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
{ songName: "I Wanna Be Yours", artist: "Arctic Monkeys", time: "3:04", album: "Echora", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
{ songName: "Senorita", artist: "Shawn Mendes & Camila Cabello", time: "3:11", album: "Echora", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
{ songName: "Closer", artist: "The Chainsmokers ft. Halsey", time: "4:21", album: "Echora", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
{ songName: "Levitating", artist: "Dua Lipa", time: "3:30", album: "Echora", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
{ songName: "Rasputin", artist: "Boney M.", time: "3:40", album: "Echora", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
{ songName: "Attention", artist: "Charlie Puth", time: "3:32", album: "Echora", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" },
{ songName: "Love Me Like You Do", artist: "Ellie Goulding", time: "4:13", album: "Echora", filePath: "songs/11.mp3", coverPath: "covers/11.jpg" },
{ songName: "Espresso", artist: "Sabrina Carpenter", time: "2:50", album: "Echora", filePath: "songs/12.mp3", coverPath: "covers/12.jpg" },
{ songName: "7 Rings", artist: "Ariana Grande", time: "3:04", album: "Echora", filePath: "songs/13.mp3", coverPath: "covers/13.jpg" },
{ songName: "Baby", artist: "Justin Bieber ft. Ludacris", time: "3:32", album: "Echora", filePath: "songs/14.mp3", coverPath: "covers/14.jpg" },
{ songName: "Heat Waves", artist: "Glass Animals", time: "3:55", album: "Echora", filePath: "songs/15.mp3", coverPath: "covers/15.jpg" }
]


let songIndex = 0;
let audioElement = new Audio(songs[0].filePath);

const recentBody = document.getElementById("recent-body");
const playBtn = document.getElementById("btn-play");
const trackTitle = document.getElementById("track-title");
const trackArtist = document.getElementById("track-artist");
const trackAlbum = document.getElementById("track-album");
const coverArt = document.getElementById("cover-art");
const progressFill = document.getElementById("progress-fill");
const seekBar = document.getElementById("seek-bar");
const volumeBar = document.getElementById("volume-bar");
const volumeFill = document.getElementById("volume-fill");



function loadSong(index) {
    audioElement.src = songs[index].filePath;

    trackTitle.textContent = songs[index].songName;
    trackArtist.textContent = songs[index].artist;
    trackAlbum.textContent = songs[index].album;

    coverArt.src = songs[index].coverPath;
}

function playSong() {
    audioElement.play();

    document.querySelector(".icon-play").style.display = "none";
    document.querySelector(".icon-pause").style.display = "block";
}

function pauseSong() {
    audioElement.pause();

    document.querySelector(".icon-play").style.display = "block";
    document.querySelector(".icon-pause").style.display = "none";
}

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";

    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);

    if (secs < 10) secs = "0" + secs;

    return `${mins}:${secs}`;
}

playBtn.addEventListener("click", () => {
    if (audioElement.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

document.getElementById("btn-next").addEventListener("click", () => {
    songIndex++;

    if (songIndex >= songs.length) {
        songIndex = 0;
    }

    loadSong(songIndex);
    playSong();
});

document.getElementById("btn-prev").addEventListener("click", () => {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songIndex);
    playSong();
});

audioElement.addEventListener("timeupdate", () => {

    if (audioElement.duration) {

        let progress =
            (audioElement.currentTime / audioElement.duration) * 100;

        progressFill.style.width = progress + "%";
        seekBar.value = progress;

        document.getElementById("time-current").innerText =
            formatTime(audioElement.currentTime);

        document.getElementById("time-total").innerText =
            formatTime(audioElement.duration);
    }

});

seekBar.addEventListener("input", () => {
    audioElement.currentTime =
        (seekBar.value / 100) * audioElement.duration;
});

songs.forEach((song, index) => {
    let row = document.createElement("tr");

    row.innerHTML = `
        <td>${index + 1}</td>
        <td>${song.songName}</td>
        <td>${song.artist}</td>
        <td>${song.album}</td>
        <td>
            <button class="play-song" data-index="${index}">
                <i class="fa-solid fa-play"></i>
            </button>
        </td>
        <td>--:--</td>
    `;

    recentBody.appendChild(row);
});

document.addEventListener("click", (e) => {
    const btn = e.target.closest(".play-song");

    if (!btn) return;

    songIndex = parseInt(btn.dataset.index);

    loadSong(songIndex);
    playSong();

});

volumeBar.addEventListener("input", () => {

    audioElement.volume = volumeBar.value;

    volumeFill.style.width =
        (volumeBar.value * 100) + "%";
});

loadSong(0);
