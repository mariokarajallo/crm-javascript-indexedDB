(function () {
  let idCliente;
  const nombreInput = document.querySelector("#nombre");
  const emailInput = document.querySelector("#email");
  const telefonoInput = document.querySelector("#telefono");
  const empresaInput = document.querySelector("#empresa");

  const formulario = document.querySelector("#formulario");
  document.addEventListener("DOMContentLoaded", () => {
    conectarDB();

    //actualizar datos del cliente
    formulario.addEventListener("submit", actualizarCliente);

    // verificar el ID de la URL
    const parametrosURL = new URLSearchParams(window.location.search);

    idCliente = parametrosURL.get("id");

    if (idCliente) {
      setTimeout(() => {
        obtenerCliente(idCliente);
      }, 100);
    }
  });
  // actualizar los datos del cliente
  function actualizarCliente(e) {
    e.preventDefault();

    if (
      nombreInput.value === "" ||
      emailInput.value === "" ||
      empresaInput.value === "" ||
      telefonoInput.value === ""
    ) {
      imprimirAlerta("todos los campos son obligatorios", "error");

      return;
    }

    // actualizar el cliente
    const clienteActualido = {
      nombre: nombreInput.value,
      email: emailInput.value,
      empresa: empresaInput.value,
      telefono: telefonoInput.value,
      id: Number(idCliente),
    };

    // transastion
    const transaction = DB.transaction(["crm"], "readwrite");
    const objectStore = transaction.objectStore("crm");

    objectStore.put(clienteActualido);

    transaction.onerror = function () {
      imprimirAlerta("Hubo un error en la actualizacion", "error");
    };

    transaction.oncomplete = function () {
      imprimirAlerta("Editado correctamente");

      setTimeout(() => {
        window.location.href = "index.html";
      }, 3000);
    };
  }

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
})();
