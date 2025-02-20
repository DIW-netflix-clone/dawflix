let runningVideo = true;

const trak = document.getElementById('trak');
const timeBar = document.getElementById('timeBar');
const btnPlay = document.getElementById('btnPlay');
const btnReturnSeconds = document.getElementById('btnReturnSeconds');
const btnAddSeconds = document.getElementById('btnAddSeconds');

trak.addEventListener('timeupdate', fAdjustTimeBar);
timeBar.addEventListener('change', fMoveTimeBar);
btnPlay.addEventListener('click', fChange_btnPlay);
btnReturnSeconds.addEventListener('click', fReturnSeconds);
btnAddSeconds.addEventListener('click', fAddSeconds);

function fAdjustTimeBar() {
    timeBar.value = trak.currentTime;
    timeBar.max = trak.duration;
}

function fMoveTimeBar() {
    trak.currentTime = timeBar.value;
}

function fChange_btnPlay() {
    if (runningVideo) {
        runningVideo = false;
        btnPlay.classList.replace('bi-pause-fill', 'bi-play-fill');
        trak.pause();
    } else {
        runningVideo = true;
        btnPlay.classList.replace('bi-play-fill', 'bi-pause-fill');
        trak.play();
    }
}

function fReturnSeconds() {
    trak.currentTime -= 10;
}

function fAddSeconds() {
    trak.currentTime += 10;
}