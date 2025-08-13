//get Elements
const board = document.querySelector(".board-container");
const defineSquares = document.querySelector("#define-squares");

const INITIAL_SQUARES = 16;

function createBoard(){
    createSquares(INITIAL_SQUARES);
}

function createSquares(squarePerLine){

    let totalSquares = squarePerLine ** 2;

    for(let id = 1; id <= totalSquares; id++){
        const square = document.createElement("div");
        square.setAttribute("class", "square");
        square.setAttribute("id", `square-${id}`);
        board.appendChild(square);
    }
}

createBoard();