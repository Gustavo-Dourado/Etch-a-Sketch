//get Elements
const board = document.querySelector(".board");

//Botões de Estilo
const styleButtonsContainer = document.querySelector(".styles-buttons"); //Cointainer com botões de estilo

const blackStyle = document.querySelector("#black-style");
// const randomStyle = document.querySelector("#random-style");
// const userStyle = document.querySelector("#user-style");
// const whiteStyle = document.querySelector("#white-style");

//Redefine Buttons
const redefineSquaresBtn = document.querySelector("#redefine-squares");
const clearBoard = document.querySelector("#clear-board");

//Constantes globais
const BOARD_WIDTH = board.clientWidth;
const LINE_SQUARES_NUMBER = 16;

const styleColorOptions = {
    black: {name: "black", rgb: "rgb(0, 0, 0)"}, 
    random: {name: "random", rgb: "random"}, 
    user: {name: "user", rgb: "input-value"}, 
    white: {name: "white", rgb: "rgb(255, 255, 255)"},
};

const globalState = {
    width: BOARD_WIDTH,
    squaresPerLine: LINE_SQUARES_NUMBER,
    activeStyleColor: styleColorOptions.black,
};

//add events
redefineSquaresBtn.addEventListener('click', redefineSquares);
clearBoard.addEventListener('click', () => createNewBoard(globalState));
styleButtonsContainer.addEventListener('click', (e) => defineStyleFunction(globalState, e.target));


function initApp(globalState){
    createSquares(globalState);
    board.addEventListener('mouseover', (e) => applyStyleSquare(globalState, e.target));
}

function defineStyleFunction(globalState, element){

    if(element.className != "button") return;

    const lastBtnActive = globalState.activeStyleColor.name
    document.querySelector(`#${lastBtnActive}-style`).classList.remove("active");
    
    if(element.id.includes(styleColorOptions.black.name))
        globalState.activeStyleColor = styleColorOptions.black;
    
    if(element.id.includes(styleColorOptions.random.name))
         globalState.activeStyleColor = styleColorOptions.random;

    if(element.id.includes(styleColorOptions.user.name))
        globalState.activeStyleColor = styleColorOptions.user;

    if(element.id.includes(styleColorOptions.white.name))
         globalState.activeStyleColor = styleColorOptions.white;

    element.classList.add("active");

    board.removeEventListener('mouseover', (e) => applyStyleSquare(globalState, e.target));
    board.addEventListener('mouseover', (e) => applyStyleSquare(globalState, e.target));
}

function applyStyleSquare(globalState, square){
    if (!square.classList.contains("square")) return;

    if (globalState.activeStyleColor === styleColorOptions.random){
        const randomRGB = generateRandomRGB();
        square.style.backgroundColor = randomRGB;
        return;
    }

    if (globalState.activeStyleColor === styleColorOptions.user){
        const userColor = document.querySelector("#user-input-color").value;
        square.style.backgroundColor = userColor;
        return;
    }
    
    square.style.backgroundColor = globalState.activeStyleColor.rgb;
}

function generateRandomRGB(){
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    return `rgb(${red}, ${green}, ${blue})`;
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
    board.addEventListener('mouseover', (e) => applyStyleSquare(globalState, e.target));
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

//Inicia o aplicativo
initApp(globalState);