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
            self.ctx.fillText("Deal Cards", self.canvas.width/2-20, self.canvas.height/2);
            
          }, false);
        
        //used to track mouse location
        var mouse = {
            x: undefined,
            y: undefined
        };

        this.rect = {
            x: this.canvas.width/2 - 60,
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

    isInside(pos){
        return pos.x > this.rect.x && pos.x < this.rect.x+this.rect.width && pos.y < this.rect.y+
        this.rect.height && pos.y > this.rect.y
    }

    displayHand(player) {
        // loops through players hand and call function to find associated image for the cards
        var hand = player.getHand();
        var index;
        var card_num = 0;
        console.log(hand)
        for (var card in hand) {
            index = this.determineImage(hand[card]);
            console.log(index)
            this.ctx.drawImage(this.images[index], window.innerWidth/2 + card_num*20, window.innerHeight -140, 100, 140);
            card_num++;  
        }
    }

    determineImage(card) {
        console.log(card)
        var suit = card.getSuit();
        var value = card.getValue();
        console.log(value)
        
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
            case "EIGHT":
                value = '8';       
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
        console.log(this.images_src)
        console.log(suit)
        return this.images_src.indexOf(value + suit)
        
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
        console.log(images)
        return images;
    }
}
