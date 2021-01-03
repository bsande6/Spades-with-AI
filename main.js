NUM_PLAYERS = 4;

main = function() {
    //setTimeout(gameloop, 10000);
    var screen = new GameScreen();
    // this serves as a method of keeping track of each player
    var h1 = new Hand(window.innerWidth/2 - 60,
        window.innerHeight/2+30, 0);
    var h2 = new Hand(window.innerWidth/2 - 180,
        window.innerHeight/2 -50, Math.PI/2);
    var h3 = new Hand(window.innerWidth/2 - 60,
        window.innerHeight/2-120, Math.PI);
    var h4 = new Hand(window.innerWidth/2 + 60,
        window.innerHeight/2-50, -Math.PI/2);
    var handsList = [h1, h2, h3, h4];
    
    
    var deck = new Deck();
    var gameBoard = new GameBoard();
    gameBoard.setRemainingCards(_.cloneDeep(deck.cards))
   
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
        // ensures it will always be a correct turn for the number of players
        turn = turn % handsList.length
        var playerTurn = handsList[turn];
       // for (var round = 0; round <= 13; round++) {
        function choosecard(event) {
            var mousePos = screen.getMousePos(event);
            // array to keep track of where each card is positioned on screen
            var cards = [];
            for (var i=0; i<h1.hand.length; i++) {
                var card = {
                    x: window.innerWidth/2 + (i-(h1.hand.length/2))*20,
                    y: window.innerHeight - 140,
                    width: 20,
                    height: 140
                };
                cards.push(card)
              //  var card1 = {
                //    x: window.innerWidth/2 + (1-(h1.hand.length/2))*20,
                  //  y: window.innerHeight - 140,
                    //width: 20,
                    //height: 140
                //};
            
            }
            console.log(cards[0])
            
            function getSelectedCard(mousePos, cards) {
                
                for (var i = 0; i < cards.length; i++) {
                    console.log(mousePos, cards[i])
                    if (screen.isInside(mousePos, cards[i])) {
                        if (h1.getPlayableCards(gameBoard).includes(h1.hand[i])) {
                            return h1.hand[i];
                        }
                        else {
                            alert("Illegal Play")
                        }
                    }
                }
                return null;
            }
            var card = getSelectedCard(mousePos, cards)
            if (card) {
                gameBoard.addCard(card)
                screen.playCard(card, h1.play_pos, 0);
                         
                var element = gameBoard.remainingCards.find(element => element.sort_pos == card.sort_pos);
                var remainingCards = gameBoard.remainingCards;
                
                remainingCards.splice(remainingCards.indexOf(element), 1)
                gameBoard.setRemainingCards(remainingCards)
                console.log('a')
                setTimeout(function() {
                    screen.clearHand(h1)
                    screen.displayHand(h1)
                }, 10);
                
                //screen.removeImage(window.innerWidth/2 + (0-h1.hand.length/2))*20, window.innerHeight - 140, 20, 140)
                window.removeEventListener('click', choosecard, false)
                h1.removeCard(card);
                
                if (gameBoard.board.length == 4) {
                    turn = resetBoard();
                }
                else {
                    turn = turn+1;
                }
                setTimeout(function() {
                    gameloop(turn)
                }, 2000)
            }
        }
           
         
            // checks for human turn  
        if (playerTurn == h1) {        
            window.addEventListener('click', choosecard, false);    
        }
        else {
            var bestCard = playerTurn.findNextMove(gameBoard, turn);
            console.log(playerTurn.hand)
            console.log(bestCard)
            playerTurn.removeCard(bestCard);
            console.log(playerTurn.hand)
            gameBoard.addCard(bestCard);
            screen.playCard(bestCard, (handsList[turn].play_pos), handsList[turn].rotation);
            var element = gameBoard.remainingCards.find(element => element.sort_pos == bestCard.sort_pos);
            var remainingCards = gameBoard.remainingCards;
           
            remainingCards.splice(remainingCards.indexOf(element), 1)
            gameBoard.setRemainingCards(remainingCards)
          
            
            if (gameBoard.board.length == 4) {
                turn = gameBoard.trickWinner().player;
                console.log(turn)
                // resets board after final card has been drawn on screen
                setTimeout(function() {
                    resetBoard()
                }, 1500)
                
            }
            else {
                turn = turn + 1;
            }
            
            setTimeout(function() {
                gameloop(turn)
            }, 2000)
         
        }
       
        function resetBoard() {
            // determines trick winner and resets
            if (gameBoard.board.length == 4) {
                var winningCard = gameBoard.trickWinner();
                var winner = handsList[winningCard.player];
                winner.incrementTricksWon();
                gameBoard.clearBoard();
                screen.removeImage(h1.play_pos.x, h1.play_pos.y, h1.hand[0].width, h1.hand[0].height)
                // card height and width are switched to account for rotation
                screen.removeImage(h2.play_pos.x - 20, h2.play_pos.y + 20, h2.hand[0].height, h2.hand[0].width)
                screen.removeImage(h3.play_pos.x, h3.play_pos.y, h3.hand[0].width, h3.hand[0].height)
                screen.removeImage(h4.play_pos.x - 20, h4.play_pos.y+20, h4.hand[0].height, h4.hand[0].width)
            
                return winningCard.player;
            }
        } 
    }  
}

