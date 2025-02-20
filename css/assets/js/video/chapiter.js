const chapiterList = [];
const chapiterID = 0;
const apiKeyTMBD = 'prueba';

const trak = document.getElementById('trak');
const nextChapiter = document.getElementById('nextChapiter');

trak.addEventListener('ended', fAutoNextChapiter);
nextChapiter.addEventListener('click', fAutoNextChapiter);

/**
 * Ejecuta la funcion `fFillChapiterList` al cargar la página
 */ 
window.addEventListener('DOMContentLoaded', fFillChapiterList);

function fFillChapiterList() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + apiKeyTMBD
        }
    };
    
    fetch('https://api.themoviedb.org/3/account/' + account_id + '/lists?page=1', options)
    .then(res => res.json())
    .then(data => {
        if (data.results) {
            data.results.forEach(chapiterInfo => {
                chapiterList.push(chapiterInfo);
            });
        } else {
            console.error("No hay capitulos o la respuesta no tiene el formato esperado:", data);
        }
    })
    .catch(error => {
        console.error("Error en la petición a la API:", error);
    });
}


function fAutoNextChapiter() {
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