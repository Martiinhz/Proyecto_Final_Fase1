function llamarGemini(prompt) {
    const API_KEY = 'AIzaSyA3lkJyE4QG9cbxeEJ2RIphHjUH3_Uot2o';
    const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
  
    return fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt }
          ]
        }]
      })
    })
    .then(respuesta => {
      if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
      }
      return respuesta.json();
    })
    .then(datos => {
      const textoGenerado = datos.candidates[0].content.parts[0].text;
      
      console.log(textoGenerado);
      return textoGenerado;
    })
    .catch(error => {
      console.error('Error al llamar a la API de Gemini:', error);
    });
  }
  
  llamarGemini(`Responde si o no de acuerdo a la siguiente pregunta y porque?: ¿Es importante tener una buena administracion de mis finanzas?  `)
    .then(respuesta => {
      if (respuesta) {
      }
    });

    