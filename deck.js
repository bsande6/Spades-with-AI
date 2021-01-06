//var Message = require('./card_enum.ts').Message;

class Deck {
  constructor() {
    this.cards = [];
    for (var s in Suit) {
      for (var v in Value) {
        this.cards.push(new Card(v,s));
      }
    }
  }

  // shuffles the deck
  shuffle() {
    var j = 0,
    temp = null
    for (var i = this.cards.length- 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1))
      temp = this.cards[i]
      this.cards[i] = this.cards[j]
      this.cards[j] = temp
    }
  }
  
  dealCards(players) {
    while (this.cards.length > 0) {
        for (var i = 0; i < players.length; i++) {
          var card = this.cards.pop()
          players[i].addCard(card);
          card.player = i;
        }
    }
  }
}
