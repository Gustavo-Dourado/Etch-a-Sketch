//get Elements
const board = document.querySelector(".board-container");
const defineSquares = document.querySelector("#define-squares");

//Constantes
const INITIAL_SQUARES = 16;
const WIDTH = board.clientWidth;

function createBoard(){
    createSquares(INITIAL_SQUARES);
}

function clearBoard(){
    //clear
    
}

function createSquares(squarePerLine){

    let widthSquare = WIDTH/squarePerLine;

    let totalSquares = squarePerLine ** 2;

    for(let id = 1; id <= totalSquares; id++){
        const square = document.createElement("div");
        square.setAttribute("class", "square");
        square.setAttribute("id", `square-${id}`);
        square.style.width = widthSquare;
        square.style.height = widthSquare;
        board.appendChild(square);
    }
}

function createNewBoard(){
    const userDefineNumber = prompt("Escolha como você quer montar o quadro: \n Digite o número de quadrados por linha (1 a 100)")

    if(!userDefineNumber || userDefineNumber === 0)
        alert("Escolha inválida, tente um número de 1 a 100")

    createSquares(userDefineNumber);
}

defineSquares.addEventListener('click', createNewBoard);
board.addEventListener('mouseover', (e) => paintBlack(e.target));

function paintBlack(square){
    if (!square.classList.contains("square"))
        return;

    square.style.backgroundColor = "black";
}


createBoard();