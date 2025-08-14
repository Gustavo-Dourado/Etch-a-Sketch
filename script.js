//get Elements
const board = document.querySelector(".board");
const redefineSquaresBtn = document.querySelector("#redefine-squares");

//add events
redefineSquaresBtn.addEventListener('click', redefineSquares);
board.addEventListener('mouseover', (e) => paintBlack(e.target));

//Constantes
const INITIAL = 16;
const WIDTH = board.clientWidth;

// function defineSquareBehavior(){}

function createBoard(){
    createSquares(INITIAL);
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

function redefineSquares(){
    const numberSquares = getUserNumberSquares();
    
    if (!numberSquares)
        return;

    createNewBoard(numberSquares)
}

function getUserNumberSquares(){
    const userAnwser = prompt("Escolha como você quer montar o quadro: \n Digite o número de quadrados por linha (1 a 100)");
    const userSquareNumber = parseInt(userAnwser);
    
    const validNumber = (userSquareNumber === 0 || userSquareNumber > 100) ? false : true;

    if(!userSquareNumber || !validNumber){
        alert("Escolha inválida, tente um número de 1 a 100");
        return null;
    }

    return userSquareNumber;
}

function createNewBoard(numberSquares){
    clearSquares();
    createSquares(numberSquares);
}

function clearSquares(){
    const squares = Array.from(board.children)
    squares.forEach(square => square.remove());
}

function paintBlack(square){
    if (!square.classList.contains("square"))
        return;

    square.style.backgroundColor = "black";
}

//Inicia o aplicativo
createBoard();