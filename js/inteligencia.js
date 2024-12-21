function llamarGemini(prompt) {
    const API_KEY = 'AIzaSyCT3kmokDV6G36knR9L0_yX1fK7Pp2Cuqc';
    const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    return fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: {
                parts: [
                    { text: prompt }
                ]
            }
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
        return textoGenerado;
    })
    .catch(error => {
        console.error('Error al llamar a la API de Gemini:', error);
    });
}

function analizarGastos() {
    const tabla = document.querySelector('#transactions-table tbody');
    const filas = tabla.querySelectorAll('tr');

    const gastosPorCategoria = {};

   
    filas.forEach(fila => {
        const columnas = fila.querySelectorAll('td');
        const tipo = columnas[0].textContent.trim();
        const monto = parseFloat(columnas[1].textContent.trim());
        const categoria = columnas[2].textContent.trim(); 

        if (tipo.toLowerCase() === 'gasto') {
            if (!gastosPorCategoria[categoria]) {
                gastosPorCategoria[categoria] = 0;
            }
            gastosPorCategoria[categoria] += monto;
        }
    });

    
    let categoriaMayorGasto = null;
    let montoMayorGasto = 0;

    for (const categoria in gastosPorCategoria) {
        if (gastosPorCategoria[categoria] > montoMayorGasto) {
            categoriaMayorGasto = categoria;
            montoMayorGasto = gastosPorCategoria[categoria];
        }
    }

  
    if (categoriaMayorGasto) {
        const mensaje = `En el historial de transacciones, el mayor gasto ha sido en la categoría "${categoriaMayorGasto}" con un total de $${montoMayorGasto.toLocaleString()}.`;
        
        llamarGemini(mensaje)
            .then(respuesta => {
                if (respuesta) {
                    console.log('Respuesta de la inteligencia:', respuesta);
                }
            });
    } else {
        console.log('No se encontraron gastos en la tabla.');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    analizarGastos();
});

