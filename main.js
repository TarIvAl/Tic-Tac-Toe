const forms = document.getElementsByClassName("player__form-name");
const buttons = document.getElementsByClassName("player__form-button");
const names = document.getElementsByClassName("player__name");
const operators = document.getElementsByClassName("player__operator");
const status = document.getElementsByClassName("player__status")
const cells = document.getElementsByClassName("field__cell");

function win(counter, cell, player){
    
    if(counter < 3){
        return false;
    }

    switch(cell){
        case 0:
            if(cells[1].textContent === operators[player].textContent && cells[2].textContent === operators[player].textContent){
                return true;
            }
            if(cells[3].textContent === operators[player].textContent && cells[6].textContent === operators[player].textContent){
                return true;
            }
            if(cells[4].textContent === operators[player].textContent && cells[8].textContent === operators[player].textContent){
                return true;
            }
            break;
        case 1:
            if(cells[0].textContent === operators[player].textContent && cells[2].textContent === operators[player].textContent){
                return true;
            }
            if(cells[4].textContent === operators[player].textContent && cells[7].textContent === operators[player].textContent){
                return true;
            }
            break;
        case 2:
            if(cells[0].textContent === operators[player].textContent && cells[1].textContent === operators[player].textContent){
                return true;
            }
            if(cells[5].textContent === operators[player].textContent && cells[8].textContent === operators[player].textContent){
                return true;
            }
            if(cells[4].textContent === operators[player].textContent && cells[6].textContent === operators[player].textContent){
                return true;
            }
            break;
        case 3:
            if(cells[4].textContent === operators[player].textContent && cells[5].textContent === operators[player].textContent){
                return true;
            }
            if(cells[0].textContent === operators[player].textContent && cells[6].textContent === operators[player].textContent){
                return true;
            }
            break;
        case 4:
            if(cells[0].textContent === operators[player].textContent && cells[8].textContent === operators[player].textContent){
                return true;
            }
            if(cells[1].textContent === operators[player].textContent && cells[7].textContent === operators[player].textContent){
                return true;
            }
            if(cells[2].textContent === operators[player].textContent && cells[6].textContent === operators[player].textContent){
                return true;
            }
            if(cells[3].textContent === operators[player].textContent && cells[5].textContent === operators[player].textContent){
                return true;
            }
            break;
        case 5:
            if(cells[3].textContent === operators[player].textContent && cells[4].textContent === operators[player].textContent){
                return true;
            }
            if(cells[2].textContent === operators[player].textContent && cells[8].textContent === operators[player].textContent){
                return true;
            }
            break;
        case 6:
            if(cells[0].textContent === operators[player].textContent && cells[3].textContent === operators[player].textContent){
                return true;
            }
            if(cells[2].textContent === operators[player].textContent && cells[4].textContent === operators[player].textContent){
                return true;
            }
            if(cells[7].textContent === operators[player].textContent && cells[8].textContent === operators[player].textContent){
                return true;
            }
            break;
        case 7:
            if(cells[6].textContent === operators[player].textContent && cells[8].textContent === operators[player].textContent){
                return true;
            }
            if(cells[4].textContent === operators[player].textContent && cells[1].textContent === operators[player].textContent){
                return true;
            }
            break;
        case 8:
            if(cells[6].textContent === operators[player].textContent && cells[7].textContent === operators[player].textContent){
                return true;
            }
            if(cells[2].textContent === operators[player].textContent && cells[5].textContent === operators[player].textContent){
                return true;
            }
            if(cells[0].textContent === operators[player].textContent && cells[4].textContent === operators[player].textContent){
                return true;
            }
            break;
    }
}

function playOn(){
    if(names[0].textContent.length !== 0 && names[1].textContent.length !== 0){
        let activePlayer = true;
        let endGame = false;
        let counters = [0,0];
        if(activePlayer){
            status[0].hidden = !status[0].hidden;
        } else {
            status[1].hidden = !status[1].hidden;
        }
        for(let i = 0; i < cells.length; ++i) {
            cells[i].addEventListener("click", () => {
                if(activePlayer === true){
                    cells[i].textContent = operators[0].textContent;
                    ++counters[0];

                    endGame = win(counters[0], i, 0);
                    if(endGame){
                        status[0].textContent = " Winner!!!";
                    }
                } else {
                    cells[i].textContent = operators[1].textContent;
                    ++counters[1];

                    endGame = win(counters[1], i, 1);
                    if(endGame){
                        status[1].textContent = " Winner!!!";
                    }
                }
                if(!endGame){
                    activePlayer = !activePlayer;
                    status[0].hidden = !status[0].hidden;
                    status[1].hidden = !status[1].hidden;
                }



            }, {once: true});
        }
    }
}

function setName(player){
    if(Math.random() < 0.5){
        operators[0].textContent = "X";
        operators[1].textContent = "O";
    } else {
        operators[0].textContent = "O";
        operators[1].textContent = "X";
    }
    buttons[player].addEventListener("click", () => {
        names[player].textContent = forms[player].value;
        operators[player].hidden = false;
        names[player].hidden = false;
        forms[player].hidden = true;
        buttons[player].hidden = true;
        playOn();
    });
}

setName(0);
setName(1);