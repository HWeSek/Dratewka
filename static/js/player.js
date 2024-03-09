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
            console.log(this.position);
        }
    }

    take(item) {
        if(item != undefined){
            if(item.flag === 1){
                if(item.position != 'player'){
                    if (item.position.x == this.position.x && item.position.y == this.position.y) {
                        if (this.hand == undefined) {
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
                            console.log(target_loc);
                            target_loc.removeItem(item)
                            item.position = 'player';
                            this.hand_display()
                        } else {
                            Ui.infoBar('Your hands are full!!!')
                        }
                    }
                }else{
                    Ui.infoBar('You are holding that item already!')
                }
            }else{
                Ui.infoBar("You can't take that item!")
            }
        }else{
            Ui.infoBar('There is nothing like that here!')
        }
    }

    drop(item){
        if(item != undefined){
            if(this.hand == item){
                let target_loc;
                for (let loc of this.locations.flat()) {
                    try {
                        if (loc.position.x === this.position.x && loc.position.y === this.position.y) {
                            target_loc = loc;
                        }
                    } catch (error) {
                    }
                }
                console.log(target_loc);
                if(target_loc.dropValidate(item)){
                    item.position = this.position;
                    this.hand = undefined;
                    target_loc.items.push(item);
                    target_loc.setLocation()
                    this.hand_display()
                }else{
                    Ui.infoBar("You can't drop this item here!")
                }
            }else{
                Ui.infoBar("You don't have that item!")
            }  
        }else{
            Ui.infoBar("You don't have that item!")
        }
    }
        
}