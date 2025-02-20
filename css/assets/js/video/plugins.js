const lockHover = false;

const btnLock = document.getElementById('btnLock');
const btnNextChapiter = document.getElementById('btnNextChapiter');


btnLock.addEventListener('click', fLockHover);
btnNextChapiter.addEventListener('click', fNextChapiter);

function fLockHover() {
    if (!lockHover) {
      frontVideo.style.pointerEvents = 'none';
    } else {
        frontVideo.style.pointerEvents = 'auto';
    }

    console.log('hola' + frontVideo.style.pointerEvents);
}

function fNextChapiter() {
    if (chapiterID == chapiterList.length - 1) {
        chapiterID = 0;
        
        trak.src = "./assets/video/" + chapiterList[chapiterID].data.url;
        
        fbtn_stop();
    } else {
        chapiterID ++;
        
        trak.src = "./assets/audio/" + chapiterList[chapiterID].data.url;
        
        fbtn_play();        
    }
}