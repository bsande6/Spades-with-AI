class Player {
    constructor(name) {
        this.name = name;
        this.hand = new Hand();
    }

    play_card() {
        this.hand.remove_card()
    }
    
    get_hand() {
        return this.hand;
    }
}