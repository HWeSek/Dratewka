let gossip = [
    "The  woodcutter lost  his home key...",
    "The butcher likes fruit... The cooper",
    "is greedy... Dratewka plans to make a",
    "poisoned  bait for the dragon...  The",
    "tavern owner is buying food  from the",
    "pickers... Making a rag from a bag...",
    "Press any key"
]

let vocab = ["NORTH or N, SOUTH or S",
    "WEST or W, EAST or E",
    "TAKE (object) or T (object)",
    "DROP (object) or D (object)",
    "USE (object) or U (object)",
    "GOSSIPS or G, VOCABULARY or V",
    "Press any key"]

export const Ui = {
    start_location: { x: 7, y: 4 },
    waitForInput() {
        document.getElementById('player-input').style.display = 'inline-block';
        document.getElementById('info').style.display = 'inline-block';
        document.getElementById('location-text').style.display = 'block';
        document.getElementById('location-alert').innerText = "";
        document.getElementById('player-input').focus()
    },
    infoBar(message) {
        document.getElementById('info').innerText = message;
        document.getElementById('player-input').style.display = 'none';
        setTimeout(() => {
            document.getElementById('info').innerHTML = "WHAT NOW?&nbsp;";
            document.getElementById('player-input').style.display = 'inline-block';
            document.getElementById('player-input').focus()
        }, 1000)
    }
    ,
    uiSetUP(player, items) {
        window.addEventListener('keydown', (e) => {
            if (e.key == 'Enter') {
                let input = String(document.getElementById('player-input').value.toUpperCase())
                if (new RegExp('^(T|TAKE|U|USE|D|DROP) .*').test(input)) {
                    let values = input.match('^(TAKE|T|USE|U|DROP|D) (.*)');
                    let item = items.find((one_item) => one_item.name.toUpperCase() == values[2])
                    switch (values[1]) {
                        case 'T':
                        case 'TAKE':
                            player.take(item)
                            break;
                        case 'U':
                        case 'USE':

                            break;
                        case 'D':
                        case 'DROP':

                            break;

                        default:
                            this.infoBar('Try another word or V for vocabulary...')
                            break;
                    }
                } else {
                    switch (input) {
                        case "GOSSIP":
                        case "G":
                            document.getElementById('location-text').style.display = 'none';
                            for (const line of gossip) {
                                document.getElementById('location-alert').innerText += (line + "\n")
                            }
                            document.getElementById('player-input').style.display = 'none';
                            document.getElementById('info').style.display = 'none';
                            setTimeout(() => { window.addEventListener('keypress', this.waitForInput, { once: true }) }, 1000)
                            break;

                        case "VOCABULARY":
                        case "V":
                            document.getElementById('location-text').style.display = 'none';
                            document.getElementById('location-alert').style.display = "block";
                            for (const line of vocab) {
                                document.getElementById('location-alert').innerText += (line + "\n")
                            }
                            document.getElementById('player-input').style.display = 'none';
                            document.getElementById('info').style.display = 'none';
                            setTimeout(() => { window.addEventListener('keypress', this.waitForInput), { once: true } }, 1000)

                            break;
                        case "NORTH":
                        case "N":
                            player.move(0, -1, "N")
                            break;
                        case "SOUTH":
                        case "S":
                            player.move(0, 1, "S")
                            break;
                        case "EAST":
                        case "E":
                            player.move(1, 0, "E")
                            break;
                        case "WEST":
                        case "W":
                            player.move(-1, 0, "W")
                            break;
                        default:
                            this.infoBar('Try another word or V for vocabulary...')
                            break;
                    }
                }

                document.getElementById('player-input').value = '';
            }

        })
    }
}