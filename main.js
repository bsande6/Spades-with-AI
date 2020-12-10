NUM_PLAYERS = 4;

main = function() {
    var screen = new GameScreen();
    var playerList = [];
    for (var i = 0; i < NUM_PLAYERS; i++) {
        player = new Player(i + 1);
        playerList.push(player);
    }
    deck = new Deck();
    deck.shuffle();
    window.addEventListener('click', function(event) {
        var mousePos = screen.getMousePos(event);
        console.log(mousePos)
        console.log(mousePos.x)
    
        if (screen.isInside(mousePos)) {
           deck.dealCards(playerList)
        }else{
            alert('clicked outside rect');
        }   
    }, false);
    
   
}

