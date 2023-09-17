let move = "X"
let audioturn = new Audio("click.wav");
let gameover = false;

const boxes = document.querySelectorAll(".box");
const reset = document.getElementById("reset");

boxes.forEach(box => {
    box.addEventListener('click', addgo)
});

function addgo(e)
{
    if(gameover) return;
    e.target.append(move);
    move = move === 'X'?'O':'X';
    e.target.removeEventListener('click',addgo);
    audioturn.play();
    checkWin();
}

function checkWin() {
const Box = document.querySelectorAll('.box');
let wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

wins.forEach(array => {
    const Xwins = array.every(cell => Box[cell].firstChild?.textContent === 'X');
    const Owins = array.every(cell => Box[cell].firstChild?.textContent === 'O');

    if (Xwins || Owins) {
    gameover = true;
    alert(Xwins ? 'Player X wins!' : 'Player O wins!');
    boxes.forEach(box => box.removeEventListener('click', addgo));
    }
})
}

reset.addEventListener('click', ()=>{
    const Box = document.querySelectorAll('.box');
    Array.from(Box).forEach(element => {
        element.innerHTML = '';
    });
    gameover = false;

    boxes.forEach(box => {
        box.addEventListener('click', addgo);
    });

})