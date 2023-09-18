let move = "X"
let audioturn = new Audio("click.wav");
let gameover = false;
let overaudio = new Audio("Game-over.wav");

const boxes = document.querySelectorAll(".box");
const reset = document.getElementById("reset");
const infoDisplay = document.getElementById("infodisplay");
const turndisplay = document.getElementById("turnDisplay");
turnDisplay.innerHTML = '"Player X will start the game"';

boxes.forEach(box => {
    box.addEventListener('click', addgo)
});


// Function for turn in the game which is printing "X" and "O" in the game.
function addgo(e)
{
    if(gameover) return;
    e.target.append(move);
    move = move === 'X'?'O':'X';
    e.target.removeEventListener('click',addgo);
    audioturn.play();
    checkWin();
    checkTie();
}

// Function to check the game is finished by winning 
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
    overaudio.play();
    infoDisplay.textContent = Xwins ? '"Player X wins!"' : '"Player O wins!"';
    turnDisplay.textContent = Xwins ? '"Player O will start the game!"' : '"Player X will start the game!"';
    boxes.forEach(box => box.removeEventListener('click', addgo));
    }
    checkTie();
})
}


// Adding eventlistener for Restart button 
reset.addEventListener('click', ()=>{
    const Box = document.querySelectorAll('.box');
    Array.from(Box).forEach(element => {
        element.innerHTML = '';
    });
    audioturn.play();
    gameover = false;
    infoDisplay.textContent = '';
    boxes.forEach(box => {
        box.addEventListener('click', addgo);
    });

})

// Function to check if the game tied or not.
function checkTie() {
    const Box = document.querySelectorAll('.box');
    const isFull = Array.from(Box).every(box => box.textContent === 'X' || box.textContent === 'O');
    
    if (isFull) {
        const wins = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        let hasWinner = false;

        wins.forEach(array => {
            const Xwins = array.every(cell => Box[cell].textContent === 'X');
            const Owins = array.every(cell => Box[cell].textContent === 'O');
            
            if (Xwins || Owins) {
                hasWinner = true;
            }
        });

        if (!hasWinner) {
            gameover = true;
            overaudio.play();
            infoDisplay.textContent = 'Game Ties!';
        }
    }
}

