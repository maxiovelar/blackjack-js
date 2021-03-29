
// Patrón Módulo:
// es una función anónima auto invocada en la que vamos a colocar
// nuestro código para protegerlo 

// Sintaxis:

const myModule = (() => {
    'use strict'

    let deck = [];

    const types = ['C', 'D', 'H', 'S'],
        specials = ['A', 'J', 'Q', 'K'];

    let playersPoints = [];


    // References of HTML
    const btnHit = document.querySelector('#btnHit'),
          btnStand = document.querySelector('#btnStand'),
          btnNew = document.querySelector('#btnNew');

    const divPlayersCards = document.querySelectorAll('.divCards'),
          scores = document.querySelectorAll('small');



    // This function initialize the game
    const initGame = (playersNum = 2) => {

        deck = createDeck();

        playersPoints = [];
        for (let i = 0; i < playersNum; i++) {
            playersPoints.push(0);
        }

        scores.forEach(elem => elem.innerText = 0);
        divPlayersCards.forEach(elem => elem.innerHTML = '');
        btnHit.disabled = false;
        btnStand.disabled = false;

    }


    // This function create a new deck
    const createDeck = () => {

        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of types) {
                deck.push(i + tipo);
            }
        }

        for (let tipo of types) {
            for (let especial of specials) {
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

        playersPoints[turno] = playersPoints[turno] + valorCarta(carta);
        scores[turno].innerText = playersPoints[turno];
        return playersPoints[turno];

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

        const [puntosMinimos, puntosComputadora] = playersPoints;
        const marcadorCpu = scores[playersPoints.length - 1];

        if ((puntosComputadora === puntosMinimos) && (puntosMinimos === 21)) {
            marcadorCpu.innerText = `${puntosComputadora} EMPATE!`;

        } else if (puntosMinimos > 21) {
            scores[0].innerText = `${playersPoints[0]} Perdiste`;
            marcadorCpu.innerText = `${puntosComputadora} Gana`;

        } else if ((puntosComputadora > puntosMinimos) && (puntosComputadora <= 21)) {
            scores[0].innerText = `${playersPoints[0]} Perdiste`;
            marcadorCpu.innerText = `${puntosComputadora} Gana`;

        } else if (puntosComputadora > 21) {
            marcadorCpu.innerText = `${puntosComputadora} Pierde`;
            scores[0].innerText = `${playersPoints[0]} GANASTE!!`;
        }

    }


    // Turno de la computadora
    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;

        do {

            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, playersPoints.length - 1);
            crearCarta(carta, playersPoints.length - 1);

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
            scores[0].innerText = `${puntosJugador} GENIAL!`;
            btnHit.disabled = true;
            btnStand.disabled = true;
            turnoComputadora(puntosJugador);
        }

    });


    // Botón Detener
    btnStand.addEventListener('click', () => {

        btnStand.disabled = true;
        btnHit.disabled = true;
        turnoComputadora(playersPoints[0]);

    });



    return {
        nuevoJuego: initGame
    };

})();





