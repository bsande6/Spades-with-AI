class GameScreen {
    constructor() {
        this.canvas = document.querySelector('canvas')
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.fillRect(100, 100, 100, 100);

        var mouse = {
            x: undefined,
            y: undefined
        };

        this.rect = {
            x: 100,
            y: 100,
            width: 100,
            height: 100
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
        console.log(this.rect.x)
        return pos.x > this.rect.x && pos.x < this.rect.x+this.rect.width && pos.y < this.rect.y+
        this.rect.height && pos.y > this.rect.y
    }
}
