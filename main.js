const windows = document.getElementsByClassName("player");
const inputNames = document.getElementsByClassName("player__input-name");
const buttons = document.getElementsByClassName("player__button");
const names = document.getElementsByClassName("player__name");
const operators = document.getElementsByClassName("player__operator");
const status = document.getElementsByClassName("player__status")
const cells = document.getElementsByClassName("field__cell");
const restartButton = document.querySelector(".restart");
const scores = document.getElementsByClassName("scores");

let activeFirstPlayer;
let endGame = false;
let counters = [0,0];
let hasEvent = [];

restartButton.addEventListener("click", () => {
    if(endGame){
        restartButton.blur();
        activeFirstPlayer = !activeFirstPlayer;
        localStorage.setItem("activeFirstPlayer", activeFirstPlayer);
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
            localStorage.setItem("score" + player, scores[player].textContent);
            windows[player].style.backgroundColor = "rgb(100, 255, 100)";
            restartButton.focus();
        }
    }
    return result;
}

function playOn(){
    if(activeFirstPlayer){
        status[0].hidden = !status[0].hidden;
    } else {
        status[1].hidden = !status[1].hidden;
    }
    for(let i = 0; i < cells.length; ++i) {
        if(!hasEvent[i] && cells[i].textContent.length === 0){
            hasEvent[i] = true;
            cells[i].addEventListener("click", () => {
                hasEvent[i] = false;
                if(!endGame){
                    if(activeFirstPlayer){
                        cells[i].textContent = operators[0].textContent;
                        ++counters[0];
    
                        endGame = winListener(counters[0], i, 0);
                    } else {
                        cells[i].textContent = operators[1].textContent;
                        ++counters[1];
    
                        endGame = winListener(counters[1], i, 1);
                    }
                    if(!endGame){
                        activeFirstPlayer = !activeFirstPlayer;
                        status[0].hidden = !status[0].hidden;
                        status[1].hidden = !status[1].hidden;
                    }
                    if(counters[0] + counters[1] === 9 && !endGame){
                        endGame = true;
                        activeFirstPlayer = !activeFirstPlayer;
                        localStorage.setItem("activeFirstPlayer", activeFirstPlayer);
                        restartButton.focus();
                        status[0].hidden = false;
                        status[1].hidden = false;
                        status[0].textContent = "Ничья";
                        status[1].textContent = "Ничья";
                        for(let cell of cells){
                            cell.style.backgroundColor = "yellow";
                        }
                    }
                    if(endGame){
                        if(scores[0].textContent === scores[1].textContent){
                            scores[0].style.color = "yellow";
                            scores[1].style.color = "yellow";
                        } else if(scores[0].textContent < scores[1].textContent){
                            scores[0].style.color = "rgb(128, 0, 0)";
                            scores[1].style.color = "green";
                        } else{
                            scores[0].style.color = "green";
                            scores[1].style.color = "rgb(128, 0, 0)";
                        }
                    }
                }
            }, {once: true});
        }
    }
}

function editName(player){
    names[player].addEventListener("click", () => {
        inputNames[player].hidden = false;
        buttons[player].hidden = false;
        names[player].hidden = true;
        inputNames[player].focus();
        setName(player);
    }, {once: true});
}

function setName(player){
    inputNames[player].addEventListener("input", (symb) => {
        if(!/[\wа-яА-Я]/.test(symb.data)){
            inputNames[player].value = inputNames[player].value.replace(symb.data, "");
        }
    });
    inputNames[player].addEventListener("keydown", (key) => {    
        if(key.keyCode === 13){
            buttons[player].focus();
        }
    });
    buttons[player].addEventListener("click", () => {
        if(inputNames[player].value.length >= 3){
            names[player].textContent = inputNames[player].value;
            localStorage.setItem("name" + player, inputNames[player].value);
            names[player].hidden = false;
            inputNames[player].hidden = true;
            buttons[player].hidden = true;
            inputNames[Math.abs(player - 1)].focus();
            if(names[0].textContent.length !== 0 && names[1].textContent.length !== 0 && status[0].hidden === status[1].hidden && status[0].hidden === true){
                endGame = false;
                playOn();
            }
            editName(player);
        } else {
            inputNames[player].focus();
        }
    });
}

function setGame(){
    for(let player = 0; player < 2; player++){
        if(!localStorage.getItem("name" + player) || inputNames[player].value.length !== 0){
            setName(player);
        } else {
            names[player].textContent = localStorage.getItem("name" + player);
            inputNames[player].value = names[player].textContent;
            if(localStorage.getItem("score" + player)){
                scores[player].textContent = localStorage.getItem("score" + player);
            }
            names[player].hidden = false;
            inputNames[player].hidden = true;
            buttons[player].hidden = true;
            if(names[0].textContent.length !== 0 && names[1].textContent.length !== 0){
                playOn();
            }
            editName(player);
        }
    }

    if(scores[0].textContent === scores[1].textContent){
        scores[0].style.color = "yellow";
        scores[1].style.color = "yellow";
    } else if(scores[0].textContent < scores[1].textContent){
        scores[0].style.color = "rgb(128, 0, 0)";
        scores[1].style.color = "green";
    } else{
        scores[0].style.color = "green";
        scores[1].style.color = "rgb(128, 0, 0)";
    }
    
    if(localStorage.getItem("activeFirstPlayer") === "false"){
        activeFirstPlayer = false;
    } else {
        activeFirstPlayer = true;
    }
    
    for (let index = 0; index < 9; index++) {
        hasEvent.push(false);
    }
}

setGame();

//menu

const menu = document.querySelector(".menu");
const menuList = document.querySelector(".menu__list");
const menuButton = document.querySelector(".menu__button");

menu.addEventListener("mouseout", () => {
    menuList.hidden = true;
    menuButton.hidden = false;
});
menu.addEventListener("mouseover", () => {
    menuList.hidden = false;
    menuButton.hidden = true;
});

//reset

const reset = document.querySelector(".reset");

reset.addEventListener("click", () => {
    for (let player = 0; player < 2; player++) {
        localStorage.removeItem("name" + player);
        localStorage.removeItem("score" + player);
    }
    localStorage.removeItem("activeFirstPlayer");
    location.reload();
});