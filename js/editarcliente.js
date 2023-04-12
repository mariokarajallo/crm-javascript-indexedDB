(function () {
  let DB;
  document.addEventListener("DOMContentLoaded", () => {
    // verificar el ID de la URL
    const parametrosURL = new URLSearchParams(window.location.search);

    const idCliente = parametrosURL.get("id");

    if (idCliente) {
      obtenerCliente(idCliente);
    }
  });

  //conectamos a nuestra DB
  function conectarDB() {
    const abrirConexion = window.indexedDB.open("crm", 1);

    abrirConexion.onerror = function () {
      console.log("hubo un error al conectar con la base de datos");
    };

    abrirConexion.onsuccess = function () {
      DB = abrirConexion.result;
    };
  }
})();
