document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("favoritos-contenedor");
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  if (favoritos.length === 0) {
    contenedor.innerHTML = "<p style='text-align:center;'>No hay productos favoritos aún.</p>";
    return;
  }

  favoritos.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("producto");

    div.innerHTML = `
      <img src="${item.imagen}" alt="${item.nombre}">
      <div class="info">
        <h3>${item.nombre}</h3>
        <p>${item.categoria}</p>
        <div class="precio-rating">
          <span>${item.precio}</span><span>${item.rating}</span>
        </div>
      </div>
      <div class="icono-corazon">❤️</div>
    `;

    const corazon = div.querySelector(".icono-corazon");
    corazon.addEventListener("click", () => {
      // Elimina este producto de favoritos
      favoritos = favoritos.filter(p => p.nombre !== item.nombre);
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
      div.remove();

      // Si no hay más favoritos, muestra mensaje
      if (favoritos.length === 0) {
        contenedor.innerHTML = "<p style='text-align:center;'>No hay productos favoritos aún.</p>";
      }
    });

    contenedor.appendChild(div);
  });
});



