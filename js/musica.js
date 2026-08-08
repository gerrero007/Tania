document.addEventListener("DOMContentLoaded", function() {
  const lp = document.getElementById("lp");
  const li = document.getElementById("li");

  // Reproductor de audio único para manejar la música
  let reproductor = new Audio();

  // Función auxiliar para buscar y reproducir la pista de 30s
  async function reproducirPreview(termino) {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(termino)}&entity=song&limit=1`;

    try {
      const respuesta = await fetch(url);
      const datos = await respuesta.json();

      if (datos.results.length > 0) {
        const urlPreview = datos.results[0].previewUrl;

        // Pausamos si ya había algo sonando y cambiamos la fuente
        reproductor.pause();
        reproductor.src = urlPreview;
        reproductor.play();
      } else {
        console.warn('No se encontró previsualización para:', termino);
      }
    } catch (error) {
      console.error('Error al cargar la canción:', error);
    }
  }

  // Eventos de clic
  lp.addEventListener("click", function() {
    reproducirPreview("One Step Closer Linkin Park");
  });

  li.addEventListener("click", function() {
    reproducirPreview("Mala Suerte Lola Indigo");
  });
});