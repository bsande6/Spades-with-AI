class GameScreen {
    // this generates the starting display
    constructor() {
        var self = this
        this.canvas = document.querySelector('canvas')
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        this.image = new Image();
        this.images_src = new Array();
        this.images = this.loadImages();
        this.images[0].addEventListener('load', function() {
            self.ctx.drawImage(this, window.innerWidth/2 - 70, self.canvas.height/2-50, 100, 140);
            self.ctx.fillStyle = "black"
            self.ctx.font = "bold 20pt arial";
            self.ctx.textAlign = 'center';
            self.ctx.fillText("Deal", self.canvas.width/2-20, self.canvas.height/2);
            self.ctx.fillText("Cards", self.canvas.width/2-20, self.canvas.height/2+25)
            
          }, false);
        
        //used to track box position when user is prompted for another round
        this.continueGame = {
            x: this.canvas.width/2- 140,
            y: this.canvas.height/2 + 95,
            width: 300,
            height: 35
        };

        // tracks box position for when user is prompted to start a new game
        this.newGame = {
            x: this.canvas.width/2 - 140,
            y: this.canvas.height/2 + 145,
            width: 300,
            height: 35
        }

        this.rect = {
            x: this.canvas.width/2 - 1400,
            y: this.canvas.height/2-60,
            width: 120,
            height: 120
        };
    }

    getMousePos(evt) {
        var rect = this.canvas.getBoundingClientRect();
        return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
        };
    }

    isInside(pos, rect){
        return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+
        rect.height && pos.y > rect.y
    }

    // loops through players hand and finds and prints the associated image for the cards
    displayHand(player) {
        var hand = player.getHand();
        var card_num = 0.0
        
        for (var card in hand) {
            var img = this.determineImage(hand[card]);
            this.ctx.drawImage(img, window.innerWidth/2 + (card_num-1-hand.length/2)*20, window.innerHeight -140, 100, 140);
            card_num++;  
        }
    }
    clearHand(player) {
        var hand = player.getHand();
        var card_num = 0;
        console.log(hand.length)
        var hand_width =((hand.length)*20)+(CARD_WIDTH)
        console.log(hand_width)
            // 1 is added to hand length to account for removed card
            this.removeImage(window.innerWidth/2 + (0-(hand.length+1)/2)*20, window.innerHeight - 140, hand_width, 140);
            card_num++; 
    }

    determineImage(card) {
        var suit = card.getSuit();
        var value = card.getValue();
        
        // converts the suit and value to the form needed to identiy the associated image
        switch (value) {
            case "TWO":
                value = '2';
                break;
            case "THREE":
                value = '3';
                break;
            case "FOUR":
                value = '4'
                break;
            case "FIVE":
                value = '5'
                break;
            case "SIX":
                value = '6'
                break;
            case "SEVEN":
                value = '7';
                break;
            case "EIGHT":
                value = '8';    
                break;   
            case "NINE":
                value = '9';
                break;
            case "TEN":
                value = '10';
                break;
            case "JACK":
                value = 'J';
                break;
            case "QUEEN": 
                value = 'Q';
                break;
            case "KING":
                value = 'K';
                break;
            case "ACE": 
                value = 'A';
                break;
        }
        switch (suit) {
            case "CLUBS":
                suit = 'C';
                break;
            case "DIAMONDS": 
                suit = 'D';
                break;
            case "HEARTS":
                suit = 'H';
                break;
            case "SPADES": 
                suit = 'S';
                break;
        }
        var index = this.images_src.indexOf(value + suit)
        return this.images[index];
        
    }

    loadImages() {
        //var images_src = new Array();
        // adds images representing the cards
        this.images_src.push("blue_back")
        // adds images for clubs
        for (var i = 2; i <= 10; i++) {
            this.images_src.push(i + 'C');
        }
        this.images_src.push('JC', 'QC', 'KC', 'AC')
        // adds images represent 2-10 of diamonds
        for (var i = 2; i <= 10; i++) {
            this.images_src.push(i +'D');
        }
        this.images_src.push('JD', 'QD', 'KD', 'AD')
        // adds 2-10 of hearts
        for (var i = 2; i <= 10; i++) {
            this.images_src.push(i +'H');
        }
        this.images_src.push('JH', 'QH', 'KH', 'AH')
        // adds 2-10 of spades
        for (var i = 2; i <= 10; i++) {
            this.images_src.push(i +'S');
        }
        this.images_src.push('JS', 'QS', 'KS', 'AS')

        // loads all the images
    
        var images = new Array()
		for (var i = 0; i < this.images_src.length; i++) {
			images[i] = new Image()
			images[i].src = 'images/' + this.images_src[i] + '.png'
        }
        return images;
    }

    removeImage(xpos, ypos, width, height) {
        this.ctx.clearRect(xpos-20,ypos, width+20, height)
    }
    playCard(card, pos, angle) {
        var img = this.determineImage(card)
      
        this.ctx.save()
        this.ctx.translate(pos.x + card.width/2, pos.y + card.height/2)
        this.ctx.rotate(angle)
        this.ctx.translate(-pos.x - card.width/2, -pos.y - card.height/2)
        
        this.ctx.drawImage(img, pos.x, pos.y, card.width, card.height)
        this.ctx.restore();
    }
    /* Displays each players current tricks for the round
     * Param: p1Points: int representing wins for player 1
              p2Points: int representing wins for player 2, etc
    */
    displayScores(p1Points, p2Points, p3Points, p4Points) {
        this.ctx.fillStyle = "black"
        this.ctx.font = "bold 20pt arial";
        this.ctx.textAlign = 'center';
        this.ctx.clearRect(this.canvas.width/2 - this.canvas.width/3, this.canvas.height/2+ this.canvas.height/3, 100, -30);
        this.ctx.clearRect(this.canvas.width/2- this.canvas.width/3 ,this.canvas.height/2 - this.canvas.height/3, 100, -30)
        this.ctx.clearRect(this.canvas.width/2 + this.canvas.width/3, this.canvas.height/2 -  this.canvas.height/3, 100, -30)
        this.ctx.clearRect(this.canvas.width/2 + this.canvas.width/3, this.canvas.height/2 + this.canvas.height/3, 100, -30)
        this.ctx.fillText("Player 1: " + p1Points, this.canvas.width/2 - this.canvas.width/3, this.canvas.height/2+ this.canvas.height/3);
        this.ctx.fillText("Player 2: " + p2Points, this.canvas.width/2- this.canvas.width/3 ,this.canvas.height/2 - this.canvas.height/3)
        this.ctx.fillText("Player 3: " + p3Points, this.canvas.width/2 + this.canvas.width/3, this.canvas.height/2 -  this.canvas.height/3)
        this.ctx.fillText("Player 4: " + p4Points, this.canvas.width/2 + this.canvas.width/3, this.canvas.height/2 + this.canvas.height/3)
    }
    // Displays the total scores accumulated after each round
    displayTotalScores(p1TotalPoints, p2TotalPoints, p3TotalPoints, p4TotalPoints) {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
        this.ctx.textAlign = 'center'
        this.ctx.fillStyle = "black"
        this.ctx.font = "bold 20pt arial";
        this.ctx.textAlign = 'center';
        this.ctx.fillText("Player 1: " + p1TotalPoints, this.canvas.width/2, this.canvas.height/2 - 30);
        this.ctx.fillText("Player 2: " + p2TotalPoints, this.canvas.width/2 ,this.canvas.height/2)
        this.ctx.fillText("Player 3: " + p3TotalPoints, this.canvas.width/2, this.canvas.height/2 + 30)
        this.ctx.fillText("Player 4: " + p4TotalPoints, this.canvas.width/2, this.canvas.height/2 + 60)
        
    }
    // prompts user to play another round
    endGamePrompt() {
        this.ctx.fillText('Continue with another round or start new game?', this.canvas.width/2, this.canvas.height/2 + 90)
        this.ctx.fillStyle = 'white';
        this.ctx.rect(this.continueGame.x, this.continueGame.y, this.continueGame.width, this.continueGame.height);
        this.ctx.fill();
        this.ctx.rect(this.newGame.x, this.newGame.y, this.newGame.width, this.newGame.height);
        this.ctx.fill()
        this.ctx.textAlign = 'center'
        this.ctx.fillStyle = "black"
        this.ctx.font = "bold 20pt arial";
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Continue this game', this.canvas.width/2, this.canvas.height/2 + 120)
        this.ctx.fillText('Start new game', this.canvas.width/2, this.canvas.height/2 + 170)      
    }
}
 