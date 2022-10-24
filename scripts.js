//Nodes
const display = document.querySelector('#display');
const decimalButton = document.querySelector('#buttonDecimal');
const digitButtons = document.querySelectorAll('.digit');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('#buttonClear');
const equalsButton = document.querySelector('#buttonEquals');
const deleteButton = document.querySelector('#buttonDelete');
const negativeButton = document.querySelector('#buttonNegative');

//Operators
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const operate = (a, b, operator) => (operator)? operator(a,b) : a;

//Button click functions

let firstNum = "";
let lastNum = "";
let usingResult = false;
let currentOperation = null;
let divideByZero = false;
let currentNum = "first";

const decimalButtonClicked = function(e) {
    if(display.textContent.includes(".")) return;
    digitButtonClicked(e);
}

const digitButtonClicked = function(e) {
    if(divideByZero) {
        clear();
        divideByZero = false;
    }
    if(usingResult && !currentOperation) {
        clear();
        usingResult = false;
    }
    if(!currentOperation) {
        firstNum += e.target.textContent;
        currentNum = 'first';
    } else {
        lastNum += e.target.textContent;
        currentNum = 'last';
    }
    display.textContent += e.target.textContent;
}

const operatorButtonClicked = function(e) {
    if(currentOperation) {
        equalsButtonClicked();
        if(divideByZero) {
            return;
        }
    }
    if(divideByZero) {
        clear();
        divideByZero = false;
    }
    if(firstNum === "") return;
    display.textContent = "";
    currentOperation = e.target.id;
}

const clear = function() {
    if(divideByZero) {
        divideByZero = false;
    }
    display.textContent = "";
    firstNum = "";
    lastNum = "";
    currentOperation = null;
}

const equalsButtonClicked = function() {
    if(lastNum === "") return firstNum;
    let operator;
    switch(currentOperation) {
        case "add":
            operator = add;
            break;
        case "subtract":
            operator = subtract;
            break;
        case "multiply":
            operator = multiply;
            break;
        case "divide":
            operator = divide;
            if(parseFloat(lastNum) === 0) {
                display.textContent = "divzero err";
                lastNum = "";
                firstNum = "";
                divideByZero = true;
                return;
            }
            break;
        default:
            operator = null;
            break;
    }
    let result = operate(parseFloat(firstNum), parseFloat(lastNum), operator);
    firstNum = result;
    lastNum = "";
    currentOperation = null;
    usingResult = true;
    display.textContent = (result - Math.floor(result) < 0.0001)? result : result.toFixed(4);
}

const deleteButtonClicked = function() {
    if(divideByZero) {
        clear();
        divideByZero = false;
    }
    if(!display.textContent) return;
        if(currentNum === "first") {
            console.log("Display: " + display.textContent + "\n" + "First Num: " + firstNum);
            firstNum = firstNum.slice(0, -1);
            display.textContent = display.textContent.slice(0, -1);
        }
        if (currentNum === "last") {
        lastNum = lastNum.slice(0, -1);
        display.textContent = display.textContent.slice(0, -1);
    }
}

const negativeButtonClicked = function() {
    if(display.textContent) return;
    else if(display.textContent.includes("-")) return;
    else if(divideByZero) {
        clear();
        divideByZero = false;
    }
    else if(usingResult && !currentOperation) {
        clear();
        usingResult = false;
    }
    else if(!currentOperation) {
        firstNum += '-';
        currentNum = 'first';
    } else {
        lastNum += '-';
        currentNum = 'last';
    }
    display.textContent += '-';

}

//Event Listeners
decimalButton.addEventListener('click', decimalButtonClicked);
digitButtons.forEach(digitButton => digitButton.addEventListener('click', digitButtonClicked));
operatorButtons.forEach(operatorButton => operatorButton.addEventListener('click', operatorButtonClicked));
clearButton.addEventListener('click', clear);
equalsButton.addEventListener('click', equalsButtonClicked);
deleteButton.addEventListener('click', deleteButtonClicked);
negativeButton.addEventListener('click', negativeButtonClicked);



