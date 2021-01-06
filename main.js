NUM_PLAYERS = 4;

main = function() {
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
    var gameBoard;
    var screen;
    var deck;
    
    startGame();
    
    function startGame() {
        screen = new GameScreen();
        deck = new Deck();
        gameBoard = new GameBoard();
        gameBoard.setRemainingCards(_.cloneDeep(deck.cards))
    
        deck.shuffle();
        screen.displayScores(h1.getTricksWon(), h2.getTricksWon(), h3.getTricksWon(), h4.getTricksWon())
        
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
            }
        }
        

        window.addEventListener('click', onclick, false);
    }
    /* Loops through each round of game through recursion
     * Param: turn - int between 0 and number of players-1 which is used to determine the current move
    */
    function gameloop(turn) {
        function nextRound(event) {
            var mousePos = screen.getMousePos(event);
            
            if (screen.isInside(mousePos, screen.continueGame)) {
                console.log('a')
                
            
                window.removeEventListener('onclick', nextRound, false)
                startGame()
            }
            else if (screen.isInside(mousePos, screen.newGame)) {
                for (var hand of handsList) {
                    hand.totalScore = 0;
                }
                window.removeEventListener('onclick', nextRound, false)
                startGame()
               
            }
        }
        
        // ensures it will always be a correct turn for the number of players
        turn = turn % handsList.length
        var playerTurn = handsList[turn];

       /* checks if human mouseclick chooses a card to play
        * param: event - leftmouseclick event
        */
        function choosecard(event) {
            var mousePos = screen.getMousePos(event);
            // array to keep track of where each card is positioned on screen
            var cards = [];
            for (var i=0; i<h1.hand.length; i++) {
                var card = {
                    x: window.innerWidth/2 + (i-1-(h1.hand.length/2))*20,
                    y: window.innerHeight - 140,
                    width: 20,
                    height: 140
                };
                // accounts for extra space on last card shown in hand
                if (i == h1.hand.length - 1) {
                    card.width = h1.hand[i].width - card.width 
                }
                cards.push(card)
            }
            
            
            function getSelectedCard(mousePos, cards) {
                
                for (var i = 0; i < cards.length; i++) {
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

                setTimeout(function() {
                    screen.clearHand(h1)
                    screen.displayHand(h1)
                }, 10);
                
                window.removeEventListener('click', choosecard, false)
                h1.removeCard(card);
                
                if (gameBoard.board.length == 4) {
                    turn = gameBoard.trickWinner().player;
                    
                    // resets board after final card has been drawn on screen
                    setTimeout(function() {
                        resetBoard()
                        setTimeout(function() {
                            if (h1.hand.length != 0) {
                                gameloop(turn)
                            }
                        }, 1000)
                        
                   
                    // checks hand to see if there are any cards remaining to be played
                        if (h1.hand.length == 0) {
                            screen.displayTotalScores(h1.totalScore, h2.totalScore, h3.totalScore, h4.totalScore);
                            for (var hand in handsList) {
                                hand.tricksWon = 0;
                            }
                            screen.endGamePrompt()
                            window.addEventListener('click', nextRound, false);
                            //main();
                        }
                    }, 1500)
                }
                else {
                    turn = turn + 1;
                    setTimeout(function() {
                        gameloop(turn)
                    }, 1500)
                }             
            }
        }
            // checks for human turn  
        if (playerTurn == 6) {        
            window.addEventListener('click', choosecard, false);    
        }
        else {
            var bestCard = playerTurn.findNextMove(gameBoard, turn);
            gameBoard.addCard(bestCard);
            screen.playCard(bestCard, (handsList[turn].play_pos), handsList[turn].rotation);
            playerTurn.removeCard(bestCard);
            var element = gameBoard.remainingCards.find(element => element.sort_pos == bestCard.sort_pos);
            var remainingCards = gameBoard.remainingCards;
           
            remainingCards.splice(remainingCards.indexOf(element), 1)
            gameBoard.setRemainingCards(remainingCards)
          
            
            if (gameBoard.board.length == 4) {
                turn = gameBoard.trickWinner().player;
                
                // resets board after final card has been drawn on screen
                setTimeout(function() {
                    resetBoard()
                    setTimeout(function() {
                        if (h1.hand.length != 0) {
                            gameloop(turn)
                        }
                    }, 1000)
                    
               
                // checks hand to see if there are any cards remaining to be played
                    if (h1.hand.length == 0) {
                        screen.displayTotalScores(h1.totalScore, h2.totalScore, h3.totalScore, h4.totalScore);
                       
                            for (var hand of handsList) {
                                
                                hand.tricksWon = 0;
                            }
                        screen.endGamePrompt()
                        window.addEventListener('click', nextRound, false);
                        //main();
                    }
                }, 1500)
            }
            else {
                turn = turn + 1;
                setTimeout(function() {
                    gameloop(turn)
                }, 1500)
            }              
        }
        // determines trick winner and resets the board
        function resetBoard() {
            if (gameBoard.board.length == 4) {
                var winningCard = gameBoard.trickWinner();
                var winner = handsList[winningCard.player];
                winner.incrementTricksWon();
                gameBoard.clearBoard();
                screen.removeImage(h1.play_pos.x, h1.play_pos.y, CARD_WIDTH, CARD_HEIGHT)
                // card height and width are switched to account for rotation
                screen.removeImage(h2.play_pos.x - 20, h2.play_pos.y + 20, CARD_HEIGHT, CARD_WIDTH)
                screen.removeImage(h3.play_pos.x, h3.play_pos.y, CARD_WIDTH, CARD_HEIGHT)
                screen.removeImage(h4.play_pos.x - 20, h4.play_pos.y+20, CARD_HEIGHT, CARD_WIDTH)
                screen.displayScores(h1.tricksWon, h2.tricksWon, h3.tricksWon, h4.tricksWon)
                return winningCard.player;
            }
        } 
    }  
}

