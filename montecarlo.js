
class Node {
    constructor(parent, board, play, unexpandedMoves, playerNo) {
        this.play = play;
        //this.board = board;
        
        this.state = new State();
        this.state.setBoard(board)
        
        this.parent = parent;
        this.player = playerNo;
        this.unexpandedMoves = unexpandedMoves; 
        
        // sets up the tree
        this.children = new Map();
        var count = 0;
        
        for (let move of this.unexpandedMoves) {
            console.log(unexpandedMoves)
            
            var node = new Node(this, this.state.board , move, [], (playerNo + 1) % 4);
            console.log(node)
            node.state.board.addCard(move);
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
    addChildren(childList) {
        this.children = childList;
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
            console.log(this.state.board)
            plays = this.state.board.remainingCards;
        }
        
        return plays;
        // constructs a list of all possible states from current state
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
        this.board = new GameBoard();
        //this.playerNo;
        var visitCount;
        this.winner = null
        this.winScore;
    }
    setBoard(board) {
        this.board.setRemainingCards(board.remainingCards);
        this.board.setBoard(board.board)
        this.board.setLastPlay(board.setLastPlay)
      
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
        console.log(possibleStates)
        for (var state in possibleStates) {
            console.log('a')
            var newNode = new Node(node, node.state, state, [], (node.player +1) %4);
            //newNode.setParent(node);
            //newNode.getState().setPlayerNo(node.getState().getOpponent());
            console.log(node)
            node.addChildren(newNode);
        }
    }
    simulateRandomPlayout(node, rootNode) {
        // simulates a random game and records the number of tricks won
        while(node.state.winner == null) {
            
            let plays = node.getAllLegalPlays(rootNode);
            
            let play = plays[Math.floor(Math.random() * plays.length)]
            state = this.game.nextState(state, play)
            winner = this.game.winner(state)
            if (this.state.board.length == 4) {
                this.state.board.trickWinner();
            }
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
              + 1.41 * Math.sqrt(Math.log(node.parent.visits) / node.visit));
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

