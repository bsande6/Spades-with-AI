var canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

var rect = ctx.fillRect(100, 100, 100, 100);

window.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);

    if (isInside(mousePos,rect)) {
       deck.deal_cards(playerList)
    }else{
        alert('clicked outside rect');
    }   
}, false);
