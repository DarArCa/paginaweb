document.addEventListener("DOMContentLoaded", () => {
  const nombreInput = document.getElementById("input-nombre");
  const correoInput = document.getElementById("input-correo");
  const telefonoInput = document.getElementById("input-telefono");
  const direccionInput = document.getElementById("input-direccion");
  const ciudadInput = document.getElementById("input-ciudad");
  const imagenInput = document.getElementById("input-imagen");
  const btnGuardar = document.getElementById("guardar-perfil");

  const nombreHeader = document.getElementById("nombre-usuario");
  const imagenPerfil = document.getElementById("imagen-perfil");

  const datos = JSON.parse(localStorage.getItem("perfil")) || {};

  if (datos.nombre) {
    nombreHeader.textContent = datos.nombre;
    nombreInput.value = datos.nombre;
  }

  if (datos.correo) correoInput.value = datos.correo;
  if (datos.telefono) telefonoInput.value = datos.telefono;
  if (datos.direccion) direccionInput.value = datos.direccion;
  if (datos.ciudad) ciudadInput.value = datos.ciudad;
  if (datos.imagen) imagenPerfil.src = datos.imagen;

  btnGuardar.addEventListener("click", () => {
    const perfilActualizado = {
      nombre: nombreInput.value,
      correo: correoInput.value,
      telefono: telefonoInput.value,
      direccion: direccionInput.value,
      ciudad: ciudadInput.value,
      imagen: datos.imagen // Se mantiene la imagen actual si no se actualiza
    };

    if (imagenInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        perfilActualizado.imagen = e.target.result;
        imagenPerfil.src = perfilActualizado.imagen;
        localStorage.setItem("perfil", JSON.stringify(perfilActualizado));
        nombreHeader.textContent = perfilActualizado.nombre;
        alert("Perfil guardado con nueva imagen ✅");
      };
      reader.readAsDataURL(imagenInput.files[0]);
    } else {
      localStorage.setItem("perfil", JSON.stringify(perfilActualizado));
      nombreHeader.textContent = perfilActualizado.nombre;
      alert("Perfil guardado ✅");
    }
  });
});
