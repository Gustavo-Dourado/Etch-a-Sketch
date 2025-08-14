//get Elements
const board = document.querySelector(".board");

const styleButtonsContainer = document.querySelector(".styles-buttons");

const redefineSquaresBtn = document.querySelector("#redefine-squares");
const clearBoard = document.querySelector("#clear-board");

//Constantes globais
const globalState = {
    width: board.clientWidth,
    squaresPerLine: 16,
    actualStyleSquares: paintBlack,
}

const stylesFunctions = {
    black: paintBlack,
    random: paintRandom,
    white: paintWhite,
}

//add events
redefineSquaresBtn.addEventListener('click', redefineSquares);
clearBoard.addEventListener('click', () => createNewBoard(globalState));
styleButtonsContainer.addEventListener('click', (e) => defineStyleFunction(globalState, e.target));

function initApp(globalState){
    createSquares(globalState);
    addEventStyleSquares(globalState);
}

function defineStyleFunction(globalState, element){

    if(element.className != "button") return;
    
    if(element.id.includes("black"))
        globalState.actualStyleSquares = stylesFunctions.black;
    
    if(element.id.includes("random"))
        globalState.actualStyleSquares = stylesFunctions.random;

    if(element.id.includes("white"))
        globalState.actualStyleSquares = stylesFunctions.white;
    
    addEventStyleSquares(globalState);
}

function addEventStyleSquares(globalState){
    board.addEventListener('mouseover', (e) => applyStyleSquare(globalState, e.target));
}

function applyStyleSquare(globalState, square){
    if (!square.classList.contains("square")) return;
    globalState.actualStyleSquares(square);
}

function createSquares(globalState){
    const { width, squaresPerLine } = globalState;

    let widthSquare = width/squaresPerLine;
    
    let totalSquares = squaresPerLine ** 2;

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
    
    if (!numberSquares) return;

    globalState.squaresPerLine = numberSquares;

    createNewBoard(globalState);
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

function createNewBoard(globalState){
    clearSquares();
    createSquares(globalState);
}

function clearSquares(){
    const squares = Array.from(board.children)
    squares.forEach(square => square.remove());
}

function paintBlack(square){
    square.style.backgroundColor = "black";
}

function paintRandom(square){

    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    square.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

function paintWhite(square){
    square.style.backgroundColor = "white";
}

//Inicia o aplicativo
initApp(globalState);