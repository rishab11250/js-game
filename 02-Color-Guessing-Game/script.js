const colorDisplay = document.querySelector('#colorDisplay');
const messageDisplay = document.querySelector('#message');
const currentStreakDisplay = document.querySelector('#currentStreak');
const bestStreakDisplay = document.querySelector('#bestStreak');
const userName = document.querySelector('#name');
const colorBoxes = document.querySelectorAll('.color-box');

const heart = document.querySelectorAll('.heart');
const bheart = document.querySelectorAll('.bheart');

const newRoundBtn = document.querySelector('#newRoundBtn');
const easyBtn = document.querySelector('#easyBtn');
const hardBtn = document.querySelector('#hardBtn');
const resetStreakBtn = document.querySelector('#resetStreakBtn');
// variables
console.log(heart);
var currentStreak = 0; //user-> track
var bestStreak = 0; // previous data fetch -> store
var pickCorrectColor = 0; //-> random color
var color = []; // -> empty array -> 6 - color index - by - index
var num = 6; // -> loop control
var easyBestStreak = 0;
var heartCount = 3;
// userName.textContent = prompt("Enter your name: ");
function webLoad() { // -> we made this so that we can call the data whenever we want
    onLoad();
    setGame();
    displayContent();
}
// whenever the website will load then first it will load the entire data...
function onLoad() {
    // when website load then the previous high best streak data will fetch from the localstorage
    var temp2 = localStorage.getItem('easyBestStreak');
    if (temp2 != null) {
        easyBestStreak = parseInt(temp2);
    }
    else {
        easyBestStreak = 0;
    }
    var temp = localStorage.getItem('highBestStreak');
    if (temp != null) {
        bestStreak = parseInt(temp); // -> here the localsotrage contains the data so it will return that data
        // parseInt -> it will convert string to integer that is because the localstorage store data in string format
    }
    else {
        bestStreak = 0; // --> if there is no data in the localstorage then it will return null so we will assign 0 to bestStreak
    }
}

// here we will define the display content message in a function format..

function displayContent() {
    currentStreakDisplay.textContent = currentStreak;
    if (num == 6) {
        bestStreakDisplay.textContent = bestStreak;
    }
    else {
        bestStreakDisplay.textContent = easyBestStreak;
    }
}
// random color generate
function colorGenerate() {
    var a = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var c = Math.floor(Math.random() * 256);
    return `rgb(${a}, ${b}, ${c})`;
}
// generate array of colors 
function generateColors(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push(colorGenerate()); // -> it will push the random color in the array
    }
    return arr;
}
// pick random color from array
function pickGenerate() {
    const index = Math.floor(Math.random() * color.length);
    return color[index];
}
// set game function
function setGame() {
    color = generateColors(num); // -> it will generate array of colors
    pickCorrectColor = pickGenerate(); // -> it will pick random color from the array
    console.log(pickCorrectColor);
    console.log(color);
    colorDisplay.textContent = pickCorrectColor; // -> it will display the picked color in the h1 tag
    console.log(color);
    for (var i = 0; i < color.length; i++) {
        colorBoxes[i].style.backgroundColor = color[i]; // -> it will assign the colors to the boxes
    }
}
function reset() {
    heartCount = 3;
    colorDisplay.style.backgroundColor = 'white';
    heart.forEach((heart) => {
        heart.style.display = "block";
    });
    bheart.forEach((heart) => {
        heart.style.display = "none";
    });
    // 1. Correct Color Glows When Clicked
    colorBoxes.forEach((box) => {
        box.style.border = '5px solid transparent'
    });
    // 2. "Streak!" Message When Streak ≥ 3

    currentStreakDisplay.style.color = '#4ECDC4'
    if (num == 3) {
        currentStreak = 0;
        easyBestStreak = 0;
        localStorage.removeItem('easyBestStreak');
        messageDisplay.textContent = 'You reset your Best Streak';
        colorBoxes.forEach((box) => {
            box.style.pointerEvents = "auto"; // enables clicking
        });
    }
    else {
        currentStreak = 0;
        bestStreak = 0;
        localStorage.removeItem('highBestStreak');
        messageDisplay.textContent = 'You reset your Best Streak';
        colorBoxes.forEach((box) => {
            box.style.pointerEvents = "auto"; // enables clicking
        });
    }
    displayContent();
    setGame();
}
function newRound() {
    if (heartCount == 0) {
        heartCount = 3;
        bheart.forEach((heart) => {
            heart.style.display = "none";
        });
        heartCount = 3;
        heart.forEach((heart) => {
            heart.style.display = "block";
        });
    }
    // 1. Correct Color Glows When Clicked
    colorBoxes.forEach((box) => {
        box.style.border = '5px solid transparent'
    });
    colorDisplay.style.backgroundColor = 'white'; // -> reset the background color of h1
    // 2. "Streak!" Message When Streak ≥ 3

    currentStreakDisplay.style.color = '#4ECDC4'
    setGame();
    messageDisplay.textContent = 'New Round Started !';
    displayContent();
    colorBoxes.forEach((box) => {
        box.style.pointerEvents = "auto"; // enables clicking
    });
}
webLoad();
function winGuess(event) {
    var tempBox = event.target; // -> it will store the clicked box
    if (pickCorrectColor === tempBox.style.backgroundColor) {
        currentStreak++;
        //4. Show "First Win!" on First Correct Answer
        if(currentStreak == 1){
            messageDisplay.textContent = 'First Win!';
        }
        else{
            messageDisplay.textContent = 'You Won!!';
        }
        if (num == 6) {
            // 2. "Streak!" Message When Streak ≥ 3

            if (currentStreak >= 3) {
                currentStreakDisplay.style.color = 'green'
            }
            if (currentStreak > bestStreak) {
                bestStreak = currentStreak;
                // 5. Header Text Becomes Bold on New Best Streak
                colorDisplay.style.fontWeight = 'bold'
                localStorage.setItem('highBestStreak', bestStreak);
                displayContent(); // <-- update display immediately
            } else {
                displayContent();
            }
        }
        else {
            // 2. "Streak!" Message When Streak ≥ 3

            if (currentStreak >= 3) {
                currentStreakDisplay.style.color = 'green'
            }
            if (currentStreak > easyBestStreak) {
                easyBestStreak = currentStreak;
                // 5. Header Text Becomes Bold on New Best Streak
                colorDisplay.style.fontWeight = 'bold'
                localStorage.setItem('easyBestStreak', easyBestStreak);
                displayContent(); // <-- update display immediately
            } else {
                displayContent();
            }
        }

        // Show winning color everywhere
        colorBoxes.forEach((box) => {
            if (box.style.pointerEvents != "none") {
                box.style.backgroundColor = pickCorrectColor;
                // 1. Correct Color Glows When Clicked
                box.style.border = '5px solid yellow'
            }
            box.style.pointerEvents = "none"; // disables clicking
        });
        colorDisplay.style.backgroundColor = pickCorrectColor;
    }
    else {
        if (heartCount > 1) {
            messageDisplay.textContent = 'Wrong Guess! You lost a heart.';
            heartCount--;
            tempBox.style.backgroundColor = '#808080';
            tempBox.classList.add('shake');
            tempBox.style.pointerEvents = "none";
            heart[heartCount].style.display = "none";
            console.log(heartCount);
        }
        else {
            heartCount--;
            tempBox.style.backgroundColor = '#808080';
            tempBox.style.pointerEvents = "none";
            heart[heartCount].style.display = "none";
            messageDisplay.textContent = 'Try Again !';
            currentStreak = 0;
            displayContent();
            colorBoxes.forEach((box) => {
                box.style.pointerEvents = "none";
                box.style.backgroundColor = '#808080';
            });
        }
    }
}
colorBoxes.forEach((box) => {
    console.log(box); // -> it will log each box
    box.addEventListener('click', winGuess); // -> when we click on any box it will call the winGuess function
});
function easyBn() {
    num = 3;
    currentStreak = 0;
    messageDisplay.textContent = 'You switched to Easy Mode';
    displayContent();
    setGame();
    // 3. Easy Mode Button Turns Green When Selected
    easyBtn.style.backgroundColor = "lightgreen";
    easyBtn.style.color = "#343637";
    hardBtn.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
    hardBtn.style.color = "white";
    for (var i = 3; i < 6; i++) {
        colorBoxes[i].style.display = "none";
        colorBoxes[i].style.pointerEvents = "none";
    }
}
function hardBn() {
    num = 6;
    currentStreak = 0;
    messageDisplay.textContent = 'You switched to Hard Mode';
    displayContent();
    setGame();
    hardBtn.style.backgroundColor = "white";
    hardBtn.style.color = "#343637";
    easyBtn.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
    easyBtn.style.color = "white";
    for (var i = 3; i < 6; i++) {
        colorBoxes[i].style.display = "block";
        colorBoxes[i].style.pointerEvents = "auto";
    }
}
resetStreakBtn.addEventListener('click', reset);
newRoundBtn.addEventListener('click', newRound);
easyBtn.addEventListener('click', easyBn);
hardBtn.addEventListener('click', hardBn);