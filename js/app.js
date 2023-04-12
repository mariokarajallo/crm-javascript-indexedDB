// creamos un IIFE (iffy pronunciacion), es como una burbuja que contiene todas las variables y funciones definidas dentro de ella y no permite que se filtren al ámbito global (global scope).
(function () {
  const listadoClientes = document.querySelector("#listado-clientes");

  // antes que nada cargamos todo el contenido primero
  document.addEventListener("DOMContentLoaded", () => {
    crearDB();

    // en caso de que exista la base de datos CRM
    if (window.indexedDB.open("crm", 1)) {
      obtenerClientes();
    }

    listadoClientes.addEventListener("click", eliminarRegistro);
  });
  //eliminar registro
  function eliminarRegistro(e) {
    if (e.target.classList.contains("eliminar")) {
      //guardamos el id a eliminar y convertimos en tipo numero
      const idEliminar = Number(e.target.dataset.cliente);
      const nombreEliminar =
        e.target.parentNode.parentNode.querySelector("p.nombre").innerText;

      //consultamos si queremos eliminar o no
      const confirmar = confirm(`Deseas eliminar al cliente ${nombreEliminar}`);

      if (confirmar) {
        const transaction = DB.transaction(["crm"], "readwrite");
        const objectStore = transaction.objectStore("crm");

        objectStore.delete(idEliminar);

        transaction.oncomplete = function () {
          console.log("eliminado");

          e.target.parentElement.parentElement.remove();
        };

        transaction.onerror = function () {
          console.log("hubo un error al eliminar");
        };
      }
    }
  }

  // Crea la base de datos indexedDB
  function crearDB() {
    const crearDB = window.indexedDB.open("crm", 1);

    // si hay un error informar
    crearDB.onerror = function () {
      console.log("hubo un error");
    };

    // si no hay errores asignamos a nuestra variable global DB
    crearDB.onsuccess = function () {
      DB = crearDB.result;
    };

    // creamos las tablas
    crearDB.onupgradeneeded = function (e) {
      const db = e.target.result;

      const objectStore = db.createObjectStore("crm", {
        keyPath: "id",
        autoIncrement: true,
      });

      objectStore.createIndex("nombre", "nombre", { unique: false });
      objectStore.createIndex("email", "email", { unique: true });
      objectStore.createIndex("telefono", "telefono", { unique: false });
      objectStore.createIndex("empresa", "empresa", { unique: false });
      objectStore.createIndex("id", "id", { unique: false });

      console.log("base de dato creada correctamente");
    };
  }

  //funcion para listar los clientes de la base de datos
  function obtenerClientes() {
    const abrirConexion = window.indexedDB.open("crm", 1);

    abrirConexion.onerror = function () {
      console.log("hubo un error al abrir la base de datos");
    };

    abrirConexion.onsuccess = function () {
      DB = abrirConexion.result;

      const objectStore = DB.transaction("crm").objectStore("crm");

      objectStore.openCursor().onsuccess = function (e) {
        const cursor = e.target.result;

        if (cursor) {
          const { nombre, empresa, email, telefono, id } = cursor.value;

          listadoClientes.innerHTML += ` 
          <tr>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold nombre"> ${nombre} </p>
                <p class="text-sm leading-10 text-gray-700"> ${email} </p>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                <p class="text-gray-700">${telefono}</p>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                <p class="text-gray-600">${empresa}</p>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
            </td>
          </tr>  `;

          cursor.continue();
        } else {
          console.log("no hay mas registros");
        }
      };
    };
  }
})();
