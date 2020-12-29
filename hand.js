class Hand {
    constructor (xpos, ypos) {
        this.hand = new Array();
        this.play_pos = {
            x: xpos,
            y: ypos
        };
    }

    addCard(c) {
        this.hand.push(c);
    }

    removeCard(c) {
        this.hand.pop(c)
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
        var simulations = 50;
        var opponent = playerNo;
        cards = 
        board.setRemainingCards(cards)
        var rootNode = new Node(null, board, board.getLastPlay(), this.getPlayableCards(board), playerNo);
        rootNode.state.setBoard(board);
        //var rootNode = tree.getRoot();
        //rootNode.getState().setBoard(board);
        //rootNode.getState().setPlayerNo(opponent);

        //rootNode.setChildArray(this.getPlayableCards(board));
        var treeSearch = new MonteCarloTreeSearch();
        

        var i = 0;
        while (i < simulations) {
            var promisingNode = treeSearch.selectPromisingNode(rootNode);
            //if (promisingNode.getState().getBoard().checkStatus() 
              //== Board.IN_PROGRESS) {
            treeSearch.expandNode(promisingNode, rootNode);
            //}
            var nodeToExplore = promisingNode;
            if (promisingNode.getChildArray().length > 0) {
                nodeToExplore = promisingNode.getRandomChildNode();
            }
            var playoutResult = treeSearch.simulateRandomPlayout(nodeToExplore, rootNode);
            backPropogation(nodeToExplore, playoutResult);
            i++;
        }

        var  winnerNode = rootNode.getChildWithMaxScore();
        tree.setRoot(winnerNode);
        return winnerNode.getState().getBoard();
    }
}