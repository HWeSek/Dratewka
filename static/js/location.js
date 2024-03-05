export default class mapLocation {
    constructor(position, color, imgSrc, label, directions) {
        this.position = position
        this.color = color;
        this.imgSrc = imgSrc;
        this.label = label
        this.items = [];
        this.directions = directions
    }

    setLocation() {
        document.getElementById('location-label').innerText = this.label;
        document.getElementById('image').src = 'static/img/' + this.imgSrc;
        if (this.items.length == 0) {
            document.getElementById
        }
    }
}