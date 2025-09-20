let key = 'kI83SWOY6Bf7Nf9HJdH1CE1Fl6g1m4EsKeU6srDT';

let imagenDelDia = document.querySelector('#imagenDelDia');
let boton = document.querySelector('#boton');
let titulo = document.querySelector('h1');

boton.onclick = function () {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}`)
        .then(res => res.json())
        .then(fotoDelDia => {
            imagenDelDia.src = fotoDelDia.hdurl;
            titulo.textContent = fotoDelDia.title;
        });
};
