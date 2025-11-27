// Helper functions
function updateScreen(displayValue) {
    var displayValue = displayValue.toString();
    $('.screen').html(displayValue.substring(0, 10));
}

function isNumber(value) {
    return !isNaN(value);
}

function isOperator(value) {
    return value === '/' || value === '*' || value === '+' || value === '-';
}

function operate(a, b, operation) {
    a = parseFloat(a);
    b = parseFloat(b);
    console.log(a, b, operation);
    if (operation === '+') return a + b;
    if (operation === '-') return a - b;
    if (operation === '*') return a * b;
    if (operation === '/') return a / b;
    return 0;
}

$(document).ready(function() {
    var result = 0;
    var prevEntry = 0;
    var operation = null;
    var currentEntry = '0';
    updateScreen(result);
    
    $('.button').on('click', function(evt) {
        var buttonPressed = $(this).html();
        console.log(buttonPressed);
        
        if (buttonPressed === "AC") {
            result = 0;
            prevEntry = 0;
            operation = null;
            currentEntry = '0';
        } else if (buttonPressed === "back") {
            if (currentEntry.length > 1) {
                currentEntry = currentEntry.substring(0, currentEntry.length - 1);
            } else {
                currentEntry = '0';
            }
        } else if (buttonPressed === "+/-") {
            currentEntry = (parseFloat(currentEntry) * -1).toString();
        } else if (buttonPressed === '.') {
            if (currentEntry.indexOf('.') === -1) {
                currentEntry += '.';
            }
        } else if (isNumber(buttonPressed)) {
            if (currentEntry === '0') currentEntry = buttonPressed;
            else currentEntry = currentEntry + buttonPressed;
        } else if (isOperator(buttonPressed)) {
            if (operation !== null && currentEntry !== '') {
                currentEntry = operate(prevEntry, currentEntry, operation).toString();
            }
            prevEntry = parseFloat(currentEntry);
            operation = buttonPressed;
            // 화면에는 현재 값(또는 계산 결과)을 유지하고, 다음 입력을 위해 currentEntry는 비움
            updateScreen(currentEntry);
            currentEntry = '';
            return; // updateScreen이 이미 호출되었으므로 아래 updateScreen 호출을 건너뜀
        } else if(buttonPressed === '%') {
            currentEntry = (parseFloat(currentEntry) / 100).toString();
        } else if (buttonPressed === 'sqrt') {
            currentEntry = Math.sqrt(parseFloat(currentEntry)).toString();
        } else if (buttonPressed === '1/x') {
            currentEntry = (1 / parseFloat(currentEntry)).toString();
        } else if (buttonPressed === 'pi') {
            currentEntry = Math.PI.toString();
        } else if (buttonPressed === '=') {
            if (operation !== null && prevEntry !== null) {
                currentEntry = operate(prevEntry, currentEntry, operation).toString();
                operation = null;
                prevEntry = 0;
            }
        }
        
        updateScreen(currentEntry);
    });
});
