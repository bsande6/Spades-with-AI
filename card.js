class Card {
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
        this.height = 140;
        this.width = 100;
        this.player;
        this.sort_pos = this.setSortPosition();
    }
    getSuit() {
        return this.suit;
    } 
    getValue() {
        return this.value;
    }
    setSortPosition() {
        var suit_pos;
        var val_pos;
        switch (this.suit) {
            case "CLUBS":
                suit_pos = 0;
                break;
            case "DIAMONDS":
                suit_pos = 13;
                break;
            case "HEARTS":
                suit_pos = 26;
                break;
            case "SPADES":
                suit_pos = 39;
                break;
        }
        switch (this.value) {
            case "TWO":
                val_pos = 0;
                break;
            case "THREE":
                val_pos = 1;
                break;
            case "FOUR":
                val_pos = 2
                break;
            case "FIVE":
                val_pos = 3
                break;
            case "SIX":
                val_pos = 4
                break;
            case "SEVEN":
                val_pos = 5;
                break;
            case "EIGHT":
                val_pos = 6;  
                break;     
            case "NINE":
                val_pos = 7;
                break;
            case "TEN":
                val_pos = 8;
                break;
            case "JACK":
                val_pos = 9;
                break;
            case "QUEEN": 
                val_pos = 10;
                break;
            case "KING":
                val_pos = 11;
                break;
            case "ACE": 
                val_pos = 12;
                break;
        }
        return (val_pos + suit_pos);
    }
    getSortPos() {
        return this.sort_pos;
    }
}