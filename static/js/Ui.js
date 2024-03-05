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
        document.getElementById('player-input').style.display = 'block';
        document.getElementById('info').style.display = 'block';
        document.getElementById('location-text').style.display = 'block';
        document.getElementById('location-alert').style.display = "none";
        window.removeEventListener('keypress', this.waitForInput)
    },
    uiSetUP(player) {
        window.addEventListener('keydown', (e) => {
            if (e.key == 'Enter') {
                switch (document.getElementById('player-input').value.toUpperCase()) {
                    case "GOSSIP":
                    case "G":
                        document.getElementById('location-text').style.display = 'none';
                        document.getElementById('location-alert').style.display = "block";
                        for (const line of gossip) {
                            document.getElementById('location-alert').innerText += (line + "\n")
                        }
                        document.getElementById('player-input').style.display = 'none';
                        document.getElementById('info').style.display = 'none';
                        setTimeout(() => { window.addEventListener('keypress', this.waitForInput) }, 1000)
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
                        setTimeout(() => { window.addEventListener('keypress', this.waitForInput) }, 1000)

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

                    case "TAKE":
                    case "T":

                        break;
                    case "DROP":
                    case "D":

                        break;
                    case "USE":
                    case "U":

                        break;

                    default:

                        break;
                }
                document.getElementById('player-input').value = '';
            }

        })
    }
}