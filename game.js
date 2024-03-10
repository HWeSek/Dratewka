import mapLocation from './static/js/location.js';
import Item from './static/js/item.js';
import Player from './static/js/player.js';
import { Ui } from './static/js/Ui.js';

////////////////////JSONY
let response = await fetch('./static/data/locations.json');
const locations_json = await response.json();

response = await fetch('./static/data/items.json');
const items_json = await response.json();

response = await fetch('./static/data/item_positions.json');
const item_positions = await response.json();

response = await fetch('./static/data/directions.json');
const directions_json = await response.json();

//////////MAPA
let locations = [];
for (let i = 0; i < 9; i++) {
    let row = [];
    for (let j = 0; j < 9; j++) {
        row.push(0)
    }
    locations.push(row)
}

/////////ZMIENNE GRY
export const game_data = {
    sheep_parts: 0,
    dragon_dead: false,
    dirLabels: {
        E: "EAST",
        N: "NORTH",
        W: "WEST",
        S: "SOUTH"
    }
}

/////////////ITEMY
let items = [];
for (let data of items_json) {
    items.push(new Item(data.id, data.flag, data.label, data.name))
}

for (let data of locations_json) {
    data.position.forEach(position => {
        locations[position[0]][position[1]] = new mapLocation({ x: position[1], y: position[0] }, data.color, data.src, data.label);
    });
}

for (let position_1 of item_positions) {
    let item = items.find((itemt) => itemt.id == position_1.item_id);
    item.position = { x: position_1.position[1], y: position_1.position[0] }
    let location
    try {
        location = locations.flat().find((locationt) => locationt?.position?.x == position_1.position[1] && locationt?.position?.y == position_1.position[0])
        location.items.push(item);
    } catch (error) {

    }
}

for (let data of directions_json) {
    let position = { x: parseInt(data.id[1]), y: parseInt(data.id[0]) }
    locations.flat().forEach(location => {
        try {
            if (location.position.x == position.x && location.position.y == position.y) {
                location.directions = data.directions;
            }
        } catch (error) {

        }
    })
}

const player = new Player(locations);
window.addEventListener('keypress', () => {
    document.getElementById('title_1').style.display = 'none';
    document.getElementById('theme').volume = 0.2
    document.getElementById('theme').play()
    window.addEventListener('keypress', () => {
        document.getElementById('title_2').style.display = 'none';
        window.addEventListener('keypress', () => {
            document.getElementById('title_3').style.display = 'none';
            Ui.uiSetUP(player, items);
            document.getElementById('theme').pause()
            document.getElementById('player-input').focus()
        }, { once: true })
    }, { once: true })
}, { once: true })



