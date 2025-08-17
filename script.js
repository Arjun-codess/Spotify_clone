
const masterPlay = document.getElementById("masterPlay");
const songItems = document.querySelectorAll(".songitem");
const progressBar = document.getElementById("myprogressbar");
const gif = document.getElementById("gif");
const songInfo = document.querySelector(".songinfo");
const songListPlayButtons = document.querySelectorAll(".songitemplay");


const songs = [
    { name: "Let me Love You", artist: "Justin Bieber", duration: "03:26", url: "1.mp3", image: "https://upload.wikimedia.org/wikipedia/en/a/a5/DJSnakeLetMeLoveYou.jpg" },
    { name: "JHOL", artist: "Maanu x Annural", duration: "04:39", url: "2.mp3", image: "https://paagalworld.com.se/upload_file/1/400x400/thumb_66d9dfa987180.webp" },
    { name: "Hass Hass", artist: "Diljit Dosanjh", duration: "03:10", url: "3.mp3", image: "https://paagalworld.com.se/upload_file/1/400x400/thumb_653b51722d7a0.webp" },
    { name: "Maniac", artist: "YO YO Honey Singh", duration: "02:58", url: "4.mp3", image: "https://paagalworld.com.se/upload_file/3/400x400/thumb_67c57fbf0b38e.webp" },
    { name: "BLENDER", artist: "Masoom Sharma", duration: "03:06", url: "5.mp3", image: "https://paagalworld.com.se/upload_file/2/400x400/thumb_6732112ae6c13.webp" },
    { name: "Hanuman chalisa", artist: "Gulshan Kumar", duration: "09:34", url: "6.mp3", image: "https://www.pagalworld.my/thumb/Hanuman+Chalisa+DJ+Remix/250x250" }
];

let audio = new Audio();
let currentSongIndex = 0;
let isPlaying = false;

function loadSong(songIndex) {
    audio.src = songs[songIndex].url;
    audio.load();
    songInfo.innerHTML = `${songs[songIndex].name} - ${songs[songIndex].artist}`;
    gif.src = songs[songIndex].image;
}


masterPlay.addEventListener("click", () => {
    if (isPlaying) {
        audio.pause();
        masterPlay.classList.replace("fa-circle-pause", "fa-circle-play");
        gif.style.opacity = 0;
    } else {
        audio.play();
        masterPlay.classList.replace("fa-circle-play", "fa-circle-pause");
        gif.style.opacity = 1;
    }
    isPlaying = !isPlaying;
});

audio.addEventListener("timeupdate", () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
});


progressBar.addEventListener("input", () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

songItems.forEach((item, index) => {
    item.querySelector(".songitemplay").addEventListener("click", () => {
       
        songListPlayButtons.forEach((button) => {
            button.classList.replace("fa-circle-pause", "fa-circle-play");
        });

        const clickedButton = item.querySelector(".songitemplay");
        clickedButton.classList.replace("fa-circle-play", "fa-circle-pause");

        currentSongIndex = index;
        loadSong(currentSongIndex);
        audio.play();
        masterPlay.classList.replace("fa-circle-play", "fa-circle-pause");
        gif.style.opacity = 1;
        isPlaying = true;
    });
});

document.querySelector(".fa-backward-step").addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    masterPlay.classList.replace("fa-circle-play", "fa-circle-pause");
    gif.style.opacity = 1;
});

document.querySelector(".fa-forward-step").addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    masterPlay.classList.replace("fa-circle-play", "fa-circle-pause");
    gif.style.opacity = 1;
});


loadSong(currentSongIndex);
