
// Module Pattern:
// It is a self-invoked anonymous function in which we are going to place our code to protect it

// Syntax:

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



    // This function initializes the game
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


    // This function creates a new deck
    const createDeck = () => {

        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let type of types) {
                deck.push(i + type);
            }
        }

        for (let type of types) {
            for (let special of specials) {
                deck.push(special + type);
            }
        }
        return _.shuffle(deck);

    }


    // This function allows to take a card
    const takeCard = () => {

        if (deck.length === 0) {
            throw 'There are no cards in the deck';

        }
        return deck.pop();

    }


    // This function assigns value to each card
    const cardValue = (card) => {

        const value = card.substring(0, card.length - 1);
        return (isNaN(value)) ?
            (value === 'A') ? 11 : 10
            : value * 1;

    }


    // Turn: 0 = first player (you), and the last one will be cpu
    const addPoints = (card, turn) => {

        playersPoints[turn] = playersPoints[turn] + cardValue(card);
        scores[turn].innerText = playersPoints[turn];
        return playersPoints[turn];

    }


    // This function creates the cards
    const createCard = (card, turn) => {

        const imgcard = document.createElement('img');
        imgcard.src = `assets/cards/${card}.png`;
        imgcard.classList.add('card');
        divPlayersCards[turn].append(imgcard);

    }


    // This function validates what player wins
    const validateWinner = () => {

        const [minimumPoints, cpuPoints] = playersPoints;
        const cpuScore = scores[playersPoints.length - 1];

        if ((cpuPoints === minimumPoints) && (minimumPoints === 21)) {
            cpuScore.innerText = `${cpuPoints} TIE!`;

        } else if (minimumPoints > 21) {
            scores[0].innerText = `${playersPoints[0]} GAME OVER`;
            cpuScore.innerText = `${cpuPoints} Wins`;

        } else if ((cpuPoints > minimumPoints) && (cpuPoints <= 21)) {
            scores[0].innerText = `${playersPoints[0]} GAME OVER`;
            cpuScore.innerText = `${cpuPoints} Wins`;

        } else if (cpuPoints > 21) {
            cpuScore.innerText = `${cpuPoints} Loses`;
            scores[0].innerText = `${playersPoints[0]} YOU WIN!!`;
        }

    }


    // Cpu turn
    const cpuTurn = (minimumPoints) => {

        let cpuPoints = 0;

        do {

            const card = takeCard();
            cpuPoints = addPoints(card, playersPoints.length - 1);
            createCard(card, playersPoints.length - 1);

        } while ((cpuPoints <= minimumPoints) &&
                 (cpuPoints <= 20) &&
                 (minimumPoints <= 21)
        );

        validateWinner();

    }


    // EVENTS:
    // Hit button
    btnHit.addEventListener('click', () => {

        const card = takeCard();
        const playerPoints = addPoints(card, 0);

        createCard(card, 0);

        if (playerPoints > 21) {
            btnHit.disabled = true;
            btnStand.disabled = true;
            cpuTurn(playerPoints);

        } else if (playerPoints === 21) {
            scores[0].innerText = `${playerPoints} GREAT!`;
            btnHit.disabled = true;
            btnStand.disabled = true;
            cpuTurn(playerPoints);
        }

    });


    // Stand button
    btnStand.addEventListener('click', () => {

        btnStand.disabled = true;
        btnHit.disabled = true;
        cpuTurn(playersPoints[0]);

    });



    return {
        newGame: initGame
    };

})();





