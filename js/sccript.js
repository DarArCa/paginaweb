document.addEventListener("DOMContentLoaded", () => {
  const productos = document.querySelectorAll(".producto");
  const filtroBotones = document.querySelectorAll(".filtros button");

  // Filtrado
  filtroBotones.forEach(boton => {
    boton.addEventListener("click", () => {
      filtroBotones.forEach(btn => btn.classList.remove("activo"));
      boton.classList.add("activo");

      const filtro = boton.getAttribute("data-filtro");
      productos.forEach(producto => {
        const categoria = producto.getAttribute("data-categoria");
        producto.style.display = (filtro === "all" || filtro === categoria) ? "block" : "none";
      });
    });
  });

  // Cargar favoritos desde localStorage
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  productos.forEach(producto => {
    const corazon = producto.querySelector(".icono-corazon");
    const nombre = producto.querySelector("h3").textContent;

    // Mostrar el corazón lleno si está en favoritos
    if (favoritos.find(p => p.nombre === nombre)) {
      corazon.textContent = "❤️";
    } else {
      corazon.textContent = "🤍";
    }

    // Toggle favorito
    corazon.addEventListener("click", () => {
      const productoData = {
        nombre: producto.querySelector("h3").textContent,
        imagen: producto.querySelector("img").src,
        categoria: producto.getAttribute("data-categoria"),
        precio: producto.querySelector(".precio-rating span:nth-child(1)").textContent,
        rating: producto.querySelector(".precio-rating span:nth-child(2)").textContent,
      };

      const index = favoritos.findIndex(p => p.nombre === productoData.nombre);

      if (index === -1) {
        favoritos.push(productoData);
        corazon.textContent = "❤️";
      } else {
        favoritos.splice(index, 1);
        corazon.textContent = "🤍";
      }

      localStorage.setItem("favoritos", JSON.stringify(favoritos));
    });

    // Ir a detalle.html al hacer clic en imagen
    const img = producto.querySelector("img");
    img.addEventListener("click", () => {
      const detalle = {
        nombre: producto.querySelector("h3").textContent,
        imagen: producto.querySelector("img").src,
        categoria: producto.getAttribute("data-categoria"),
        precio: producto.querySelector(".precio-rating span:nth-child(1)").textContent,
        rating: producto.querySelector(".precio-rating span:nth-child(2)").textContent
      };
      localStorage.setItem("detalleProducto", JSON.stringify(detalle));
      window.location.href = "html/detalle.html";
    });
  });

  // Mostrar nombre e imagen del usuario
  const nombreGuardado = localStorage.getItem("nombreUsuario");
  const fotoGuardada = localStorage.getItem("fotoPerfil");

  if (nombreGuardado) {
    const titulo = document.querySelector(".usuario h2");
    if (titulo) titulo.textContent = nombreGuardado;
  }

  if (fotoGuardada) {
    const imagen = document.querySelector(".usuario img");
    if (imagen) imagen.src = fotoGuardada;
  }

  // Actualizar cantidad en carrito
  const contador = document.querySelector(".carrito-contador");
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  if (contador) {
    let total = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    contador.textContent = total;
  }
});


