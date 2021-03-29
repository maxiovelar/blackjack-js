
// Patrón Módulo:
// es una función anónima auto invocada en la que vamos a colocar
// nuestro código para protegerlo 

// Sintaxis:

const myModule = (() => {
    'use strict'

    let deck = [];

    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];


    // Referencias del HTML
    const btnHit = document.querySelector('#btnHit'),
          btnStand = document.querySelector('#btnStand'),
          btnNew = document.querySelector('#btnNew');

    const divPlayersCards = document.querySelectorAll('.divCards'),
        marcadores = document.querySelectorAll('small');



    // Esta función inicializa el juego
    const inicializarJuego = (numJugadores = 2) => {

        deck = crearDeck();

        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        marcadores.forEach(elem => elem.innerText = 0);
        divPlayersCards.forEach(elem => elem.innerHTML = '');
        btnHit.disabled = false;
        btnStand.disabled = false;

    }


    // Esta función crea un nuevo deck
    const crearDeck = () => {

        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let tipo of tipos) {
            for (let especial of especiales) {
                deck.push(especial + tipo);
            }
        }
        return _.shuffle(deck);

    }


    // Esta función me permite tomar una carta
    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay cartas en el deck';

        }
        return deck.pop();

    }


    // Esta función le asigna valor a cada carta
    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;

    }


    // Turno: 0 = primer jugador y el último será la Cpu
    const acumularPuntos = (carta, turno) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        marcadores[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];

    }


    // Esta función crea las cartas
    const crearCarta = (carta, turno) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cards/${carta}.png`;
        imgCarta.classList.add('card');
        divPlayersCards[turno].append(imgCarta);

    }


    // Esta función valida el que jugador gana
    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;
        const marcadorCpu = marcadores[puntosJugadores.length - 1];

        if ((puntosComputadora === puntosMinimos) && (puntosMinimos === 21)) {
            marcadorCpu.innerText = `${puntosComputadora} EMPATE!`;

        } else if (puntosMinimos > 21) {
            marcadores[0].innerText = `${puntosJugadores[0]} Perdiste`;
            marcadorCpu.innerText = `${puntosComputadora} Gana`;

        } else if ((puntosComputadora > puntosMinimos) && (puntosComputadora <= 21)) {
            marcadores[0].innerText = `${puntosJugadores[0]} Perdiste`;
            marcadorCpu.innerText = `${puntosComputadora} Gana`;

        } else if (puntosComputadora > 21) {
            marcadorCpu.innerText = `${puntosComputadora} Pierde`;
            marcadores[0].innerText = `${puntosJugadores[0]} GANASTE!!`;
        }

    }


    // Turno de la computadora
    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;

        do {

            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

        } while ((puntosComputadora <= puntosMinimos) &&
        (puntosComputadora <= 20) &&
            (puntosMinimos <= 21)
        );

        determinarGanador();

    }


    // EVENTOS:
    // Botón Pedir
    btnHit.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

        if (puntosJugador > 21) {
            btnHit.disabled = true;
            btnStand.disabled = true;
            turnoComputadora(puntosJugador);

        } else if (puntosJugador === 21) {
            marcadores[0].innerText = `${puntosJugador} GENIAL!`;
            btnHit.disabled = true;
            btnStand.disabled = true;
            turnoComputadora(puntosJugador);
        }

    });


    // Botón Detener
    btnStand.addEventListener('click', () => {

        btnStand.disabled = true;
        btnHit.disabled = true;
        turnoComputadora(puntosJugadores[0]);

    });



    return {
        nuevoJuego: inicializarJuego
    };

})();





