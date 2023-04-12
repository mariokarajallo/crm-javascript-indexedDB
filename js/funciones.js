//conectamos a nuestra DB
let DB;

function conectarDB() {
  const abrirConexion = window.indexedDB.open("crm", 1);

  abrirConexion.onerror = function () {
    console.log("Hubo un error en la conexion de la tabla indexeddb");
  };

  abrirConexion.onsuccess = function () {
    DB = abrirConexion.result;
  };
}

// imprime mensajes de alerta segun el tipo de mensaje
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
      divMensaje.classList.add("bg-red-100", "border-red-400", "text-red-700");
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
