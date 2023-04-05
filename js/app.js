// creamos un IIFE (iffy pronunciacion), es como una burbuja que contiene todas las variables y funciones definidas dentro de ella y no permite que se filtren al ámbito global (global scope).
(function () {
  let DB;

  document.addEventListener("DOMContentLoaded", () => {
    crearDB();
  });

  // Crea la base de datos indexedDB
  function crearDB() {
    const crearDB = window.indexedDB.open("crm", 1);

    crearDB.onerror = function () {
      console.log("hubo un error");
    };

    crearDB.onsuccess = function () {
      DB = crearDB.result;
    };

    crearDB.onupgradeneeded = function (e) {
      const db = e.target.result;

      const objectStore = db.createObjectStore("crm", {
        keyPath: "id",
        autoIncrement: true,
      });

      objectStore.createIndex("nombre", "nombre", { unique: false });
      objectStore.createIndex("email", "email", { unique: false });
      objectStore.createIndex("telefono", "telefono", { unique: false });
      objectStore.createIndex("empresa", "empresa", { unique: false });
      objectStore.createIndex("id", "id", { unique: false });

      console.log("base de dato creada correctamente");
    };
  }
})();
