// this class represent the cards that are currently in play
class GameBoard {
    constructor() {
        this.board = [];
        this.remainingCards;
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
        ///var element = this.remainingCards.find(element => element.sort_pos == card.sort_pos);
        //this.remainingCards.splice(this.remainingCards.indexOf(element), 1)
    }
    
    clearBoard() {
        var length = this.board.length;
        for (var i = 0; i < length; i++) {
            this.board.pop()
        }
        this.board.lastPlay = null;
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
        for (var i = 1; i < this.board.length; i++) {
            // case one same suit 
            if (this.board[i].suit == startingSuit) {
                if (this.board[i].sort_pos >= winner.sort_pos) {
                    
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
        return winner 
    }
}