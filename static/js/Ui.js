export const Ui = {
    start_location: { x: 7, y: 4 },
    uiSetUP(player) {
        window.addEventListener('keydown', (e) => {
            if (e.key == 'Enter') {
                document.getElementById('player-input').value = '';
                switch (document.getElementById('player-input').value.toUpperCase()) {
                    case "GOSSIP":
                    case "G":

                        break;

                    case "VOCABULARY":
                    case "V":


                        break;
                    case "NORTH":
                    case "N":
                        player.move(0, 1, "N")
                        break;
                    case "SOUTH":
                    case "S":
                        player.move(0, -1, "S")
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
            }

        })
    }
}