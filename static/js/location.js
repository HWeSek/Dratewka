import { game_data } from "../../game.js";

export default class mapLocation {
    constructor(position, color, imgSrc, label, directions) {
        this.position = position
        this.color = color;
        this.imgSrc = imgSrc;
        this.label = label
        this.items = [];
        this.directions = directions
    }

    removeItem(item) {
        if (this.items.includes(item)) {
            this.items.splice(this.items.indexOf(item), 1)
            this.setLocation()
        }
    }

    dropValidate(item){
        if(item.flag === 1){
            let couter=0;
            for(let element of this.items){
                if(element.flag === 1){
                    couter++;
                }
            }
            if(couter < 3){
                return true;
            }else{
                return false;
            }
        }else{return true;}
 
    }

    setLocation() {
        document.getElementById('location-text').innerText = '';
        document.getElementById('location-label').innerText = this.label;
        document.getElementById('image').style.backgroundColor = this.color;
        document.getElementById('image').src = 'static/img/' + this.imgSrc;

        document.getElementById('E').style.display = "block";
        document.getElementById('N').style.display = "block";
        document.getElementById('W').style.display = "block";
        document.getElementById('S').style.display = "block";
        ////TEXT
        const directions_text = document.createElement('p');
        const items_text = document.createElement('p');
        items_text.setAttribute('id', 'items')
        const hand_text = document.createElement('p');
        hand_text.setAttribute('id', 'hand');
        directions_text.innerText = 'You can go '
        this.directions.sort()
        this.directions.forEach(direction => {
            directions_text.innerText += (game_data.dirLabels[direction] + ", ")
            document.getElementById(direction).style.display = 'none';
        });


        
        items_text.innerText = 'You can see '
        if (this.items.length == 0) {
            items_text.innerText = 'You can see nothing...';
        } else {
            this.items.forEach(item => {
                items_text.innerText += (item.label + ", ")
            })
        }
        
        hand_text.innerText = "You are carrying nothing...";
        document.getElementById('location-text').appendChild(directions_text);
        document.getElementById('location-text').appendChild(items_text);
        document.getElementById('location-text').appendChild(hand_text);
    }
}