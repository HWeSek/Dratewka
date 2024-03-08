import { Ui } from "./Ui.js";

export default class Player {
    constructor(locations, items) {
        this.position = { x: 7, y: 4 };
        this.hand = undefined;
        this.locations = locations;
        this.items = items;
        this.tp(7, 4)
    }

    tp(x, y) {
        this.locations[y][x].setLocation()
    }
    hand_display() {
        const hand = document.getElementById('hand')
        hand.innerText = 'You are carrying ';
        if (this.hand == undefined) {
            hand.innerText = 'You are carrying nothing...';
        } else {
            hand.innerText += (" " + this.hand.label);
        }
    }
    move(x, y, dir) {
        if (this.locations[this.position.y][this.position.x].directions.includes(dir)) {
            this.position.x += x
            this.position.y += y
            this.locations[this.position.y][this.position.x].setLocation()
            this.hand_display()
        }
    }

    take(item) {
        if (this.hand == undefined) {
            if (item.position.x == this.position.x && item.position.y == this.position.y) {
                this.hand = item;
                this.hand_display()
                let target_loc;
                for (let loc of this.locations.flat()) {
                    try {
                        if (loc.position.x === this.position.x && loc.position.y === this.position.y) {
                            target_loc = loc;
                        }
                    } catch (error) {

                    }
                }
                target_loc.removeItem(item)
            }
        }
        else {
            Ui.infoBar('Your hands are full!!!')
        }
    }
}