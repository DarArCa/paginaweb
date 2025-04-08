document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("favoritos-contenedor");
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  const renderFavoritos = () => {
    contenedor.innerHTML = "";

    if (favoritos.length === 0) {
      contenedor.innerHTML = "<p style='text-align:center;'>No hay productos favoritos aún.</p>";
      return;
    }

    favoritos.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add("producto");

      div.innerHTML = `
        <img src="${item.imagen}" alt="${item.nombre}" class="imagen-favorito">
        <div class="info">
          <h3>${item.nombre}</h3>
          <p>${item.categoria}</p>
          <div class="precio-rating">
            <span>${item.precio}</span><span>${item.rating}</span>
          </div>
        </div>
        <div class="icono-corazon">❤️</div>
      `;

      // 🟢 Click en imagen -> detalle
      div.querySelector(".imagen-favorito").addEventListener("click", () => {
        localStorage.setItem("detalleProducto", JSON.stringify(item));
        window.location.href = "detalle.html"; // cambia a "../detalle.html" si es necesario
      });

      // ❌ Quitar de favoritos
      div.querySelector(".icono-corazon").addEventListener("click", () => {
        favoritos = favoritos.filter(p => p.nombre !== item.nombre);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        renderFavoritos();
      });

      contenedor.appendChild(div);
    });
  };

  renderFavoritos();
});
