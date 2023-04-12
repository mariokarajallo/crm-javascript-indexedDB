(function () {
  let DB;

  const nombreInput = document.querySelector("#nombre");
  const emailInput = document.querySelector("#email");
  const telefonoInput = document.querySelector("#telefono");
  const empresaInput = document.querySelector("#empresa");
  document.addEventListener("DOMContentLoaded", () => {
    conectarDB();
    // verificar el ID de la URL
    const parametrosURL = new URLSearchParams(window.location.search);

    const idCliente = parametrosURL.get("id");

    if (idCliente) {
      setTimeout(() => {
        obtenerCliente(idCliente);
      }, 100);
    }
  });
  // comparar ID y traer los datos
  function obtenerCliente(id) {
    const transaction = DB.transaction(["crm"], "readwrite");
    const objectStore = transaction.objectStore("crm");

    const cliente = objectStore.openCursor();

    cliente.onsuccess = function (e) {
      const cursor = e.target.result;

      if (cursor) {
        if (cursor.value.id === Number(id)) {
          llenarFormulario(cursor.value);
        }
        cursor.continue();
      }
    };
  }

  //cargamos los datos obtenidos en el formulario
  function llenarFormulario(datosCliente) {
    const { nombre, telefono, email, empresa } = datosCliente;

    nombreInput.value = nombre;
    telefonoInput.value = telefono;
    emailInput.value = email;
    empresaInput.value = empresa;
  }

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
