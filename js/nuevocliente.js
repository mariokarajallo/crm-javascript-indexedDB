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

    //leer todos los inputs del formulario
    const nombre = document.querySelector("#nombre").value;
    const email = document.querySelector("#email").value;
    const telefono = document.querySelector("#telefono").value;
    const empresa = document.querySelector("#empresa").value;

    //validar el formulario que no este vacio al crear un nuevo cliente
    if (nombre === "" || email === "" || telefono === "" || empresa === "") {
      imprimirAlerta("Todos los campos son obligatorios", "error");

      return;
    }

    // crea un objeto con los datos del formulario
    const cliente = {
      nombre,
      email,
      telefono,
      empresa,
    };

    cliente.id = Date.now();

    crearNuevoCliente(cliente);
  }

  function crearNuevoCliente(cliente) {
    const transaction = DB.transaction(["crm"], "readwrite");

    const objectStore = transaction.objectStore("crm");

    objectStore.add(cliente);

    transaction.onerror = function () {
      imprimirAlerta("hubo un error al crear el nuevo cliente", "error");
    };

    transaction.oncomplete = function () {
      imprimirAlerta("Cliente agregado correctamente");

      setTimeout(() => {
        window.location.href = "index.html";
      }, 3000);
    };
  }

  function imprimirAlerta(mensaje, tipo) {
    const alerta = document.querySelector(".alerta");
    //evitamos que se repita el mensaje de alerta si es que existe un previamente
    if (!alerta) {
      // creamos la alerta
      const divMensaje = document.createElement("div");

      divMensaje.classList.add(
        "px-4",
        "py-3",
        "rounded",
        "max-w-lg",
        "mx-auto",
        "mt-6",
        "text-center",
        "border",
        "alerta"
      );

      //validamos el tipo de mensaje error - exito
      if (tipo === "error") {
        divMensaje.classList.add(
          "bg-red-100",
          "border-red-400",
          "text-red-700"
        );
      } else {
        divMensaje.classList.add(
          "bg-green-100",
          "border-green-400",
          "text-green-700"
        );
      }

      //agregamos el contenido del mensaje
      divMensaje.textContent = mensaje;

      //agregamos el div de mensaje de alerta debajo del formulario
      formulario.appendChild(divMensaje);

      //tiempo de espera para borrar la alerta
      setTimeout(() => {
        divMensaje.remove();
      }, 3000);
    }
  }
})();
