document.addEventListener('DOMContentLoaded', () => {
  const contenedorCarrito = document.getElementById('contenedor-carrito');
  const ventanaCompra = document.getElementById('ventana-compra');
  const datosPerfil = document.getElementById('datos-perfil');
  const totalCompra = document.getElementById('total-compra');

  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  mostrarProductosCarrito();

  function mostrarProductosCarrito() {
    contenedorCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach(producto => {
      const card = document.createElement('div');
      card.className = 'producto';

      total += producto.precio * (producto.cantidad || 1);

      card.innerHTML = `
        <div class="producto-info">
          <img src="${producto.imagen || '../../'}" alt="${producto.nombre}" class="img-producto">
          <div>
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <p>Cantidad: ${producto.cantidad || 1}</p>
          </div>
        </div>
      `;

      contenedorCarrito.appendChild(card);
    });

    totalCompra.textContent = `Total: $${total.toFixed(2)}`;
  }

  window.abrirVentanaCompra = function () {
    const perfil = JSON.parse(localStorage.getItem('perfil')) || {};
    datosPerfil.innerHTML = `
      <p><strong>Nombre:</strong> ${perfil.nombre || ''}</p>
      <p><strong>Correo:</strong> ${perfil.correo || ''}</p>
      <p><strong>Teléfono:</strong> ${perfil.telefono || ''}</p>
      <p><strong>Dirección:</strong> ${perfil.direccion || ''}</p>
      <p><strong>Ciudad:</strong> ${perfil.ciudad || ''}</p>
    `;
    ventanaCompra.style.display = 'flex';
  };

  window.cerrarVentanaCompra = function () {
    ventanaCompra.style.display = 'none';
  };
});

document.querySelector('.btn-finalizar').addEventListener('click', () => {
  cerrarVentanaCompra();

  const mensaje = document.getElementById('mensaje-exito');
  mensaje.style.display = 'block';

  setTimeout(() => {
    mensaje.style.display = 'none';
  }, 3000);

  // Si deseas vaciar el carrito después de comprar:
  localStorage.removeItem('carrito');
  document.getElementById('contenedor-carrito').innerHTML = '';
});




