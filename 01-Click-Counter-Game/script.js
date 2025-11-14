var currentScore = document.querySelector('#currentScore')
var highScore = document.querySelector('#highScore');
var timer = document.querySelector('#timer');
var clickButton = document.querySelector('#clickButton');
var startButton = document.querySelector('#startButton');
var resetButton = document.querySelector('#resetButton');
var statusMessage = document.querySelector('#statusMessage');
var pauseButton = document.querySelector('#pauseButton')
var resumeButton = document.querySelector('#resumeButton')
var video = document.querySelector('#video')

// extra variable required -> total:5
var current = 0;
var high = 0;
var timer1 = 10;
var flag = false;
var timeId = null;
var transform = 1
var flag2 = false;
var username = prompt("Enter Your Name");

function onWebsite() {
    loadData();
    displayContent();
}

function loadData() {
    var temp = localStorage.getItem('highScore');
    if (temp != null) {
        high = temp;
    }
    else {
        high = 0;
    }
}

function displayContent() {
    currentScore.textContent = current;
    highScore.textContent = high;
    timer.textContent = timer1;
    if (current >= 20) {
        // 1. Click Counter Turns Red When > 20
        currentScore.style.color = 'red';
    }
}

function statusMsg(msg) {
    statusMessage.textContent = msg;
}

function endGame() {
    clearInterval(timeId);
    flag = false;
    flag2 = false
    clickButton.disabled = true;
    clickButton.style.backgroundColor = 'lightgrey'

    if (current > high) {
        // If new high score → change background to yellow flash for 1 sec.
        // 6. Confetti on New High Score
        setTimeout(function () {
            document.body.style.background = 'gold';
        }, 1000);

        video.style.display = 'block'
        localStorage.setItem('highScore', current);
        high = current
        highScore.textContent = current;
        video.play();
        statusMsg(`${username} scored more than the previous high score.`);
    }
    else {
        statusMsg(`your current score is ${current}`);
    }

    // 4. Show Clicks Per Second (CPS)
    alert(`You clicked ${current / 10} times per second`)

    current = 0
    // 5. Start Button Says "Play Again" After Game
    startButton.innerText = "Play Again"
    clickButton.style.transform = 'scale(1)'
    timer1 = 10;
    startButton.disabled = false;
    startButton.style.display = 'block'
    startButton.style.cursor = 'pointer'
    pauseButton.style.display = 'none'
    resumeButton.style.display = 'none'
    displayContent();
    currentScore.style.color = 'white'
}

function startGame() {
    transform = 1
    currentScore.style.color = 'white'
    flag2 = false;
    video.style.display = 'none';
    clickButton.disabled = false;
    clickButton.style.backgroundColor = 'purple'
    clickButton.style.cursor = 'pointer'
    startButton.disabled = true;
    startButton.style.display = 'none'
    pauseButton.style.display = 'block'
    resumeButton.style.display = 'none'
    flag = true;

    // When game starts, show "Click Me!" for 1 second, then change the message
    setTimeout(function () { statusMsg("The game is started"); }, 1000);
    // 2. "Click Me!" Message Flashes on Start
    statusMsg("Click Me!");

    timeId = setInterval(function () {
        if (!flag2) {
            timer1--;
            if (timer1 <= 0) {
                endGame();
            }
            displayContent();
        }
    }, 1000);
}

function userClick() {
    if (flag && !flag2) {
        current++
        // 3. Button Grows When You Click (max 2x size)
        if (transform < 2.0) {
            transform = transform + 0.1
        }
        // Correct CSS scale syntax
        clickButton.style.transform = `scale(${transform})`;
        displayContent();
    }
}

function reset() {
    localStorage.removeItem('highScore')
    high = 0;
    current = 0
    displayContent();
    endGame();
    statusMsg("You reset your high score. It is now 0.");
}

function pause() {
    flag2 = true
    statusMsg("Game Paused");
    clickButton.disabled = true;
    clickButton.style.backgroundColor = 'lightgrey'
    clickButton.style.cursor = 'not-allowed';
    resumeButton.style.display = 'block';
    pauseButton.style.display = 'none';
}

function resume() {
    statusMsg("Game resumed")
    flag2 = false;
    clickButton.disabled = false;
    clickButton.style.backgroundColor = 'purple'
    clickButton.style.cursor = 'pointer'
    pauseButton.style.display = 'block';
    resumeButton.style.display = 'none';
}

onWebsite();

startButton.addEventListener('click', startGame);
clickButton.addEventListener('click', userClick);
resetButton.addEventListener('click', reset);
pauseButton.addEventListener('click', pause);
resumeButton.addEventListener('click', resume);