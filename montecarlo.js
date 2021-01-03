
class Node {
    constructor(parent, board, play, unexpandedMoves, playerNo, remainingCards) {
        this.play = play;
        //this.board = board;
        this.state = new State();
        this.state.setState(board)
        
        this.state.board.setRemainingCards(remainingCards)
      
        this.inc = 0;
        this.parent = parent;
        this.player = playerNo;
        this.unexpandedMoves = unexpandedMoves; 
        
        // sets up the tree
        this.children = new Map();
        var count = 0;
        if (this.state.board.board.length == 0) {
            playerNo = playerNo -1;
        }
        console.log(playerNo)

        for (let move of this.unexpandedMoves) {  
            var node = new Node(this, this.state.board , move, [], (playerNo + 1) % 4, this.state.board.remainingCards)
            node.state.board.addCard(move);
            console.log(node.state.board)
            this.children.set(count, { move: move, node: node})
            count++;
        }

       
        this.visits = 0;
        this.wins = 0;
        this.remainingPlays;
    }
    getState() {
        return this.state;
    }
    getChildArray() {
        return this.children;
    }
    addChildren(child) {          
        this.children.set(this.inc, {move: child.move, node: child})
        
        this.inc++;
    }
    isLeaf() {
        if (this.children == null) {
            return true;
        }
        return false;
    }
    isFullyExpanded() {
        
        for (let child of this.children.values()) {
            if (child === null) {
                return false
            }
          return true
        }
      
    }
    getAllLegalPlays(root) {
        var plays;
        if (this.player == root.player) {
            plays = this.unexpandedMoves
        }
        else {
            
            plays = this.state.board.remainingCards;
          
        }
        
        return plays;
        // constructs a list of all possible states from current state
    }
    getChildWithMaxScore() {
        let bestPlay;
        let max = -Infinity
       
        for (let child of this.children.values()) {
            
            if (child.node.visits > max) {
                bestPlay = child.move
                max = child.node.visits
                
           }
        }
        return bestPlay
    }
    // setters and getters
}

class Tree {
    constructor() {
        this.root = new Node();
    }
    getRoot() {
        return this.root;
    }
}

class State {
    constructor() {
        this.board;
        //this.playerNo;
        var visitCount;
        this.winner = null
        this.winScore;
    }
    setState(board) {
      
        this.board = _.cloneDeep(board)
        /*console.log(JSON.stringify(board.remainingCards));
        this.board.
        Object.assign
        this.board.setBoard(board.board)
        this.board.addCard("as")
        console.log(this.board)
        this.board.setLastPlay(board.setLastPlay)
        console.log(JSON.stringify(board));*/
      
    }
    setPlayerNo(playerNo) {
        this.playerNo = playerNo;
    }
    setVisitCount() {

    }
    setWinScore() {

    }
    getVisitCount() {
        return this.visitCount;
    }


    // copy constructor, getters, and setters

   
    randomPlay() {
        /* get a list of all possible positions on the board and 
           play a random move */
    }
}

class MonteCarloTreeSearch {
    constructor() {
        var level;
        var opponent;
    }

    selectPromisingNode(rootNode) {
        var node = rootNode;
        var uct = new UCT()
      
        while (node.isFullyExpanded() && !node.isLeaf()) {
            node = uct.findBestNodeWithUCT(node);
            
        }
        return node;
    }
    expandNode(node, root) {
        
        var possibleStates = node.getAllLegalPlays(root);
       
        for (var state of possibleStates) {
            
            var newNode = new Node(node, node.state.board, state, [], (node.player +1) %4, node.state.board.remainingCards);
            //newNode.setParent(node);
            //newNode.getState().setPlayerNo(node.getState().getOpponent());
            node.addChildren(newNode);
        }
    }
    simulateRandomPlayout(node, rootNode, hand) {
        //node.state.board.addCard(node.play)
        //console.log(node.play)
        var simHand = _.cloneDeep(hand)
        var tempBoard = _.cloneDeep(node.state.board)
        simHand.removeCard(node.play)
        //var simHand = playableCards;
        var tricksWon = 0;
        //let plays = _.cloneDeep(node.getAllLegalPlays(rootNode));
        let plays = _.cloneDeep(node.state.board.remainingCards);
       
        var turn = node.player;
        console.log(node.state.board.board.length)
        if (node.state.board.lastPlay != null) {
            turn = (node.state.board.lastPlay.player + 1) % 4
        }
        
        var currentPlayerPlays;
        
        console.log(node.state.board)
        console.log(turn)
        // simulates a random game and records the number of tricks won
        while(plays.length > 0 || simHand.getHand().length > 0) {
            
            var play;
            if (turn % 4 == rootNode.player) {
                console.log('a')
                currentPlayerPlays = simHand.getPlayableCards(node.state.board);
                play = currentPlayerPlays[Math.floor(Math.random() * currentPlayerPlays.length)];
                simHand.getHand().splice(simHand.getHand().indexOf(play), 1)
            } 
            else {
                console.log('b')   
                play = plays[Math.floor(Math.random() * plays.length)]
                plays.splice(plays.indexOf(play), 1)
                
            } 
            console.log(plays)
            console.log(JSON.stringify(simHand.hand))
            play.player = turn
            tempBoard.addCard(play)
            turn++;
            
            if (node.state.board.board.length == 4) {
                var winner = node.state.board.trickWinner();
                node.state.board.clearBoard();
                if (isNaN(winner.player)) {
                    winner.player = node.state.board.board.indexOf(winner)
                }
                if (winner.player == rootNode.player) {
                    tricksWon = tricksWon + 1;
                   
                }
                turn = winner.player
            }
            turn = turn % 4
           
        }
        return tricksWon;
    }

    backPropogation(node, wins) {
        while (node != null) {
           
            node.visits += 13
            node.wins += wins
            node = node.parent
        }
    }
}

class UCT {
    constructor() {
    }

    uctValue(node) {
        if (node.visits == 0) {
           
            return Number.MAX_SAFE_INTEGER;
        }
        
    
        return ((node.wins / node.visits) 
              + 1.41 * Math.sqrt(Math.log(node.parent.visits) / node.visits));
    }
    
    findBestNodeWithUCT(node) {
        var plays = node.getChildArray().values();
       
        var bestPlay;
        var bestUCB1 = -Infinity
        for (var play of plays) {
            
            var ucb1 = this.uctValue(play.node);
            
            if (ucb1 > bestUCB1) {
                
               bestPlay = play.node;
               bestUCB1 = ucb1;
           }
        }
        
        return bestPlay;
    }
    comparator(a, b) {
        return a -b;
    }
  
}

