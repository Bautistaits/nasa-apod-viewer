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
let fechaUsuario = document.querySelector('#fecha')

botonFecha.onclick = function () {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}&date=${fechaUsuario.value}`)
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
