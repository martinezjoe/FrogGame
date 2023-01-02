
const timeLeftDisplay = document.querySelector('#time-left');

const resultDisplay = document.querySelector('#result');

const startPauseButton = document.querySelector('#start-pause-button');

const squares = document.querySelectorAll('.grid div');

const logsLeft = document.querySelectorAll('.log-left');
const logsRight = document.querySelectorAll('.log-right');

const carsLeft = document.querySelectorAll('.car-left');
const carsRight = document.querySelectorAll('.car-right'); 

let currentIndex = 76;

const width = 9;

let timerId;
let timerIdCheck;

let currentTime = 10;


function moveFrog(e) {

    squares[currentIndex].classList.remove('frog');

    switch(e.key) {
        case 'ArrowLeft':
            if (currentIndex % width > 0 ) {
                currentIndex--;
            }
             break;
        case 'ArrowRight':
            if (currentIndex % width < width - 1) {
                currentIndex++; 
            }
            break;  
            
        case 'ArrowUp' :
            if (currentIndex > width) {
                currentIndex -= width;
            }
            break;

        case 'ArrowDown':
            if (currentIndex < 72) {
                currentIndex += width;
            } 
            break;
            
    };

    squares[currentIndex].classList.add('frog');
};



function autoMoveElements() {
    logsLeft.forEach(log => moveLogLeft(log));
    logsRight.forEach(log => moveLogRight(log));
    carsLeft.forEach(car => moveCarLeft(car));
    carsRight.forEach(car => moveCarRight(car));
    currentTime--;
    timeLeftDisplay.innerHTML = currentTime;
};

function moveLogLeft(log) {
    switch(true) {
        case log.classList.contains('l1'):
            log.classList.remove('l1');
            log.classList.add('l2');
            break;
        
        case log.classList.contains('l2'):
            log.classList.remove('l2');
            log.classList.add('l3');
            break;

        case log.classList.contains('l3'):
             log.classList.remove('l3');
             log.classList.add('l4');
             break;
        
        case log.classList.contains('l4'):
             log.classList.remove('l4');
             log.classList.add('l5');
             break;

        case log.classList.contains('l5'):
             log.classList.remove('l5');
             log.classList.add('l1');
             break;
    };
};

function moveLogRight(log) {
    switch(true) {
        case log.classList.contains('l1'):
            log.classList.remove('l1');
            log.classList.add('l5');
            break;
        
        case log.classList.contains('l2'):
            log.classList.remove('l2');
            log.classList.add('l1');
            break;

        case log.classList.contains('l3'):
             log.classList.remove('l3');
             log.classList.add('l2');
             break;
        
        case log.classList.contains('l4'):
             log.classList.remove('l4');
             log.classList.add('l3');
             break;

        case log.classList.contains('l5'):
             log.classList.remove('l5');
             log.classList.add('l4');
             break;
    };
};

function moveCarLeft(car) {
    switch(true) {
        case car.classList.contains('c1'):
            car.classList.remove('c1');
            car.classList.add('c2');
            break;
        
        case car.classList.contains('c2'):
            car.classList.remove('c2');
            car.classList.add('c3');
            break;

        case car.classList.contains('c3'):
             car.classList.remove('c3');
             car.classList.add('c1');
             break;
    };
};

function moveCarRight(car) {
    switch(true) {
        case car.classList.contains('c1'):
            car.classList.remove('c1');
            car.classList.add('c3');
            break;
        
        case car.classList.contains('c2'):
            car.classList.remove('c2');
            car.classList.add('c1');
            break;

        case car.classList.contains('c3'):
             car.classList.remove('c3');
             car.classList.add('c2');
             break;
    };
};

function checkForWinOrLose () {
    // Lose
    if(
        squares[currentIndex].classList.contains('c1') ||
        squares[currentIndex].classList.contains('l4') ||
        squares[currentIndex].classList.contains('l5') ||
        currentTime == 0
        ) {
        resultDisplay.innerHTML = 'Has perdido :( ... Intenta nuevamente presionando F5';
        clearInterval(timerId);
        clearInterval(timerIdCheck);
        squares[currentIndex].classList.remove('frog');
        squares[currentIndex].classList.add('dead');
        document.removeEventListener('keydown', moveFrog);
    } 
    
    // Win 

    if (squares[currentIndex].classList.contains('ending-block')) {
        resultDisplay.innerHTML = 'Has ganado !! :D ';
        clearInterval(timerId);
        clearInterval(timerIdCheck);
        document.removeEventListener('keydown', moveFrog);
    };
};


startPauseButton.addEventListener('click', () => {
    if(timerId) {
        clearInterval(timerId);
        clearInterval(timerIdCheck);
        document.removeEventListener('keydown', moveFrog);
        timerId = null;
    } else {
        timerId = setInterval(autoMoveElements, 1000);
        timerIdCheck = setInterval(checkForWinOrLose, 10);
        document.addEventListener('keydown', moveFrog);
    }
}); 




