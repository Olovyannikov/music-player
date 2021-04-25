const
    musicContainer = document.getElementById('music_container'),
    playBtn = document.getElementById('play'),
    nextBtn = document.getElementById('next'),
    prevBtn = document.getElementById('prev'),
    audio = document.getElementById('audio'),
    progress = document.getElementById('progress'),
    progressContainer = document.getElementById('progress_container'),
    title = document.getElementById('title'),
    cover = document.getElementById('cover');

// Song Titles
const songs = [
    'Born Of Osiris - Bow Down',
    'Shokran - Interlude',
    'Red Hot Chili Peppers - The Adventures Of Rain Dance Maggie'
];

//Keep track of song

let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {;
    playBtn.querySelector('.fa-pause').style.display = 'none';
    title.innerText = song;
    audio.src = `player/${song}.mp3`;
    cover.src = `player/${song}.jpg`;
}

//Play Song
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('.fa-play').style.display = 'none';
    playBtn.querySelector('.fa-pause').style.display = 'block';

    audio.play();
}

//Pause song
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('.fa-play').style.display = 'block';
    playBtn.querySelector('.fa-pause').style.display = 'none';

    audio.pause();
}

//Previous song
function prevSong() {
    songIndex--;

    songIndex < 0 ? songIndex = songs.length - 1 : ''
    loadSong(songs[songIndex]);

    playSong();
}

//Next song
function nextSong() {
    songIndex++;

    songIndex > songs.length - 1 ? songIndex = 0 : ''
    loadSong(songs[songIndex]);

    playSong();
}

// Update progress bar
function updateProgress(e) {
    const {duration, currentTime} = e.target;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

//Set progressbar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    isPlaying ? pauseSong() : playSong()
});

//Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

//Time song update
audio.addEventListener('timeupdate', updateProgress);

//Click on progressbar
progressContainer.addEventListener('click', setProgress);

//Song ends
audio.addEventListener('ended', nextSong);