NUM_PLAYERS = 4;

main = function() {
    var screen = new GameScreen();
    // this serves as a method of keeping track of each player
    var h1 = new Hand(window.innerWidth/2 - 60,
        window.innerHeight/2-80);
    var h2 = new Hand(window.innerWidth/2 - 20,
        window.innerHeight/2-60);
    var h3 = new Hand(window.innerWidth/2 - 60,
        window.innerHeight/2-10);
    var h4 = new Hand(window.innerWidth/2 - 10,
        window.innerHeight/2-60);
    var handsList = [h1, h2, h3, h4];
    
    
    var deck = new Deck();
    var board = new GameBoard();
    deck.shuffle();
    function onclick(event) {
        var mousePos = screen.getMousePos(event);
        var rect = {
            x: window.innerWidth/2 - 60,
            y: window.innerHeight/2-60,
            width: 120,
            height: 120
        };
    
        if (screen.isInside(mousePos, rect)) {
           deck.dealCards(handsList);
           h1.sortHand()
           screen.displayHand(h1);
           screen.removeImage(window.innerWidth/2 - 70, window.innerHeight/2-50, 100, 140)
           window.removeEventListener('click', onclick, false);
           gameloop(0);
        }else{
            alert('clicked outside rect');
        }   
    }

    window.addEventListener('click', onclick, false);
    function gameloop(turn) {
        
        var round = 0;
        var playerTurn = handsList[turn];
       // for (var round = 0; round <= 13; round++) {
            function choosecard(event) {
                var mousePos = screen.getMousePos(event);
                var card0 = {
                x: window.innerWidth/2 + (0-7)*20,
                y: window.innerHeight - 140,
                width: 20,
                height: 140
                };
                if (screen.isInside(mousePos, card0)) {
                    h1.removeCard(h1.hand[0]);
                    board.addCard(h1.hand[0])
                    
                    screen.playCard(h1.getHand()[0], h1.play_pos);
                    screen.removeImage(window.innerWidth/2 + (0-7)*20, window.innerHeight - 140, 20, 140)
                    window.removeEventListener('click', choosecard, false)
                    var next = turn+1;
                    gameloop(next)
                }
            }
            // checks for human turn
            
            if (playerTurn == h1) {
                
                window.addEventListener('click', choosecard, false);
                
            }
            else {
              
                var bestCard = playerTurn.findNextMove(board, 1);
                playerTurn.removeCard(bestCard);
            }
     //   }
    } 
}

