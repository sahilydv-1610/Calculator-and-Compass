let currentInput = '0';
let previousInput = '';
let operation = null;
let resetInput = false;

const display = document.getElementById('calc-display');
const historyDisplay = document.getElementById('calc-history');

function updateDisplay() {
    display.value = currentInput;
}

function appendNumber(number) {
    if (currentInput === '0' || resetInput) {
        currentInput = number.toString();
        resetInput = false;
    } else {
        currentInput += number.toString();
    }
    updateDisplay();
}

function appendDecimal() {
    if (resetInput) {
        currentInput = '0.';
        resetInput = false;
    } else if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

function toggleSign() {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
}

function appendOperator(op) {
    if (operation !== null) calculate();
    previousInput = currentInput;
    operation = op;
    resetInput = true;
    historyDisplay.textContent = `${previousInput} ${operation}`;
}

function scientificOperation(func) {
    let result;
    const input = parseFloat(currentInput);
    
    switch(func) {
        case 'sqrt':
            result = Math.sqrt(input);
            break;
        case 'pow':
            previousInput = currentInput;
            operation = '^';
            resetInput = true;
            historyDisplay.textContent = `${previousInput} ${operation}`;
            return;
        case 'sin':
            result = Math.sin(input * Math.PI / 180);
            break;
        case 'cos':
            result = Math.cos(input * Math.PI / 180);
            break;
        case 'tan':
            result = Math.tan(input * Math.PI / 180);
            break;
    }
    
    addToHistory(`${func}(${currentInput}) = ${result}`);
    currentInput = result.toString();
    updateDisplay();
}

function calculate() {
    if (operation === null || resetInput) return;
    
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    switch(operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        case '^':
            result = Math.pow(prev, current);
            break;
    }
    
    addToHistory(`${previousInput} ${operation} ${currentInput} = ${result}`);
    currentInput = result.toString();
    operation = null;
    resetInput = true;
    historyDisplay.textContent = '';
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    historyDisplay.textContent = '';
    updateDisplay();
}

function backspace() {
    if (currentInput.length === 1 || (currentInput.length === 2 && currentInput.startsWith('-'))) {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

// Initialize display
updateDisplay();

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendNumber(parseInt(e.key));
    else if (e.key === '.') appendDecimal();
    else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        appendOperator(e.key);
    }
    else if (e.key === 'Enter' || e.key === '=') calculate();
    else if (e.key === 'Escape') clearDisplay();
    else if (e.key === 'Backspace') backspace();
});