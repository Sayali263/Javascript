const choices = document.querySelectorAll(".choices");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const computerScorePara = document.querySelector("#computer-score");
const resetBtn = document.querySelector("#reset-btn");
const toggleDarkBtn = document.querySelector("#toggle-dark");
const body = document.querySelector("#body");

let userScore = 0;
let computerScore = 0;

// Sound elements
const clickSound = document.querySelector("#click-sound");
const winSound = document.querySelector("#win-sound");
const loseSound = document.querySelector("#lose-sound");
const drawSound = document.querySelector("#draw-sound");
// Possible choices
const options = ["rock", "papper", "scissor"];

// Generate computer choice
const genComputerChoice = () => {
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

// Draw game
const drawGame = () => {
  msg.innerText = "🤝 It's a Draw! Try again! 🤔";
  msg.classList.remove("text-green-500", "text-red-500");
  msg.classList.add("text-yellow-500");
   drawSound.play();
};

// Show winner
const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = `User Score: ${userScore}`;
    msg.innerText = `🎉 You Win! ${userChoice} beats ${compChoice} 🥳✨`;;
    msg.classList.remove("text-red-500", "text-yellow-500");
    msg.classList.add("text-green-500");
    winSound.play();
     // Confetti blast!
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#bb0000', '#ffffff', '#00bb00', '#0000bb', '#ffcc00']
    });
  } else {
    computerScore++;
    computerScorePara.innerText = `Computer Score: ${computerScore}`;
    msg.innerText = `😞You Lose! ${compChoice} beats ${userChoice}`;
    msg.classList.remove("text-green-500", "text-yellow-500");
    msg.classList.add("text-red-500");
    loseSound.play();
  }
};

// Play game
const playGame = (userChoice) => {
  clickSound.play();
  const compChoice = genComputerChoice();

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = false;

    if (
      (userChoice === "rock" && compChoice === "scissor") ||
      (userChoice === "papper" && compChoice === "rock") ||
      (userChoice === "scissor" && compChoice === "papper")
    ) {
      userWin = true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

// Add click listeners to each choice
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.id;
    playGame(userChoice);
  });
});
resetBtn.addEventListener("click", () => {
  userScore = 0;
  computerScore = 0;
  userScorePara.innerText = "User Score: 0";
  computerScorePara.innerText = "Computer Score: 0";
  msg.innerText = "Play Your Move";
  
  // Reset message styles
  msg.classList.remove("text-green-500", "text-red-500", "text-yellow-500");
  msg.classList.add("text-blue-600", "font-bold", "text-lg", "animate-pulse");
});
toggleDarkBtn.addEventListener("click", () => {
  body.classList.toggle("dark");

  // Optionally change button text/icon when toggled
  if (body.classList.contains("dark")) {
    toggleDarkBtn.innerText = "☀️ Light Mode";
  } else {
    toggleDarkBtn.innerText = "🌙 Dark Mode";
  }
});



