(function () {
  document.addEventListener("DOMContentLoaded", () => {
    // verificar el ID de la URL
    const parametrosURL = new URLSearchParams(window.location.search);

    const idCliente = parametrosURL.get("id");

    if (idCliente) {
      obtenerCliente(idCliente);
    }
  });
})();
