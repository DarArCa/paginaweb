document.addEventListener("DOMContentLoaded", () => {
  const btnVolver = document.querySelector(".btn-volver");
  btnVolver.addEventListener("click", () => {
    window.location.href = "../index.html";
  });

  const btnFav = document.querySelector(".btn-fav");
  let favorito = false;

  btnFav.addEventListener("click", () => {
    favorito = !favorito;
    btnFav.textContent = favorito ? "favorite" : "favorite_border";
  });

  // Obtener producto desde localStorage
  const producto = JSON.parse(localStorage.getItem("detalleProducto"));

  if (producto) {
    document.getElementById("detalle-img").src = producto.imagen;
    document.querySelector(".titulo-producto").textContent = producto.nombre;
    document.querySelector(".precio-producto").textContent = producto.precio;
  }

  // Contador de cantidad
  const menos = document.querySelector(".menos");
  const mas = document.querySelector(".mas");
  const contador = document.querySelector(".cantidad");
  const precioElemento = document.querySelector(".precio-producto");
  const btnCarrito = document.querySelector(".btn-carrito");

  let cantidad = 1;
  let precioUnitario = parseFloat(producto.precio.replace('$', ''));

  function actualizarPrecio() {
    let total = (precioUnitario * cantidad).toFixed(2);
    precioElemento.textContent = `$${total}`;
    btnCarrito.innerHTML = `🛒 Add to Cart | <span class="precio-producto">$${total}</span> <del></del>`;
  }

  menos.addEventListener("click", () => {
    if (cantidad > 1) {
      cantidad--;
      contador.textContent = cantidad;
      actualizarPrecio();
    }
  });

  mas.addEventListener("click", () => {
    cantidad++;
    contador.textContent = cantidad;
    actualizarPrecio();
  });

  actualizarPrecio();

  // Botón Add to Cart
  btnCarrito.addEventListener("click", () => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const index = carrito.findIndex(item => item.nombre === producto.nombre);

    if (index !== -1) {
      carrito[index].cantidad += cantidad;
    } else {
      carrito.push({
        nombre: producto.nombre,
        precio: precioUnitario,
        cantidad: cantidad,
        imagen: new URL(producto.imagen, window.location.origin).href
      });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    cantidad = 1;
    contador.textContent = cantidad;
    actualizarPrecio();
  });

  // 👉 Selección de talla
  const botonesTalla = document.querySelectorAll(".tallas button");
  botonesTalla.forEach(btn => {
    btn.addEventListener("click", () => {
      botonesTalla.forEach(b => b.classList.remove("activo"));
      btn.classList.add("activo");
    });
  });

  // 👉 Selección de color
  const colores = document.querySelectorAll(".color-option");
  colores.forEach(color => {
    color.addEventListener("click", () => {
      colores.forEach(c => c.classList.remove("activo"));
      color.classList.add("activo");
    });
  });
});
