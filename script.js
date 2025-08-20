document.getElementById("calcForm").addEventListener("submit", function(e) {
    e.preventDefault();
    let consumo = parseFloat(document.getElementById("consumo").value);
    let renovable = parseFloat(document.getElementById("renovable").value);

    if (consumo > 0 && renovable >= 0 && renovable <= consumo) {
        let porcentaje = (renovable / consumo) * 100;
        document.getElementById("resultado").innerHTML = 
            `<div class="alert alert-info">Porcentaje de energía renovable: <strong>${porcentaje.toFixed(2)}%</strong></div>`;
    } else {
        document.getElementById("resultado").innerHTML = 
            `<div class="alert alert-danger">Datos inválidos</div>`;
    }
});


// ---------------------- Juego de Parejas ----------------------
let cartas = ["🌱","🌞","💧","⚡","🌱","🌞","💧","⚡"];
let seleccionadas = [];
let bloqueadas = false;

function iniciarParejas(){
    let contenedor = document.getElementById("parejas");
    contenedor.innerHTML = "";
    cartas.sort(() => Math.random() - 0.5);
    cartas.forEach((icono, index) => {
        let carta = document.createElement("div");
        carta.className = "card m-1 text-center";
        carta.style.width = "60px";
        carta.style.height = "60px";
        carta.style.fontSize = "2rem";
        carta.style.display = "flex";
        carta.style.alignItems = "center";
        carta.style.justifyContent = "center";
        carta.style.background = "#ccc";
        carta.dataset.icono = icono;
        carta.dataset.index = index;
        carta.innerHTML = "?";
        carta.onclick = () => voltearCarta(carta);
        contenedor.appendChild(carta);
    });
}

function voltearCarta(carta){
    if(bloqueadas || carta.innerHTML !== "?") return;
    carta.innerHTML = carta.dataset.icono;
    seleccionadas.push(carta);
    if(seleccionadas.length === 2){
        bloqueadas = true;
        setTimeout(() => {
            if(seleccionadas[0].dataset.icono !== seleccionadas[1].dataset.icono){
                seleccionadas[0].innerHTML = "?";
                seleccionadas[1].innerHTML = "?";
            }
            seleccionadas = [];
            bloqueadas = false;
        }, 800);
    }
}

// ---------------------- Trivia Falso o Verdadero ----------------------
let preguntas = [
    {texto: "La energía solar es renovable", respuesta: true},
    {texto: "El carbón es una fuente limpia", respuesta: false},
    {texto: "Los biocombustibles provienen de materia orgánica", respuesta: true}
];
let indice = 0;
let correctas = 0;

function iniciarTrivia(){
    indice = 0;
    correctas = 0;
    mostrarPregunta();
}

function mostrarPregunta(){
    if(indice < preguntas.length){
        document.getElementById("pregunta").innerText = preguntas[indice].texto;
    } else {
        document.getElementById("resultadoTrivia").innerHTML = 
            `<div class="alert alert-info">Respuestas correctas: ${correctas} de ${preguntas.length}</div>`;
    }
}

function responder(valor){
    if(indice < preguntas.length){
        if(preguntas[indice].respuesta === valor){
            correctas++;
        }
        indice++;
        mostrarPregunta();
    }
}
