// Define variables
const startButton = document.getElementById("start-button");
const quizSection = document.getElementById("quiz");
const resultSection = document.getElementById("result");
const landingPageSection = document.querySelector(".landing-page");
const scoreDisplay = document.getElementById("score");
const choices = document.querySelectorAll(".choice");
const submitButton = document.getElementById("submit");

let currentQuestion = 0;
let score = 0;
let timeLeft = 60;

// Quiz questions and answers
const questions = [
  {
    question: "Testing",
    answers: ["1", "2", "3", "4"],
    correct: 0, // Index of the correct answer
  },
  {
    question: "Testing",
    answers: ["1", "2", "3", "4"],
    correct: 3, // Index of the correct answer
  },
  {
    question: "Testing",
    answers: ["1", "2", "3", "4"],
    correct: 2, // Index of the correct answer
  },
  {
    question: "Testing",
    answers: ["1", "2", "3", "4"],
    correct: 1, // Index of the correct answer
  },
];

// Function to start the quiz
function startQuiz() {
  startButton.style.display = "none";
  landingPageSection.style.display = "none"; // Hide the landing page
  quizSection.style.display = "block"; // Show the quiz
  showQuestion();

  // Start the timer
  const timerElement = document.getElementById("timer");
  const timer = setInterval(function () {
    if (timeLeft <= 0 || currentQuestion >= questions.length) {
      clearInterval(timer); // Stop the timer if the quiz is finished
      endQuiz();
    } else {
      timeLeft--;
      // Update the timer text
      timerElement.textContent = `Time Left: ${timeLeft}s`;
    }
  }, 1000);
}

// Function to show a question
function showQuestion() {
  if (currentQuestion < questions.length) {
    quizSection.style.display = "block";
    resultSection.style.display = "none";
    const questionData = questions[currentQuestion];
    document.querySelector("#quiz h2").textContent = `Question ${
      currentQuestion + 1
    }`;
    document.querySelector("#quiz p").textContent = questionData.question;
    for (let i = 0; i < choices.length; i++) {
      choices[i].textContent = questionData.answers[i];
      choices[i].addEventListener("click", checkAnswer);
    }
  } else {
    endQuiz();
  }
}

// Function to check the answer
function checkAnswer(event) {
  const selectedChoice = event.target;
  const questionData = questions[currentQuestion];
  if (
    selectedChoice.textContent === questionData.answers[questionData.correct]
  ) {
    score++;
  } else {
    timeLeft -= 10; // Deduct time for incorrect answers
  }
  currentQuestion++;
  showQuestion();
}

// Function to end the quiz
function endQuiz() {
  quizSection.style.display = "none";
  resultSection.style.display = "block";
  scoreDisplay.textContent = score;
}

// Function to submit the score
function submitScore() {
  const playerName = prompt("Enter your name:"); // Prompt user for their name
  if (!playerName) {
    return; // Do not save the score if no name is provided
  }

  const playerScore = {
    playerName,
    score, // Use the global score variable
  };

  // Retrieve existing scores from local storage and add the new score
  const scores = JSON.parse(localStorage.getItem("scores")) || [];
  scores.push(playerScore);

  // Store the updated scores back in local storage
  localStorage.setItem("scores", JSON.stringify(scores));

  alert("Score submitted successfully!");
}

// Function to retrieve scores from local storage
function getScores() {
  // Retrieve scores from local storage (assuming scores are stored as an array of objects)
  const scores = JSON.parse(localStorage.getItem("scores")) || [];
  // Sort scores in descending order (highest score first)
  scores.sort((a, b) => b.score - a.score);
  return scores;
}

// Function to display scores on the leaderboard page
function displayScores() {
  const leaderboardTable = document.querySelector("tbody");
  const scores = getScores();

  // Clear existing leaderboard data
  leaderboardTable.innerHTML = "";

  // Loop through scores and add them to the leaderboard
  scores.forEach((score, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${index + 1}</td>
            <td>${score.playerName}</td>
            <td>${score.score}</td>
        `;
    leaderboardTable.appendChild(row);
  });
}

// Function for the "View Leaderboard" button click
document
  .getElementById("leaderboard-button")
  .addEventListener("click", function () {
    // Toggle the visibility of the leaderboard section
    const leaderboardSection = document.getElementById("leaderboard");
    leaderboardSection.style.display =
      leaderboardSection.style.display === "none" ? "block" : "none";

    // Call the function to display leaderboard data (you may need to modify this function)
    displayScores();
  });

// Event listeners
startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", submitScore);
window.addEventListener("load", displayScores);
