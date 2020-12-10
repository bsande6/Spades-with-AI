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

  shuffle() {
    var i = 0,
    j = 0,
    temp = null
    
    for (i = this.cards[i].length- 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1))
      temp = array[i]
      this.cards[i] = cards[j]
      this.cards[j] = temp
    }
  }
  deal_cards(players) {
    console.log(players)
    console.log(this.cards.pop())
    while (this.cards.length > 0) {
        for (var i in players.length) {
          players[i].get_hand().add_card(this.cards.pop());
        }
    }
  }
}
