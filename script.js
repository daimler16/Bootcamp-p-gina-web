// document.getElementById("calcForm").addEventListener("submit", function(e) {
//     e.preventDefault();
//     let consumo = parseFloat(document.getElementById("consumo").value);
//     let renovable = parseFloat(document.getElementById("renovable").value);

//     if (consumo > 0 && renovable >= 0 && renovable <= consumo) {
//         let porcentaje = (renovable / consumo) * 100;
//         document.getElementById("resultado").innerHTML = 
//             `<div class="alert alert-info">Porcentaje de energía renovable: <strong>${porcentaje.toFixed(2)}%</strong></div>`;
//     } else {
//         document.getElementById("resultado").innerHTML = 
//             `<div class="alert alert-danger">Datos inválidos</div>`;
//     }
// });


// ---------------------- Trivia Falso o Verdadero ----------------------
let preguntas = [
  { texto: "La energía solar fotovoltaica convierte la luz en electricidad.", respuesta: true },
  { texto: "El petróleo es una fuente de energía renovable.", respuesta: false },
  { texto: "La energía eólica depende de la velocidad del viento.", respuesta: true },
  { texto: "Los paneles solares funcionan mejor en climas fríos y nublados.", respuesta: false },
  { texto: "La biomasa puede generar electricidad mediante combustión.", respuesta: true },
  { texto: "La transición energética busca aumentar el uso de carbón.", respuesta: false },
  { texto: "El hidrógeno verde se produce usando energía renovable.", respuesta: true },
  { texto: "La energía mareomotriz proviene del movimiento de las olas.", respuesta: false },
  { texto: "La eficiencia energética reduce el consumo sin perder rendimiento.", respuesta: true },
  { texto: "Los gases de efecto invernadero ayudan a enfriar el planeta.", respuesta: false }
];

let indice = 0;
let correctas = 0;

function iniciarTrivia() {
  indice = 0;
  correctas = 0;
  document.getElementById("resultadoTrivia").innerHTML = "";
  
  // Mostrar los botones de Verdadero/Falso
  document.getElementById("botonesTrivia").style.display = "flex";
  
  // Ocultar el botón de Iniciar (opcional)
  document.querySelector("#botonesTrivia").closest('.card').querySelector('.btn-warning').style.display = "none";
  
  mostrarPregunta();
}

function mostrarPregunta() {
  if (indice < preguntas.length) {
    document.getElementById("pregunta").innerText = preguntas[indice].texto;
  } else {
    mostrarResultadoFinal();
  }
}

function responder(valor) {
  if (indice < preguntas.length) {
    if (preguntas[indice].respuesta === valor) {
      correctas++;
    }
    indice++;
    mostrarPregunta();
  }
}

function mostrarResultadoFinal() {
  let mensaje = "";
  let icono = "";

  if (correctas === preguntas.length) {
    mensaje = "¡Excelente! 🌟";
    icono = "🏆";
  } else if (correctas >= preguntas.length * 0.6) {
    mensaje = "¡Buen intento! 💪";
    icono = "⚡";
  } else {
    mensaje = "¡Sigue practicando! 📚";
    icono = "🔄";
  }

  document.getElementById("resultadoTrivia").innerHTML = `
    <div class="alert alert-success">
      ${mensaje}<br>
      Tu puntaje fue: ${correctas} de ${preguntas.length} ${icono}
    </div>
  `;
}

// ---------------------- Juego de Parejas MEJORADO ----------------------
let cartas = [
    { id: 1, contenido: "🌞", descripcion: "Energía Solar" },
    { id: 2, contenido: "💨", descripcion: "Energía Eólica" },
    { id: 3, contenido: "🔥", descripcion: "Biomasa" },
    { id: 4, contenido: "💧", descripcion: "Hidroeléctrica" },
    { id: 5, contenido: "☀️", descripcion: "Panel Solar" },
    { id: 6, contenido: "🌊", descripcion: "Mareomotriz" }
];

let juegoIniciado = false;
let tiempoInicio;
let intervalo;
let cartasVolteadas = [];
let paresEncontrados = 0;
let bloqueo = false; // Para evitar que se volteen muchas cartas a la vez

function iniciarParejas() {
    if (juegoIniciado) return;
    
    juegoIniciado = true;
    paresEncontrados = 0;
    cartasVolteadas = [];
    bloqueo = false;
    document.getElementById("mensajeFinal").innerText = "";
    document.getElementById("tiempo").innerText = "⏱ Tiempo: 0 segundos";
    
    // Duplicar y mezclar cartas
    let todasLasCartas = [...cartas, ...cartas];
    todasLasCartas.sort(() => Math.random() - 0.5);
    
    // Crear el tablero
    const tablero = document.getElementById("parejas");
    tablero.innerHTML = "";
    
    todasLasCartas.forEach((carta, index) => {
        const cartaElement = document.createElement("div");
        cartaElement.className = "card-game";
        cartaElement.dataset.id = carta.id;
        cartaElement.dataset.index = index;
        
        cartaElement.innerHTML = `
            <div class="card-inner">
                <div class="card-front">?</div>
                <div class="card-back">${carta.contenido}<br><small>${carta.descripcion}</small></div>
            </div>
        `;
        
        cartaElement.addEventListener("click", () => voltearCarta(cartaElement));
        tablero.appendChild(cartaElement);
    });
    
    // Iniciar temporizador
    tiempoInicio = new Date();
    clearInterval(intervalo);
    intervalo = setInterval(actualizarTemporizador, 1000);
}

function voltearCarta(carta) {
    if (bloqueo || carta.classList.contains("flipped") || carta.classList.contains("matched")) return;
    
    carta.classList.add("flipped");
    cartasVolteadas.push(carta);
    
    if (cartasVolteadas.length === 2) {
        bloqueo = true;
        
        const [carta1, carta2] = cartasVolteadas;
        
        if (carta1.dataset.id === carta2.dataset.id) {
            // Son pareja
            carta1.classList.add("matched");
            carta2.classList.add("matched");
            cartasVolteadas = [];
            bloqueo = false;
            paresEncontrados++;
            
            if (paresEncontrados === cartas.length) {
                clearInterval(intervalo);
                const tiempoFinal = Math.floor((new Date() - tiempoInicio) / 1000);
                document.getElementById("mensajeFinal").innerHTML = 
                    `<div class="alert alert-success">¡Felicidades! 🎉 Completaste el juego en ${tiempoFinal} segundos.</div>`;
                juegoIniciado = false;
            }
        } else {
            // No son pareja - voltear de nuevo después de un tiempo
            setTimeout(() => {
                carta1.classList.remove("flipped");
                carta2.classList.remove("flipped");
                cartasVolteadas = [];
                bloqueo = false;
            }, 1000);
        }
    }
}

function actualizarTemporizador() {
    if (juegoIniciado) {
        const tiempoTranscurrido = Math.floor((new Date() - tiempoInicio) / 1000);
        document.getElementById("tiempo").innerText = `⏱ Tiempo: ${tiempoTranscurrido} segundos`;
    }
}

// Función para reiniciar el juego
function reiniciarParejas() {
    if (juegoIniciado) {
        clearInterval(intervalo);
    }
    iniciarParejas();
}