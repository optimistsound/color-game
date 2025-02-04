const colorBox = document.getElementById("colorBox");
const colorOptionsContainer = document.getElementById("colorOptions");
const gameStatus = document.getElementById("gameStatus");
const scoreDisplay = document.getElementById("score");
const newGameButton = document.getElementById("newGameButton");

let targetColor;
let score = 0;
let buttonsDisabled = false;

// Function to generate a random color with similar hues
function getSimilarColor() {
    // Starting with a random hue (hue: 0-360 degrees)
    const hue = Math.floor(Math.random() * 360);

    // Lightness and saturation values based on the difficulty
    const lightness = 50 + Math.floor(Math.random() * 10); // Lightness between 50 and 60 for slight contrast
    const saturation = 50 + Math.floor(Math.random() * 30); // Saturation between 50 and 80 for color variety

    // Returning the HSL color value
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

// Function to start a new game or reset the game on wrong guess
function startGame(isGameOver = false) {
    colorOptionsContainer.innerHTML = ""; // Clear previous buttons
    buttonsDisabled = false; // Enable buttons for a new game

    if (isGameOver) {
        scoreDisplay.textContent = score;
        gameStatus.textContent = "Game Over! Click 'New Game' to Restart.";
        gameStatus.style.color = "red";
        colorBox.style.backgroundColor = "#fff"; // Reset color box
        disableButtons();
    } else {
        let numButtons = 6; // Fixed number of buttons (no increase in buttons)
        
        let colors = [];
        for (let i = 0; i < numButtons; i++) {
            colors.push(getSimilarColor()); // Generate similar colors
        }

        targetColor = colors[Math.floor(Math.random() * colors.length)];
        colorBox.style.backgroundColor = targetColor;

        colors.forEach(color => {
            let button = document.createElement("button");
            button.classList.add("color-btn");
            button.style.backgroundColor = color;
            button.onclick = () => checkAnswer(color);

            colorOptionsContainer.appendChild(button);
        });

        gameStatus.textContent = "";
    }
}

// Function to check the user's guess and reset if they miss
function checkAnswer(selectedColor) {
    if (buttonsDisabled) return; // If buttons are disabled, do nothing

    if (selectedColor === targetColor) {
        gameStatus.textContent = "Correct!";
        gameStatus.style.color = "green";
        score++;
        scoreDisplay.textContent = score;
        startGame();
    } else {
        gameStatus.textContent = "Wrong, try again!";
        gameStatus.style.color = "red";
        startGame(true); // Start over if the user is wrong
    }
}

// Disable all color buttons
function disableButtons() {
    const buttons = document.querySelectorAll(".color-btn");
    buttons.forEach(button => {
        button.disabled = true; // Disable each button after game over
    });
}

// Event listener for new game button
newGameButton.addEventListener("click", () => {
    score = 0;
    startGame(); // Restart the game when clicked
});

// Start the game initially
startGame();