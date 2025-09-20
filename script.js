let key = 'kI83SWOY6Bf7Nf9HJdH1CE1Fl6g1m4EsKeU6srDT';

let imagenDelDia = document.querySelector('#imagenDelDia');
let boton = document.querySelector('#boton');
let titulo = document.querySelector('h1');

boton.onclick = function () {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}`)
        .then(res => res.json())
        .then(fotoDelDia => {
            imagenDelDia.src = fotoDelDia.hdurl
            titulo.textContent = fotoDelDia.title
        })
}
let imagenFecha = document.querySelector('#imagenFecha')
let botonFecha = document.querySelector('#botonFecha')
let fechaUsuari = document.querySelector('#fecha')

botonFecha.onclick = function () {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}&date=${fechaUsuari.value}`)
        .then(res => res.json())
        .then(fotoFecha => {
            imagenFecha.src = fotoFecha.hdurl
        })
}
let contenedorImagen = document.querySelector('.contenedor-imagen')
let botonCantidad = document.querySelector('#botonCantidad')
let cantidadUsuario = document.querySelector('#cantidad')

botonCantidad.onclick = function () {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}&count=${cantidadUsuario.value}`)
        .then(res => res.json())
        .then(fotos => {
            contenedorImagen.innerHTML = ''

            for (let i = 0; i < fotos.length; i++) {
                contenedorImagen.innerHTML += `
                    <img src="${fotos[i].url}" alt="${fotos[i].title}">
                `
            }
        })
}
let fechaUsuario = document.querySelector('#fecha')


fechaUsuario.min = '1995-06-16';


let hoy = new Date();
let dia = String(hoy.getDate()).padStart(2, '0')
let mes = String(hoy.getMonth() + 1).padStart(2, '0')

fechaUsuario.max = `${anio}-${mes}-${dia}`


let botonFecha = document.querySelector('#botonFecha')
let imagenFecha = document.querySelector('#imagenFecha')

botonFecha.onclick = function () {
    fetch('https://api.nasa.gov/planetary/apod?api_key=' + key + '&date=' + fechaUsuario.value)
        .then(function(res) { return res.json(); })
        .then(function(fotoFecha) {
            imagenFecha.src = fotoFecha.hdurl;
        })
}

