// Game elements
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const playerChoiceEl = document.getElementById('player-choice');
const computerChoiceEl = document.getElementById('computer-choice');
const resultEl = document.getElementById('results');
const choiceBtns = document.querySelectorAll('.choice-btn');
const resetBtn = document.getElementById('reset');

// Game variables
let playerScore = 0;
let computerScore = 0;
let gameOver = false;

// Emoji mapping
const emojis = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};

// Computer choice function
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Play round function
function playRound(playerSelection) {
    if (gameOver) return;
    
    const computerSelection = getComputerChoice();
    
    // Update choice displays
    playerChoiceEl.textContent = emojis[playerSelection];
    computerChoiceEl.textContent = emojis[computerSelection];
    
    // Determine winner
    if (playerSelection === computerSelection) {
        resultEl.textContent = "It's a tie!";
    } else if (
        (playerSelection === 'rock' && computerSelection === 'scissors') ||
        (playerSelection === 'paper' && computerSelection === 'rock') ||
        (playerSelection === 'scissors' && computerSelection === 'paper')
    ) {
        playerScore++;
        playerScoreEl.textContent = playerScore;
        resultEl.textContent = `You win! ${capitalizeFirstLetter(playerSelection)} beats ${computerSelection}`;
    } else {
        computerScore++;
        computerScoreEl.textContent = computerScore;
        resultEl.textContent = `You lose! ${capitalizeFirstLetter(computerSelection)} beats ${playerSelection}`;
    }
    
    // Check for game winner
    if (playerScore >= 5 || computerScore >= 5) {
        gameOver = true;
        const winner = playerScore > computerScore ? "You" : "Computer";
        resultEl.textContent += `\n\nGame over! ${winner} won the game!`;
        resetBtn.textContent = "Play Again";
    }
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Event listeners
choiceBtns.forEach(button => {
    button.addEventListener('click', () => {
        const playerChoice = button.id;
        playRound(playerChoice);
    });
});

resetBtn.addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    gameOver = false;
    playerScoreEl.textContent = '0';
    computerScoreEl.textContent = '0';
    playerChoiceEl.textContent = '❔';
    computerChoiceEl.textContent = '❔';
    resultEl.textContent = 'Make your choice to start the game!';
    resetBtn.textContent = "Reset Game";
});