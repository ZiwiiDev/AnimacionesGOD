/*-------------------------------------------------------------------------------*/
/* Oliver Fabián Stetcu | 2º DAW */
/*-------------------------------------------------------------------------------*/
// Obtengo las referencias a los botones
document.addEventListener("DOMContentLoaded", function () {
  let empezarAnimacionCSS = document.getElementById("empezarAnimacion");
  let pararAnimacionCSS = document.getElementById("pararAnimacion");

  // Función para comenzar las animaciones
  function empezarAnimacion() {
    const elementosSubzona = document.querySelectorAll(".subzona > *");
    elementosSubzona.forEach((divSubzona) => {
      divSubzona.style.animationPlayState = "running";
    });

    const elementosDispositivo = document.querySelectorAll(".dispositivo > *");
    elementosDispositivo.forEach((divDispositivos) => {
      divDispositivos.style.animationPlayState = "running";
    });

    const elementosPantalla = document.querySelectorAll(".pantalla > *");
    elementosPantalla.forEach((divPantalla) => {
      divPantalla.style.animationPlayState = "running";
    });
  }

  // Función para detener las animaciones
  function pararAnimacion() {
    const elementosSubzona = document.querySelectorAll(".subzona > *");
    elementosSubzona.forEach((elemento) => {
      elemento.style.animationPlayState = "paused";
    });

    const elementosDispositivo = document.querySelectorAll(".dispositivo > *");
    elementosDispositivo.forEach((divDispositivos) => {
      divDispositivos.style.animationPlayState = "paused";
    });

    const elementosPantalla = document.querySelectorAll(".pantalla > *");
    elementosPantalla.forEach((divPantalla) => {
      divPantalla.style.animationPlayState = "paused";
    });
  }

  // Agrego eventos listeners a los botones
  empezarAnimacionCSS.addEventListener("click", empezarAnimacion);
  pararAnimacionCSS.addEventListener("click", pararAnimacion);
});
/*-------------------------------------------------------------------------------*/
// Animación con CANVAS
document.addEventListener("DOMContentLoaded", () => {
  let lienzo = document.getElementById("miCanvas");
  let dibujo = lienzo.getContext("2d");

  // Defino la batería
  let bateria = {
    x: 148,
    y: 144,
    ancho: 100,
    alto: 150,
    carga: 0,
  };

  // Defino la pantalla
  let pantalla = {
    x: 100,
    y: 10,
    ancho: 200,
    alto: 100,
  };

  let intervaloCarga;
  let estaCargando = false;

  function dibujarBateria() {
    dibujo.clearRect(0, 0, lienzo.width, lienzo.height);

    // Dibujo el borde del rectángulo que contiene la batería
    dibujo.strokeStyle = "black";
    dibujo.lineWidth = 2;
    dibujo.strokeRect(
      bateria.x - 10,
      bateria.y - 33,
      bateria.ancho + 20,
      bateria.alto + 35
    );

    // Dibujo la batería (rectángulo inferior a la batería) y le aplico borde
    dibujo.fillStyle = "white";
    dibujo.strokeStyle = "black";
    dibujo.lineWidth = 2;
    dibujo.fillRect(bateria.x, bateria.y, bateria.ancho, bateria.alto);
    dibujo.strokeRect(bateria.x, bateria.y, bateria.ancho, bateria.alto);

    // Dibujo el rectángulo pequeño encima del rectángulo de la batería
    const anchoPequenio = 30;
    const altoPequenio = 30;
    const xPequenio = bateria.x + (bateria.ancho - anchoPequenio) / 2;
    const yPequenio = bateria.y - 92 + (bateria.alto - altoPequenio) / 2;

    let colorBorde = "blue";
    let colorFondo = "white";

    // Si la carga llega a 100% cambio el color de fondo y borde
    if (bateria.carga === 100) {
      colorBorde = "white";
      colorFondo = "blue";
    }//end if

    dibujo.fillStyle = colorFondo;
    dibujo.strokeStyle = colorBorde;
    dibujo.lineWidth = 2;

    dibujo.fillRect(xPequenio, yPequenio, anchoPequenio, altoPequenio);
    dibujo.strokeRect(xPequenio, yPequenio, anchoPequenio, altoPequenio);

    // Dibujo la carga de la batería
    let colorCarga;
    if (bateria.carga < 25) {
      colorCarga = "red";
    } else if (bateria.carga < 50) {
      colorCarga = "orange";
    } else if (bateria.carga < 100) {
      colorCarga = "yellow";
    } else {
      colorCarga = "green";
    }//end else

    dibujo.fillStyle = colorCarga;
    dibujo.fillRect(
      bateria.x,
      bateria.y + bateria.alto - bateria.alto * (bateria.carga / 100),
      bateria.ancho,
      bateria.alto * (bateria.carga / 100)
    );

    // Estilos para el porcentaje de carga
    dibujo.fillStyle = "black";
    dibujo.font = "12px Arial";

    const padding = 25;
    const texto = bateria.carga + "%";
    const anchoTexto = dibujo.measureText(texto).width;
    const anchoRectangulo = anchoTexto + 2 * padding;

    dibujo.strokeStyle = "black";
    dibujo.lineWidth = 2;
    dibujo.strokeRect(
      bateria.x + (bateria.ancho - anchoRectangulo) / 2,
      bateria.y + 10,
      anchoRectangulo,
      20
    );

    // Dibujo el texto del % de carga
    dibujo.fillText(
      texto,
      bateria.x + (bateria.ancho - anchoTexto) / 2,
      bateria.y + 24
    );

    // Dibujo la pantalla y le pongo un borde
    dibujo.fillStyle = "wheat";
    dibujo.fillRect(pantalla.x, pantalla.y, pantalla.ancho, pantalla.alto);

    dibujo.strokeStyle = "black";
    dibujo.lineWidth = 2;
    dibujo.strokeRect(pantalla.x, pantalla.y, pantalla.ancho, pantalla.alto);
  }//end dibujarBateria()

  function cargarBateria() {
    if (!estaCargando) {
      estaCargando = true;
      intervaloCarga = setInterval(() => {
        // Si la batería no ha llegado al 100%
        if (bateria.carga < 100) {
          bateria.carga += 1;
          dibujarBateria();
        } else {
          clearInterval(intervaloCarga);
          mostrarImagen();
        }//end else
      }, 50); // Velocidad de la carga
    }//end if
  }//end cargarBateria()

  // Función que muestra la imagen cuando llegue al 100% la carga de la bateria
  function mostrarImagen() {
    let imagen = new Image();
    imagen.onload = function () {
      dibujo.drawImage(
        imagen,
        pantalla.x,
        pantalla.y,
        pantalla.ancho,
        pantalla.alto
      );
    };

    imagen.src = "../assets/img/fondoCanvas.jpg";
  }//end mostrarImagen()

  document.getElementById("empezarCanvas").addEventListener("click", cargarBateria);

  dibujarBateria();
});
/*-------------------------------------------------------------------------------*/
