import mapLocation from './static/js/location.js';
import Item from './static/js/item.js';

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
/////////////ITEMY
let items = [];
for (let data of items_json) {
    items.push(new Item(data.id, data.flag, data.label, data.name))
}

for (let data of locations_json) {
    data.position.forEach(position => {
        locations[position[0]][position[1]] = new mapLocation({ x: position[0], y: position[1] }, data.color, data.src, data.label);
    });
}

for (let data of item_positions) {
    items.forEach(item => {
        if (item.id == data.id) {
            locations[data.position[0]][data.position[1]].items.push(data);
        }
    })
}

for (let data of directions_json) {
    let position = { x: parseInt(data.id[0]), y: parseInt(data.id[1]) }
    locations.forEach(row => {
        row.forEach(location => {
            try {
                if (location.position.x == position.x) {
                    console.log('dupa');
                }
            } catch (error) {

            }
        })
    })
}



