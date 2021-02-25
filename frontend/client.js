"use strict";
document.addEventListener("DOMContentLoaded", onLoad);

function onLoad() {
  let myName = "alon";
  let player;
  let opponents = {};
  let activePlayer;
  let matchNumber;
  let pileDeck;
  let activePlayerMove = {
    "selected-cards": [],
  };
  const playerElement = document.querySelector(".active-player");

  setInterval(updateGameState, 5000);
  updateGameState();
  renderAll();

  function startGame() {
    //request for creation of a new game
  }

  function updateGameState() {
    //runs every x seconds and asks for data relevant to player
    const state = netUtils.getGameStateForPlayer(myName);
    player = new Player(
      state.cards,
      state.playersPoints[myName],
      state.playersCardNumbers[myName]
    );
    for (const playerName of state.playerNames) {
      if (playerName === myName) continue;
      const points = state.playersPoints[playerName];
      const numberOfCards = state.playersCardNumbers[playerName];
      opponents[playerName] = new Player(null, points, numberOfCards);
    }
    pileDeck = state.pileDeck;
  }

  function renderAll() {
    //RENDER PLAYER
    for (const card of player.cards) {
      const cardElement = utils.createCardElement(card);
      playerElement.appendChild(cardElement);
    }
    //RENDER OPPONENTS
    const opponentsElements = document.querySelectorAll(".opponent");
    let j = 0;
    for (const opponentName in opponents) {
      const opponentElement = opponentsElements.item(j);
      j++;
      const opponent = opponents[opponentName];
      for (let i = 0; i < opponent.numberOfCards; i++) {
        const cardElement = utils.createCardElement(null, true);
        opponentElement.appendChild(cardElement);
      }
    }
    //RENDER PILE
    const pileDeckElement = document.querySelector("#pile-deck");
    for (const card of pileDeck.cards) {
      const li = document.createElement("li");
      const cardElement = utils.createCardElement(card);
      li.appendChild(cardElement);
      pileDeckElement.appendChild(li);
    }

    
  }

  function collectMoveData(card) {
    //block unplayable cards
    const cardRank = card.getAttribute("rank");
    const cardSuit = card.getAttribute("suit");
    const is_Joker = card.getAttribute("is-joker");
    const unavailableCards = [];
    activePlayerMove["selected-cards"].push({
      rank: cardRank,
      suit: cardSuit,
      isJoker: is_Joker,
    });
    player.activeCards = activePlayerMove["selected-cards"];
    for (const card of player.cards) {
      if (card.suit !== player.activeCards[0].suit) {
        unavailableCards.push(card);
      }
    }
    console.log(unavailableCards);
    // for (let i = 2; i < unavailableCards.length; i++) {
    //   const unavailableCard = unavailableCards[i];
    //   document.querySelector(
    //     `body > div > div.box.player.active-player > img:nth-child(${i})`
    //   );
    // }
    // if (!player.activeCards) {

    // }
    // else {
    //   console.log(player);
    //   for (const card of player.cards) {
    //     if (
    //       card.suit !== player.activeCards[0].suit &&
    //       card.name !== player.activeCards[0].name
    //     ) {
    //       console.log(card.suit);
    //       console.log(player.activeCards[0].suit);
    //     }
    //   }
    // }
  }

  playerElement.addEventListener("click", (e) => {
    let clickedCard = e.target;
    collectMoveData(clickedCard);
    // verifyMoveEligibility(clickedCard);
  });

  function verifyMoveEligibility(card) {
    //takes a card from player hand and checks if is selectable by comparison to selected cards
    const state = netUtils.getState(myName);
    const currentPileTop = state.openCard[openCard.length - 1];
    const selectedCard = activePlayerMove["selected-cards"]; //object array of active cards [{}]
    if (
      selectedCard[0].name &&
      selectedCard[0].suit === currentPileTop[0].name &&
      currentPileTop[0].suit
    ) {
    }
    if (selectedCard.length > 1) {
    } else {
    }
  }

  function executeMove() {
    //looks at move player is trying to make and asks gameManager to perform
    /*{
            move: //"place" | "yaniv" | "assaf",
            cards: //activeCards | null
        }*/
  }

  function switchPlayer() {
    //myName = state.playerInturn;
  }

  
}
