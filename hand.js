class Hand {
    constructor () {
        this.hand = new Array();
    }

    addCard(c) {
        this.hand.push(c);
    }

    removeCard () {
        
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
}