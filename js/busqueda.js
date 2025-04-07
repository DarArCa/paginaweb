document.addEventListener("DOMContentLoaded", () => {
    const inputBusqueda = document.querySelector(".busqueda input");
    const contenedorProductos = document.querySelector(".productos");
  
    if (!inputBusqueda || !contenedorProductos) return;
  
    inputBusqueda.addEventListener("input", () => {
      const termino = inputBusqueda.value.toLowerCase();
      const productos = Array.from(contenedorProductos.querySelectorAll(".producto"));
  
      productos.forEach(producto => {
        const nombre = producto.querySelector("h3").textContent.toLowerCase();
        if (nombre.includes(termino)) {
          producto.style.display = "block";
        } else {
          producto.style.display = "none";
        }
      });
  
      // Opcional: Reordenar productos (coincidentes arriba)
      productos.sort((a, b) => {
        const aCoincide = a.querySelector("h3").textContent.toLowerCase().includes(termino);
        const bCoincide = b.querySelector("h3").textContent.toLowerCase().includes(termino);
        return bCoincide - aCoincide;
      });
  
      productos.forEach(p => contenedorProductos.appendChild(p));
    });
  });
  