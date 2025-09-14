const API_KEY = "DEMO_KEY";
const URL = "https://api.nasa.gov/planetary/apod";

const resultados = document.getElementById("resultados");
const btnHoy = document.getElementById("btnHoy");
const btnFecha = document.getElementById("btnFecha");
const btnRandom = document.getElementById("btnRandom");


function mostrarFotos(data) {
  resultados.innerHTML = ""; 
  if (!Array.isArray(data)) data = [data]; 

  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${item.title}</h3>
      <img src="${item.url}" alt="${item.title}">
      <p>${item.date}</p>
      <p>${item.explanation}</p>
    `;
    resultados.appendChild(card);
  });
}

function mostrarError(msg) {
  resultados.innerHTML = `<p style="color:red;">⚠️ ${msg}</p>`;
}


btnHoy.addEventListener("click", async () => {
  try {
    const res = await fetch(`${URL}?api_key=${API_KEY}`);
    const data = await res.json();
    mostrarFotos(data);
  } catch (error) {
    mostrarError("No se pudo obtener la foto del día.");
  }
});

btnFecha.addEventListener("click", async () => {
  const fecha = document.getElementById("fecha").value;
  if (!fecha) {
    mostrarError("Por favor selecciona una fecha.");
    return;
  }

  const hoy = new Date().toISOString().split("T")[0];
  if (fecha > hoy) {
    mostrarError("No puedes elegir una fecha futura.");
    return;
  }

  try {
    const res = await fetch(`${URL}?api_key=${API_KEY}&date=${fecha}`);
    const data = await res.json();
    mostrarFotos(data);
  } catch (error) {
    mostrarError("No se pudo obtener la foto de esa fecha.");
  }
});

btnRandom.addEventListener("click", async () => {
  const cantidad = document.getElementById("cantidad").value;
  if (cantidad < 1 || cantidad > 10) {
    mostrarError("La cantidad debe estar entre 1 y 10.");
    return;
  }

  try {
    const res = await fetch(`${URL}?api_key=${API_KEY}&count=${cantidad}`);
    const data = await res.json();
    mostrarFotos(data);
  } catch (error) {
    mostrarError("No se pudieron obtener fotos aleatorias.");
  }
});
