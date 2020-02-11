const windows = document.getElementsByClassName("player");
const forms = document.getElementsByClassName("player__form-name");
const buttons = document.getElementsByClassName("player__form-button");
const names = document.getElementsByClassName("player__name");
const operators = document.getElementsByClassName("player__operator");
const status = document.getElementsByClassName("player__status")
const cells = document.getElementsByClassName("field__cell");
const resetButton = document.querySelector(".reset");
const scores = document.getElementsByClassName("scores");

let activePlayer = true;
let endGame = false;
let counters = [0,0];
let hasEvent = [];
for (let index = 0; index < 9; index++) {
    hasEvent.push(false);
}

function resetPlay(){
    resetButton.blur();
    activePlayer = !activePlayer;
    counters[0] = 0;
    counters[1] = 0;
    status[0].hidden = true;
    status[1].hidden = true;
    endGame = false;
    for(let i = 0; i < cells.length; ++i) {
        cells[i].textContent = "";
        cells[i].style.backgroundColor = "green";
    }
    status[0].textContent = "Ваша очередь";
    status[1].textContent = "Ваша очередь";
    windows[0].style.backgroundColor = "green";
    windows[1].style.backgroundColor = "green";
}

resetButton.addEventListener("click", () => {
    if(endGame){
        resetPlay();
        playOn();
    }
});

function winListener(counter, cell, player){
    let result = false;
    if(counter >= 3){
        switch(cell){
            case 0:
                if(cells[1].textContent === operators[player].textContent && cells[2].textContent === operators[player].textContent){
                    result = true;
                }
                if(cells[3].textContent === operators[player].textContent && cells[6].textContent === operators[player].textContent){
                    result = true;
                }
                if(cells[4].textContent === operators[player].textContent && cells[8].textContent === operators[player].textContent){
                    result = true;
                }
                break;
            case 1:
                if(cells[0].textContent === operators[player].textContent && cells[2].textContent === operators[player].textContent){
                    result = true;
                }
                if(cells[4].textContent === operators[player].textContent && cells[7].textContent === operators[player].textContent){
                    result = true;
                }
                break;
            case 2:
                if(cells[0].textContent === operators[player].textContent && cells[1].textContent === operators[player].textContent){
                    result = true;
                }
                if(cells[5].textContent === operators[player].textContent && cells[8].textContent === operators[player].textContent){
                    result = true;
                }
                if(cells[4].textContent === operators[player].textContent && cells[6].textContent === operators[player].textContent){
                    result = true;
                }
                break;
            case 3:
                if(cells[4].textContent === operators[player].textContent && cells[5].textContent === operators[player].textContent){
                    result = true;
                }
                if(cells[0].textContent === operators[player].textContent && cells[6].textContent === operators[player].textContent){
                    result = true;
                }
                break;
            case 4:
                if(cells[0].textContent === operators[player].textContent && cells[8].textContent === operators[player].textContent){
                    result = true;
                }
                if(cells[1].textContent === operators[player].textContent && cells[7].textContent === operators[player].textContent){
                    result = true;
                }
                if(cells[2].textContent === operators[player].textContent && cells[6].textContent === operators[player].textContent){
                    result = true;
                }
                if(cells[3].textContent === operators[player].textContent && cells[5].textContent === operators[player].textContent){
                    result = true;
                }
                break;
            case 5:
                if(cells[3].textContent === operators[player].textContent && cells[4].textContent === operators[player].textContent){
                    result = true;
                }
                if(cells[2].textContent === operators[player].textContent && cells[8].textContent === operators[player].textContent){
                    result = true;
                }
                break;
            case 6:
                if(cells[0].textContent === operators[player].textContent && cells[3].textContent === operators[player].textContent){
                    result = true;
                }
                if(cells[2].textContent === operators[player].textContent && cells[4].textContent === operators[player].textContent){
                    result = true;
                }
                if(cells[7].textContent === operators[player].textContent && cells[8].textContent === operators[player].textContent){
                    result = true;
                }
                break;
            case 7:
                if(cells[6].textContent === operators[player].textContent && cells[8].textContent === operators[player].textContent){
                    result = true;
                }
                if(cells[4].textContent === operators[player].textContent && cells[1].textContent === operators[player].textContent){
                    result = true;
                }
                break;
            case 8:
                if(cells[6].textContent === operators[player].textContent && cells[7].textContent === operators[player].textContent){
                    result = true;
                }
                if(cells[2].textContent === operators[player].textContent && cells[5].textContent === operators[player].textContent){
                    result = true;
                }
                if(cells[0].textContent === operators[player].textContent && cells[4].textContent === operators[player].textContent){
                    result = true;
                }
                break;
        }
        if(result){
            status[player].textContent = "Победа!!!";
            scores[player].textContent = Number(scores[player].textContent) + 1;
            windows[player].style.backgroundColor = "rgb(128, 0, 0)";
            resetButton.focus();
        }
    }
    return result;
}

function playOn(){
    if(activePlayer){
        status[0].hidden = !status[0].hidden;
    } else {
        status[1].hidden = !status[1].hidden;
    }
    for(let i = 0; i < cells.length; ++i) {
        if(!hasEvent[i]){
            hasEvent[i] = true;
            cells[i].addEventListener("click", () => {
                hasEvent[i] = false;
                if(!endGame){
                    if(activePlayer === true){
                        cells[i].textContent = operators[0].textContent;
                        ++counters[0];
    
                        endGame = winListener(counters[0], i, 0);
                    } else {
                        cells[i].textContent = operators[1].textContent;
                        ++counters[1];
    
                        endGame = winListener(counters[1], i, 1);
                    }
                    if(!endGame){
                        activePlayer = !activePlayer;
                        status[0].hidden = !status[0].hidden;
                        status[1].hidden = !status[1].hidden;
                    }
                    if(counters[0] + counters[1] === 9 && !endGame){
                        endGame = true;
                        resetButton.focus();
                        status[0].hidden = false;
                        status[1].hidden = false;
                        status[0].textContent = "Ничья";
                        status[1].textContent = "Ничья";
                        for(let cell of cells){
                            cell.style.backgroundColor = "yellow";
                        }
                    }
                }
            }, {once: true});
        }
    }
}

function setName(player){
    forms[player].addEventListener("input", (symb) => {
        if(!/[\wа-яА-Я]/.test(symb.data)){
            forms[0].value = forms[0].value.slice(0, -1);
        }
    });
    forms[player].addEventListener("keydown", (key) => {    
        if(key.keyCode === 13){
            buttons[player].focus();
        }
    });
    buttons[player].addEventListener("click", () => {
        if(forms[player].value.length >= 3){
            names[player].textContent = forms[player].value;
            names[player].hidden = false;
            forms[player].hidden = true;
            buttons[player].hidden = true;
            forms[Math.abs(player - 1)].focus();
            if(names[0].textContent.length !== 0 && names[1].textContent.length !== 0){
                playOn();
            }
        } else {
            forms[player].focus();
        }
    });
}

forms[0].focus();
setName(0);
setName(1);
