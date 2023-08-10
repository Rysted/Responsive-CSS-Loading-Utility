// Conjunto para almacenar las URLs de hojas de estilo ya insertadas
const insertedStylesheets = new Set();

// Variable para almacenar la última categoría aplicada
let lastCategory = null;

// Función para verificar si una hoja de estilo ya está en el documento
function isStylesheetInserted(href) {
  return insertedStylesheets.has(href);
}

// Función para agregar etiquetas <link> al head del documento
function addStylesheetLink(href, media) {
  if (!isStylesheetInserted(href)) {
    const linkTag = document.createElement("link");
    linkTag.rel = "stylesheet";
    linkTag.href = href;
    linkTag.media = media;
    document.head.insertAdjacentElement("beforeend", linkTag);

    // Agregar la URL de la hoja de estilo al conjunto
    insertedStylesheets.add(href);
  }
}

// Función para manejar el evento de cambio de tamaño de ventana
function handleResize() {
  const newWidth = window.innerWidth; // Obtener el nuevo ancho
  console.log("Nuevo ancho de ventana:", newWidth);

  // Definir las hojas de estilo basadas en la resolución
  let category;

  if (newWidth <= 480) {
    category = "Mobile";
  } else if (newWidth <= 768) {
    category = "Tablet";
  } else if (newWidth <= 1200) {
    category = "Laptop";
  } else {
    category = "PC";
  }

  // Definir las URLs de hojas de estilo correspondientes a cada categoría
  const stylesheetUrls = {
    Mobile: "styles/mobile.css",
    Tablet: "styles/tablet.css",
    Laptop: "styles/laptop.css",
    PC: "styles/computer.css",
  };

  // Verificar si la categoría actual es diferente a la anterior
  if (category !== lastCategory) {
    // Obtener la URL de la hoja de estilo para la categoría actual
    const stylesheetUrl = stylesheetUrls[category];

    // Agregar la hoja de estilo si no está insertada
    addStylesheetLink(
      stylesheetUrl,
      `(min-width: ${
        category === "PC"
          ? 1201
          : category === "Laptop"
          ? 769
          : category === "Tablet"
          ? 481
          : 0
      }px) and (max-width: ${
        category === "Tablet"
          ? 768
          : category === "Laptop"
          ? 1200
          : category === "PC"
          ? 10000
          : 480
      }px)`
    );

    // Actualizar la última categoría
    lastCategory = category;
  }
}

// Agregar un oyente de eventos para el evento 'resize'
window.addEventListener("resize", handleResize);

// Llamar a la función inicialmente para obtener el ancho inicial
handleResize();
