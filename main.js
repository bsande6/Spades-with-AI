NUM_PLAYERS = 4;

main = function() {
    var screen = new GameScreen();
    // this serves as a method of keeping track of each player
    var h1 = new Hand();
    var h2 = new Hand();
    var h3 = new Hand();
    var h4 = new Hand();
    var handsList = [h1, h2, h3, h4];

    deck = new Deck();
    deck.shuffle();
    window.addEventListener('click', function(event) {
        var mousePos = screen.getMousePos(event);
    
        if (screen.isInside(mousePos)) {
           deck.dealCards(handsList);
           h1.sortHand()
           screen.displayHand(h1);
        }else{
            alert('clicked outside rect');
        }   
    }, false);
    
    
   
}

