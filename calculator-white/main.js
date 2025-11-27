// 계산기 상태 관리
let currentValue = '0';
let previousValue = null;
let operator = null;
let shouldResetDisplay = false;

// DOM 요소 가져오기
const resultDisplay = document.querySelector('.result');
const buttons = document.querySelectorAll('button');

// 숫자 포맷팅 함수
function formatNumber(num) {
    if (num === null || num === undefined) return '0';
    
    // 소수점이 너무 길면 제한
    const numStr = num.toString();
    if (numStr.length > 12) {
        return parseFloat(num).toExponential(6);
    }
    return numStr;
}

// 화면 업데이트
function updateDisplay() {
    resultDisplay.textContent = formatNumber(currentValue);
}

// 숫자 입력 처리
function inputNumber(num) {
    if (shouldResetDisplay) {
        currentValue = '0';
        shouldResetDisplay = false;
    }
    
    if (currentValue === '0') {
        currentValue = num;
    } else {
        currentValue += num;
    }
    updateDisplay();
}

// 소수점 입력 처리
function inputDecimal() {
    if (shouldResetDisplay) {
        currentValue = '0';
        shouldResetDisplay = false;
    }
    
    if (!currentValue.includes('.')) {
        currentValue += '.';
        updateDisplay();
    }
}

// 연산자 처리
function handleOperator(nextOperator) {
    const inputValue = parseFloat(currentValue);
    
    if (previousValue === null) {
        previousValue = inputValue;
    } else if (operator && !shouldResetDisplay) {
        // 이전 연산이 있으면 먼저 계산
        const result = calculate();
        currentValue = String(result);
        previousValue = result;
        updateDisplay();
    } else {
        // 연산자만 바뀌는 경우 (연속으로 연산자 누름)
        previousValue = inputValue;
    }
    
    shouldResetDisplay = true;
    operator = nextOperator;
}

// 계산 수행
function calculate() {
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    
    if (isNaN(prev) || isNaN(current)) return current;
    
    switch (operator) {
        case '+':
            return prev + current;
        case '-':
            return prev - current;
        case '×':
            return prev * current;
        case '÷':
            return current !== 0 ? prev / current : 0;
        default:
            return current;
    }
}

// 모든 버튼에 이벤트 리스너 추가
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;
        
        // 숫자 버튼
        if (buttonText >= '0' && buttonText <= '9') {
            inputNumber(buttonText);
        }
        // 소수점
        else if (buttonText === '.') {
            inputDecimal();
        }
        // 연산자
        else if (['+', '-', '×', '÷'].includes(buttonText)) {
            handleOperator(buttonText);
        }
        // 등호
        else if (buttonText === '=') {
            if (previousValue !== null && operator) {
                const result = calculate();
                currentValue = String(result);
                previousValue = null;
                operator = null;
                shouldResetDisplay = true;
                updateDisplay();
            }
        }
        // AC (All Clear)
        else if (buttonText === 'AC') {
            currentValue = '0';
            previousValue = null;
            operator = null;
            shouldResetDisplay = false;
            updateDisplay();
        }
        // ± (부호 변경)
        else if (buttonText === '±') {
            if (shouldResetDisplay) {
                // 연산자 입력 후 부호 변경 시 previousValue도 업데이트
                if (previousValue !== null) {
                    previousValue = previousValue * -1;
                }
            }
            currentValue = String(parseFloat(currentValue) * -1);
            updateDisplay();
        }
        // % (퍼센트)
        else if (buttonText === '%') {
            currentValue = String(parseFloat(currentValue) / 100);
            updateDisplay();
        }
    });
});

// 초기 화면 설정
updateDisplay();

