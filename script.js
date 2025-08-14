//get Elements
const board = document.querySelector(".board");

const colorsButtonsContainer = document.querySelector(".colors-buttons");
const blackPaintBtn = document.querySelector("#black-paint");

// redefine está dentro de actions-buttons buttons-container
const redefineSquaresBtn = document.querySelector("#redefine-squares");

//Constantes
const INITIAL_BOARD = 16;
const WIDTH = board.clientWidth;
let actualColorButton = {active: "paint-black"};

//add events
redefineSquaresBtn.addEventListener('click', redefineSquares);


colorsButtonsContainer.addEventListener('click', (e) => activeColorButton(actualColorButton, e.target.id));

function initApp(){
    createSquares(INITIAL_BOARD);
    board.addEventListener('mouseover', (e) => runActiveColorButton(actualColorButton, e.target));
}


function activeColorButton(actualColorButton, colorButton){
    actualColorButton.active = colorButton;
}

function runActiveColorButton(actualColorButton, square){

    switch(actualColorButton.active){
        case "paint-black": 
            {   
                paintBlack(square);
                break;
            }
        case "paint-random":
            {
                paintRandom(square);
                break;
            }
        default: paintBlack(square);    
    }
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

function paintRandom(square){
    if (!square.classList.contains("square"))
        return;

    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    square.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

//Inicia o aplicativo
initApp();