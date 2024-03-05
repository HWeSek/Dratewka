export default class Player {
    constructor(locations) {
        this.position = { x: 7, y: 4 };
        this.hand = undefined;
        this.locations = locations;
        this.tp(7, 4)
    }

    tp(x, y) {
        this.locations[y][x].setLocation()
    }

    move(x, y, dir) {
        if (this.locations[this.position.y][this.position.x].directions.includes(dir)) {
            this.position.x += x
            this.position.y += y
            this.locations[this.position.y][this.position.x].setLocation()
            let hand = document.getElementById('hand')
            hand.innerText = 'You are carrying ';
            if (this.hand == undefined) {
                hand.innerText = 'You are carrying nothing...';
            } else {
                hand.innerText += this.hand;
            }
        }
    }
}