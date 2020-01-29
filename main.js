const forms = document.getElementsByClassName("player__form-name");
const buttons = document.getElementsByClassName("player__form-button");
const names = document.getElementsByClassName("player__name");
const operators = document.getElementsByClassName("player__operator");

if(Math.random() < 0.5){
    operators[0].textContent = "X";
    operators[1].textContent = "O";
} else {
    operators[0].textContent = "O";
    operators[1].textContent = "X";
}

function setName(player){
    buttons[player].addEventListener("click", () => {
        names[player].textContent = forms[player].value;
        operators[player].hidden = false;
        names[player].hidden = false;
        console.log(forms[player].value);
        forms[player].hidden = true;
        buttons[player].hidden = true;
    });
}
setName(0);
setName(1);

// const cells = document.getElementsByClassName("field__cell");
// let activePlayer = true;

// if(names[0].textContent.length !== 0 && names[1].textContent.length !== 0){
//     cells.forEach(element => {
//         element.addEventListener("keydown", () => {
//             if(activePlayer === true){
//                 element.textContent = "X";
//             } else {
//                 element.textContent = "O";
//             }
//             activePlayer = !activePlayer;
//         });
//     });
// }