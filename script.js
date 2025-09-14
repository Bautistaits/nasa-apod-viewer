const API_KEY = "kI83SWOY6Bf7Nf9HJdH1CE1Fl6g1m4EsKeU6srDT"; 
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

    let media = "";
    if (item.media_type === "image") {
      media = `<img src="${item.url}" alt="${item.title || "Imagen sin título"}">`;
    } else if (item.media_type === "video") {
      media = `<iframe src="${item.url}" frameborder="0" allowfullscreen></iframe>`;
    } else {
      media = `<p>Contenido no disponible.</p>`;
    }

    card.innerHTML = `
      <h3>${item.title || "Sin título disponible"}</h3>
      ${media}
      <p><strong>Fecha:</strong> ${item.date || "Desconocida"}</p>
      <p>${item.explanation || "No hay explicación disponible para esta fecha."}</p>
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
    if (!res.ok) throw new Error("Error al consultar la API");
    const data = await res.json();
    mostrarFotos(data);
  } catch (error) {
    mostrarError("No se pudo obtener la foto del día.");
    console.error(error);
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
    if (!res.ok) throw new Error("Error al consultar la API");
    const data = await res.json();
    mostrarFotos(data);
  } catch (error) {
    mostrarError("No se pudo obtener la foto de esa fecha.");
    console.error(error);
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
    if (!res.ok) throw new Error("Error al consultar la API");
    const data = await res.json();
    mostrarFotos(data);
  } catch (error) {
    mostrarError("No se pudieron obtener fotos aleatorias.");
    console.error(error);
  }
});
