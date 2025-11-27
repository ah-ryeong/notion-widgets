const secondHand = document.querySelector('.second-hand');
const minsHand = document.querySelector('.minute-hand');
const hoursHand = document.querySelector('.hour-hand');

const toggleBodyBackground = document.querySelector('body');
const toggleClockWidget = document.querySelector('.clock-widget');
const toggleAnalogContainer = document.querySelector('.analog-clock-hand-container');
const toggleButtonContainer = document.querySelector('.dark-mode-toggle-container');
const toggleButton = document.querySelector('.dark-mode-toggle');
const toggleMinuteHand = document.querySelector('.minute-hand_color');
const toggleHourHand = document.querySelector('.hour-hand_color');
const toggleRoundCenter = document.querySelector('.round-center-top');
let toggleNumber = document.querySelectorAll('.analog-clock-number');

const digitalClockWrapper = document.querySelector('.digital-clock-wrapper');
const digitalClock = document.querySelector('.digital-clock');
const digitalClockTimeIfDay = document.querySelector('.time-of-day');

function setDate(){
    const now = new Date();
    const seconds = now.getSeconds();
    const mins = now.getMinutes();
    const hours = now.getHours();


    const secondsDegree  = seconds * ( 360 / 60 ) + 90;
    const minsDegree = mins * ( 360 / 60 ) + 90;
    const hoursDegree = hours * ( 360 / 12 ) + 90;

    secondHand.style.transform = `rotate(${secondsDegree}deg)`;
    minsHand.style.transform = `rotate(${minsDegree}deg)`;
    hoursHand.style.transform  = `rotate(${hoursDegree}deg)`;
}

function digitalClockDate(){
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let timeOfDay = "AM";

    if(h == 0){
        h = 12;
    }

    if(h > 12){
        h = h - 12;
        timeOfDay = "PM";
    }

    m = (m < 10) ? "0" + m : m;

    let time = h + ":" + m;

    timeOfDay.fontsize(7);
    digitalClock.innerText = time;
    digitalClockTimeIfDay.innerHTML = timeOfDay;
}

function toggleMode() {
    toggleBodyBackground.classList.toggle("dark-mode");
    toggleClockWidget.classList.toggle("dark-mode");
    toggleAnalogContainer.classList.toggle("dark-mode");
    toggleButton.classList.toggle("dark-mode");
    toggleMinuteHand.classList.toggle("dark-mode");
    toggleHourHand.classList.toggle("dark-mode");
    toggleRoundCenter.classList.toggle("dark-mode");
    toggleButtonContainer.classList.toggle("dark-mode");
    digitalClockWrapper.classList.toggle("dark-mode");
    toggleNumber.forEach(function(el) {
        el.classList.toggle('dark-mode');
    });
}


function setNumberRotation() {
    const numberElements = document.querySelectorAll('.analog-clock-number');
    numberElements.forEach(function(el) {
        // 클래스명에서 숫자 추출 (예: "analog-clock-number_1" -> 1)
        const classList = Array.from(el.classList);
        const numberClass = classList.find(cls => cls.startsWith('analog-clock-number_'));
        if (numberClass) {
            const number = parseInt(numberClass.split('_')[1]);
            if (number >= 1 && number <= 11) {
                // 각 숫자의 회전 각도 계산 (1=30deg, 2=60deg, ...)
                const rotationAngle = number * 30;
                const reverseAngle = -rotationAngle;
                
                // 내부의 span 또는 div 찾아서 역회전 적용
                const innerElement = el.querySelector('span') || el.querySelector('div');
                if (innerElement) {
                    innerElement.style.transformOrigin = 'center';
                    innerElement.style.transform = `rotate(${reverseAngle}deg)`;
                }
            }
        }
    });
}

digitalClockDate();
setNumberRotation();
setInterval(setDate, 0);

