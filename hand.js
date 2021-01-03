class Hand {
    constructor (xpos, ypos, rotation) {
        this.hand = [];
        this.play_pos = {
            x: xpos,
            y: ypos
        };
        this.rotation = rotation
        this.tricksWon = 0;
    }

    addCard(c) {
        this.hand.push(c);
    }

    removeCard(c) {
        console.log(c)
        this.hand.splice(this.hand.indexOf(c),1)
        console.log(this.hand)
    }
    getHand() {
        return this.hand;
    }
    sortHand() {
        var to_sort = [];
        var suit_pos = 0;
        var value = 0;
        
        for (var i = 0; i < this.hand.length; i++) {
            var card = this.hand[i];
            to_sort.push(card.getSortPos());
            this.quickSort(to_sort, 0, to_sort.length-1)
        }
    }
    quickSort(array, low, high) {
        // min and max index
        if (low < high) {
            /* pi is partitioning index, array[pi] is now
            at right place */
            var pi = this.partition(array, low, high);
            // Before pi
            this.quickSort(array, low, pi - 1); 
            // After pi 
            this.quickSort(array, pi + 1, high);
        }
    }
    partition(arr, low, high) {
        //chooses last element as pivot
        var pivot = arr[high]
        var i =low-1;
        for (var j = low; j <= high- 1; j++) {
        // If current element is smaller than the pivot
            if (arr[j] < pivot) {
                // increment index of smaller element
                i++;
                this.swap(arr, i ,j);
                this.swap(this.hand, i, j);    
            }
        }
        this.swap(arr, i+1 ,high);
        this.swap(this.hand, i+1, high);
        
        return (i + 1)
    }
    swap (arr, i, j) {
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp
    }
    getPlayableCards(board) {
        var suit = board.getRequiredSuit();
        var contains = this.hand.filter(function(obj) {
            return obj.suit == suit;
        })
       
        if (contains.length > 0) {
            return contains;
        }
        else {
            return this.hand
        }
    }

    findNextMove(board, playerNo) {
        // define an end time which will act as a terminating condition
        console.log(board)
        var simulations = 100;
        var cards = this.hand
        //var remainingCards = board.remainingCards
        var remainingCards = _.cloneDeep(board.remainingCards)
        console.log(cards)
        // removes the cards in players hand and on board from remaininCards
        for (var card of cards) {
            var element = remainingCards.find(element => element.sort_pos == card.sort_pos);
            if (element) {
                remainingCards.splice(remainingCards.indexOf(element), 1)
            }
        }
        
        console.log(remainingCards)
     
        var rootNode = new Node(null, board, board.getLastPlay(), this.getPlayableCards(board), playerNo, remainingCards);
       
       // rootNode.state.board.setBoard(board, remainingCards);
        //rootNode.state.board.setRemainingCards(remainingCards)
 
        
        //var rootNode = tree.getRoot();
        //rootNode.getState().setBoard(board);
        //rootNode.getState().setPlayerNo(opponent);

        //rootNode.setChildArray(this.getPlayableCards(board));
        var treeSearch = new MonteCarloTreeSearch();
        

        var i = 0;
        while (i < simulations) {
            
            var promisingNode = treeSearch.selectPromisingNode(rootNode);
            console.log(promisingNode, i)
            //if (promisingNode.getState().getBoard().checkStatus() 
              //== Board.IN_PROGRESS) {
            
            treeSearch.expandNode(promisingNode, rootNode);
            //}
            var nodeToExplore = promisingNode;
            if (promisingNode.getChildArray().length > 0) {
                nodeToExplore = promisingNode.getRandomChildNode();
            }
            
            var playoutResult = treeSearch.simulateRandomPlayout(nodeToExplore, rootNode, this);
            treeSearch.backPropogation(nodeToExplore, playoutResult);
            i++;
        }

        var winner = rootNode.getChildWithMaxScore();
     
        return winner;
    }
    incrementTricksWon() {
        this.tricksWon++;
    }
}