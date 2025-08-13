//get Elements
const board = document.querySelector(".board-container");
const userNumberSquares = document.querySelector("#user-number-squares");

//add events
userNumberSquares.addEventListener('click', getUserNumberSquares);
board.addEventListener('mouseover', (e) => paintBlack(e.target));

//Constantes
const INITIAL_SQUARES = 16;
const WIDTH = board.clientWidth;

function createBoard(){
    createSquares(INITIAL_SQUARES);
}

function createSquares(squarePerLine){

    let widthSquare = WIDTH/squarePerLine;
    
    let totalSquares = squarePerLine ** 2;

    for(let id = 1; id <= totalSquares; id++){
        
        const square = document.createElement("div");
        square.setAttribute("class", "square");
        square.setAttribute("id", `square-${id}`);
        square.style.width = `${widthSquare}px`;
        square.style.height = `${widthSquare}px`;
        square.style.border = "1px solid black";
        board.appendChild(square);
    }
}

function getUserNumberSquares(){
    const userSquareNumber = prompt("Escolha como você quer montar o quadro: \n Digite o número de quadrados por linha (1 a 100)");

    if(!userDefineNumber || userDefineNumber === 0)
        alert("Escolha inválida, tente um número de 1 a 100");

    createNewBoard(userSquareNumber);
}

function createNewBoard(userSquareNumber){
    clearSquares();
    createSquares(userSquareNumber);
}

function paintBlack(square){
    if (!square.classList.contains("square"))
        return;

    square.style.backgroundColor = "black";
}

//Inicia o aplicativo
createBoard();