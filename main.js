NUM_PLAYERS = 4;

main = function(canvas) {
    var playerList = [];
    for (var i = 0; i < NUM_PLAYERS; i++) {
        player = new Player(i + 1);
        playerList.push(player);
    }
    deck = new Deck();
    deck.shuffle();
   
}

