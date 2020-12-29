// this class represent the cards that are currently in play
class GameBoard {
    constructor() {
        this.board = [];
        this.remainingCards = new Deck();
        this.lastPlay;
    }
    setBoard(board) {
        this.board = board
    }
    setLastPlay(lastPlay) {
        this.lastPlay = lastPlay
    }
    addCard(card) {
        this.board.push(card)
        this.lastPlay = card;
    }
    clearBoard() {
        for (var i = 0; i < this.board.length; i++) {
            this.board.pop()
        }
    }
    setRemainingCards(cards) {
        this.remainingCards = cards
    }
    getBoard() {
        return this.board
    }
    getRequiredSuit() {
        if (this.board.length > 0) {
            return this.board[0].suit;
        }
    }
    getLastPlay() {
        return this.lastPlay;
    }
    trickWinner() {
        // initialize winner to first play
        var winner = this.board[0];
        var startingSuit = this.board[0].suit;
        for (var i =0; i < this.board.length; i++) {
            // case one same suit 
            if (this.board[i].suit == startingSuit) {
                if (this.board[i].value >= winner.value) {
                    winner = this.board[i];
                }
            }
            // case two: starting suit is nonspades and play is spades
            else {
                if (this.board[i].suit == "SPADES" && winner.suit != "SPADES") {
                    winner = this.board[i]
                }
            }
        }
        return this.board 
    }
}