(function () {
  let DB;
  const formulario = document.querySelector("#formulario");

  document.addEventListener("DOMContentLoaded", () => {
    conectarDB();

    formulario.addEventListener("submit", validarCliente);
  });

  function conectarDB() {
    const abrirConexion = window.indexedDB.open("crm", 1);

    abrirConexion.onerror = function () {
      console.log("Hubo un error en la conexion de la tabla indexeddb");
    };

    abrirConexion.onsuccess = function () {
      DB = abrirConexion.result;
    };
  }
  function validarCliente(e) {
    e.preventDefault();

    console.log("validando");
  }
})();
