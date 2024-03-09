import { Ui } from "./Ui.js";
import { game_data } from "../../game.js";

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
            if(this.position.x == 2 && this.position.y == 4 && game_data.dragon_dead == false && dir == "W"){
                document.getElementById('info').innerText = "You can't go that way...";
                setTimeout(() => {                  
                    document.getElementById('info').innerText += "\nThe dragon sleeps in the cave";
                    setTimeout(() => {
                        document.getElementById('info').innerHTML = "WHAT NOW?&nbsp;";
                        document.getElementById('player-input').style.display = 'inline-block';
                        document.getElementById('player-input').focus()
                }, 1000)
            }, 1000)
            }else{
                this.position.x += x
                this.position.y += y
                Ui.infoBar("You are going " + game_data.dirLabels[dir])
                this.locations[this.position.y][this.position.x].setLocation()
                this.hand_display()
            }
        }else{
            Ui.infoBar("You can't go that way...");
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
                //console.log(target_loc);
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

    use(item, items){   
        if(item != undefined){
            if(this.hand == item || item.id == 'sheep'){
                switch(item.id){
                    case 10:
                        if(this.position.y == 5 && this.position.x == 6){
                            const new_item = items.find((el) => el.id == 11)
                            item.position = undefined;
                            this.hand = new_item;
                            Ui.infoBar('You opened a tool shed and took an axe');
                            this.hand_display()
                        }else{
                            Ui.infoBar("You can't do that here!")
                        }
                        break;
                    case 11:
                        if(this.position.y == 6 && this.position.x == 7){
                            const new_item = items.find((el) => el.id == 12)
                            item.position = undefined;
                            this.hand = new_item;
                            Ui.infoBar('You cut sticks for sheeplegs');
                            this.hand_display()
                        }else{
                            Ui.infoBar("You can't do that here!")
                        }
                        break;
                    case 12:
                        if(this.position.y == 4 && this.position.x == 3){
                            const new_item = items.find((el) => el.id == 13)
                            item.position = undefined;
                            this.hand = new_item;
                            this.drop(new_item)  
                            game_data.sheep_parts++;                        
                            Ui.infoBar('You prepared legs for your fake sheep');
                            this.hand_display()
                        }else{
                            Ui.infoBar("You can't do that here!")
                        }
                        break;
                    case 14:
                        if(this.position.y == 3 && this.position.x == 4){
                            const new_item = items.find((el) => el.id == 15)
                            item.position = undefined;
                            this.hand = new_item;                        
                            Ui.infoBar('The tavern owner paid you money');
                            this.hand_display()
                        }else{
                            Ui.infoBar("You can't do that here!")
                        }
                        break;
                    case 15:
                        if(this.position.y == 3 && this.position.x == 7){
                            const new_item = items.find((el) => el.id == 16)
                            item.position = undefined;
                            this.hand = new_item;                        
                            Ui.infoBar('The cooper sold you a new barrel');
                            this.hand_display()
                        }else{
                            Ui.infoBar("You can't do that here!")
                        }
                        break;
                    case 16:
                        if(this.position.y == 4 && this.position.x == 3){
                            const new_item = items.find((el) => el.id == 17)
                            item.position = undefined;
                            this.hand = new_item;  
                            this.drop(new_item)  
                            game_data.sheep_parts++;                      
                            Ui.infoBar('You made a nice sheeptrunk');
                            this.hand_display()
                        }else{
                            Ui.infoBar("You can't do that here!")
                        }
                        break;
                    case 18:
                        if(this.position.y == 3 && this.position.x == 6){
                            const new_item = items.find((el) => el.id == 19)
                            item.position = undefined;
                            this.hand = new_item;                        
                            Ui.infoBar('The butcher gave you wool');
                            this.hand_display()
                        }else{
                            Ui.infoBar("You can't do that here!")
                        }
                        break;
                    case 19:
                        if(this.position.y == 4 && this.position.x == 3){
                            const new_item = items.find((el) => el.id == 20)
                            item.position = undefined;
                            this.hand = new_item;  
                            this.drop(new_item)  
                            game_data.sheep_parts++;                      
                            Ui.infoBar('You prepared skin for your fake sheep');
                            this.hand_display()
                        }else{
                            Ui.infoBar("You can't do that here!")
                        }
                        break;
                    case 21:
                        if(this.position.y == 5 && this.position.x == 7){
                            const new_item = items.find((el) => el.id == 22)
                            item.position = undefined;
                            this.hand = new_item;                        
                            Ui.infoBar('You used your tools to make a rag');
                            this.hand_display()
                        }else{
                            Ui.infoBar("You can't do that here!")
                        }
                        break;
                    case 22:
                        if(this.position.y == 4 && this.position.x == 3){
                            const new_item = items.find((el) => el.id == 23)
                            item.position = undefined;
                            this.hand = new_item;  
                            this.drop(new_item)  
                            game_data.sheep_parts++;                      
                            Ui.infoBar('You made a fake sheephead');
                            this.hand_display()
                        }else{
                            Ui.infoBar("You can't do that here!")
                        }
                        break;
                    case 24:
                        if(this.position.y == 1 && this.position.x == 1){
                            const new_item = items.find((el) => el.id == 25)
                            item.position = undefined;
                            this.hand = new_item;                      
                            document.getElementById('info').innerText = "You are digging...";
                            document.getElementById('player-input').style.display = 'none';
                            setTimeout(() => {
                                document.getElementById('info').innerText += "\nand digging...";
                                setTimeout(() => {
                                    document.getElementById('info').innerText += "\nThat's enough sulphur for you";
                                    setTimeout(() => {
                                        document.getElementById('info').innerHTML = "WHAT NOW?&nbsp;";
                                        document.getElementById('player-input').style.display = 'inline-block';
                                        document.getElementById('player-input').focus()
                                    }, 1000)
                                }, 1000)
                            }, 1000)
                            this.hand_display()
                        }else{
                            Ui.infoBar("You can't do that here!")
                        }
                        break;
                    case 25:
                        if(this.position.y == 4 && this.position.x == 3){
                            const new_item = items.find((el) => el.id == 26)
                            item.position = undefined;
                            this.hand = new_item;  
                            this.drop(new_item)  
                            game_data.sheep_parts++;                      
                            Ui.infoBar('You prepared a solid poison');
                            this.hand_display()
                        }else{
                            Ui.infoBar("You can't do that here!")
                        }
                        break;
                    case 27:
                        if(this.position.y == 2 && this.position.x == 1){
                            const new_item = items.find((el) => el.id == 28)
                            item.position = undefined;
                            this.hand = new_item;                        
                            Ui.infoBar('You got a bucket full of tar');
                            this.hand_display()
                        }else{
                            Ui.infoBar("You can't do that here!")
                        }
                        break;
                    case 28:
                        if(this.position.y == 4 && this.position.x == 3){
                            const new_item = items.find((el) => el.id == 29)
                            item.position = undefined;
                            this.hand = new_item;  
                            this.drop(new_item)  
                            game_data.sheep_parts++;                      
                            Ui.infoBar('You prepared a liquid poison');
                            this.hand_display()
                        }else{
                            Ui.infoBar("You can't do that here!")
                        }
                        break;
                    case 'sheep':
                        if(this.position.y == 4 && this.position.x == 3){
                            const new_item = items.find((el) => el.id == 37)
                            item.position = undefined;
                            this.hand = new_item;   
                            let target_loc;
                             for (let loc of this.locations.flat()) {
                                 try {
                                     if (loc.position.x === 3 && loc.position.y === 4) {
                                         target_loc = loc;
                                     }
                                 } catch (error) {}
                             }   
                            
                            target_loc.removeItem(items.find((el) => el.id == 13))                
                            target_loc.removeItem(items.find((el) => el.id == 17))                
                            target_loc.removeItem(items.find((el) => el.id == 20))                
                            target_loc.removeItem(items.find((el) => el.id == 23))                
                            target_loc.removeItem(items.find((el) => el.id == 26))                
                            target_loc.removeItem(items.find((el) => el.id == 29)) 
                            target_loc.setLocation()               
                            Ui.infoBar('Your fake sheep is full of poison and ready to be eaten by the dragon');
                            this.hand_display()
                        }
                        break;
                    case 37:
                        if(this.position.y == 4 && this.position.x == 3){
                            const new_item = items.find((el) => el.id == 30)
                            item.position = undefined;
                            this.hand = new_item;  
                            this.drop(new_item)    
                            document.getElementById('info').innerText = "The dragon noticed your gift...";                    
                            setTimeout(() => {                  
                                    document.getElementById('info').innerText += "\nThe dragon ate your sheep and died!";
                                    let target_loc;
                                      for (let loc of this.locations.flat()) {
                                          try {
                                              if (loc.position.x === 3 && loc.position.y === 4) {
                                                  target_loc = loc;
                                              }
                                          } catch (error) {
                                          }
                                      }
                                    target_loc.imgSrc = '../img/DS68.bmp';
                                    game_data.dragon_dead = true;
                                    target_loc.setLocation()
                                    setTimeout(() => {
                                        document.getElementById('info').innerHTML = "WHAT NOW?&nbsp;";
                                        document.getElementById('player-input').style.display = 'inline-block';
                                        document.getElementById('player-input').focus()
                                }, 1000)
                            }, 1000)
                            this.hand_display()
                        }else{
                            Ui.infoBar("You can't do that here!")
                        }
                        break;
                    case 33:
                        if(this.position.y == 4 && this.position.x == 3 && game_data.dragon_dead == true){
                            const new_item = items.find((el) => el.id == 34)
                            item.position = undefined;
                            this.hand = new_item;                       
                            Ui.infoBar("You cut a piece of dragon's skin");
                            this.hand_display()
                        }else{
                            Ui.infoBar("You can't do that here!")
                        }
                        break;
                    case 34:
                        if(this.position.y == 5 && this.position.x == 7){
                            const new_item = items.find((el) => el.id == 35)
                            item.position = undefined;
                            this.hand = new_item;                       
                            Ui.infoBar("You used your tools to make shoes");
                            this.hand_display()
                        }else{
                            Ui.infoBar("You can't do that here!")
                        }
                        break;
                    case 35:
                        if(this.position.y == 4 && this.position.x == 1){
                            const new_item = items.find((el) => el.id == 36)
                            item.position = undefined;
                            this.hand = new_item;                       
                            Ui.infoBar("The King is impressed by your shoes");
                            this.hand_display()
                        }else{
                            Ui.infoBar("You can't do that here!")
                        }
                        break;
                    case 36:
                        ///KONIEC GRYYY!!!!
                        document.getElementById('end_screen').style.display = 'block'
                    
                }
            }else{
                Ui.infoBar("You don't have that item!")
            }  
        }else{
            Ui.infoBar("You don't have that item!")
        }
    }
        
}