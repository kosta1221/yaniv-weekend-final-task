"use strict"
const netUtils = {
    getWaitingGames() {

    },
    createGame() {

    },
    joinGame() {

    },
    getGameStateForPlayer(playerIdentity) {
        //fetch()
        const pd = new PileDeck();
        pd.createNewFullDeck();
        const state = {
            playersPoints: {
                "alon": 30,
                "koren": 15
            },
            playersCardNumbers: {
                "alon": 5,
                "koren": 3,
                "kosta": 1,
                "dvir": 2
            },
            cards: [new Card("hearts", "jack", false), new Card("clubs", "king", false)],
            pileDeck: pd,
            playerInTurn: "alon",
            playerNames: ["alon", "koren", "kosta", "dvir"]
        }
        return state;

    },
    play() {

    }
}