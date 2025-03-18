// Get references to display and buttons
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

// Setup initial variables
let currentDisplay = "0"; // Stores current display number
let firstNumber = null; // Stores the first number
let secondNumber = null; // Stores the second number
let currentOperator = null; // Stores the current operator
let isDecimalUsed = false; // Tracks if a decimal point has been used

// Function to update the display
function updateDisplay() {
    display.textContent = currentDisplay;
}

// Handle digit clicks
function handleDigit(digit) {
    if (currentDisplay === "0" && digit !== '−') {
        currentDisplay = digit; // Replace 0 with the first digit
    } else if (digit === '−' && currentDisplay === "0") {
        currentDisplay = digit; // Allow minus sign for negative numbers
    } else {
        currentDisplay += digit; // Append digits to the display
    }
    updateDisplay();
}

// Handle operator clicks (including minus)
function handleOperator(operator) {
    if (firstNumber === null) {
        firstNumber = currentDisplay; // Store the first number
        currentOperator = operator; // Store the current operator
        currentDisplay = "0"; // Reset current display for entering the second number
    } else {
        // If a second number is entered, calculate the result first
        secondNumber = currentDisplay;
        let result = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber));
        currentDisplay = result.toString(); // Update display with result
        firstNumber = currentDisplay; // Use result as first number for further operations
        currentOperator = operator; // Store the new operator
    }

    // Reset decimal flag for new number entry
    isDecimalUsed = false;
    updateDisplay(); // Update display
}

// Handle percentage button click
function handlePercentage() {
    if (currentDisplay !== "0") {
        currentDisplay = (parseFloat(currentDisplay) / 100).toString();
        updateDisplay();
    }
}

// Handle decimal button click
function handleDecimal() {
    if (!isDecimalUsed) {
        currentDisplay += '.'; // Append decimal point
        isDecimalUsed = true; // Mark decimal as used
    }
    updateDisplay();
}

// Handle equals button click
function handleEquals() {
    if (firstNumber !== null && currentOperator !== null && currentDisplay !== "0") {
        secondNumber = currentDisplay;
        let result = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber));
        currentDisplay = result.toString(); // Show the result
        firstNumber = null; // Reset first number for the next calculation
        currentOperator = null; // Reset operator
    }
    updateDisplay();
}

// Handle clear (C) button click
function handleClear() {
    currentDisplay = "0";
    firstNumber = null;
    secondNumber = null;
    currentOperator = null;
    isDecimalUsed = false;
    updateDisplay();
}

// Handle CE button click (clear entry)
function handleCE() {
    currentDisplay = "0"; // Reset current entry, not entire calculator
    updateDisplay();
}

// Handle backspace button click (←)
function handleBackspace() {
    if (currentDisplay.length > 1) {
        currentDisplay = currentDisplay.slice(0, -1); // Remove last character
    } else {
        currentDisplay = "0"; // If nothing left, reset to 0
    }
    updateDisplay();
}

// Function to perform calculations based on the operator
function operate(operator, num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    switch (operator) {
        case '+':
            return num1 + num2;
        case '−':
            return num1 - num2;
        case '×':
            return num1 * num2;
        case '÷':
            if (num2 === 0) {
                return "Error: Cannot divide by zero!";
            }
            return num1 / num2;
        default:
            return 0;
    }
}

// Add event listener for button clicks
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.innerText; // Get the text of the button clicked

        // Handle digit buttons (0-9)
        if (value >= '0' && value <= '9') {
            handleDigit(value);
        }
        // Handle minus button (for negative numbers and subtraction)
        else if (value === '−') {
            if (currentDisplay === "0") {
                handleDigit(value); // Allow minus for negative numbers
            } else {
                handleOperator(value); // Treat as subtraction operator
            }
        }
        // Handle other operator buttons (+, ×, ÷)
        else if (value === '+' || value === '×' || value === '÷') {
            handleOperator(value);
        }
        // Handle percentage button (%)
        else if (value === '%') {
            handlePercentage();
        }
        // Handle the decimal point button (.)
        else if (value === '.') {
            handleDecimal();
        }
        // Handle equals button (=)
        else if (value === '=') {
            handleEquals();
        }
        // Handle clear button (C)
        else if (value === 'C') {
            handleClear();
        }
        // Handle CE button (Clear Entry)
        else if (value === 'CE') {
            handleCE();
        }
        // Handle backspace button (←)
        else if (value === '←') {
            handleBackspace();
        }
    });
});