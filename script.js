// Define variables and constants
const startButton = document.getElementById("start-button");
const quizSection = document.getElementById("quiz");
const resultSection = document.getElementById("result");
const landingPageSection = document.querySelector(".landing-page");
const scoreDisplay = document.getElementById("score");
const choices = document.querySelectorAll(".choice");
const submitButton = document.getElementById("submit-button");

// Define constants for quiz settings
const initialTime = 60; // Initial time for the quiz (adjust as needed)

// Define quiz questions and answers
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

// Define initial state variables
let currentQuestion = 0;
let score = 0;
let timeLeft = initialTime; // Initialize time with the initial time
let timerInterval; // Variable to hold the interval ID

// Event Listener for Start Quiz button
startButton.addEventListener("click", startQuiz);

// Function to start the quiz
function startQuiz() {
  startButton.style.display = "none";
  landingPageSection.style.display = "none"; // Hide the landing page
  quizSection.style.display = "block"; // Show the quiz
  showQuestion();
  startTimer(); // Start the timer
}

// Function to start the timer
function startTimer() {
  const timerElement = document.getElementById("timer");
  timerInterval = setInterval(function () {
    if (timeLeft <= 0 || currentQuestion >= questions.length) {
      clearInterval(timerInterval); // Stop the timer if the quiz is finished
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
    updateScoreDisplay(); // Update the score display
  } else {
    timeLeft -= 10; // Deduct time for incorrect answers
  }
  currentQuestion++;
  showQuestion();
}

// Function to update the score display
function updateScoreDisplay() {
  const scoreDisplay = document.getElementById("score-display");
  scoreDisplay.textContent = `Score: ${score}`;
}

// Function to end the quiz
function endQuiz() {
  quizSection.style.display = "none";
  resultSection.style.display = "block";
  scoreDisplay.textContent = score;
}

// Function to submit the score
function submitScore() {
  // Get the player's initials from the input field
  const initialsInput = document.getElementById("initials");
  const playerName = initialsInput.value.trim();

  if (!playerName) {
    // Check if initials are provided
    alert("Please enter your initials.");
    return;
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

  // Clear the input field
  initialsInput.value = "";

  alert("Score submitted successfully!");
}

// Function to return to the landing page
function returnHome() {
  // Reset quiz-related variables
  currentQuestion = 0;
  score = 0;
  timeLeft = initialTime; // Reset the timer

  // Reload the page to return to the landing page
  location.reload();
}

// Event Listener for exit button
document.getElementById("exit-button").addEventListener("click", returnHome);

// Event Listener for Submit Score button
submitButton.addEventListener("click", submitScore);

// Function to retrieve scores from local storage
function getScores() {
  // Retrieve scores from local storage, sort, and return them
  const scores = JSON.parse(localStorage.getItem("scores")) || [];
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

// Event Listener for View Leaderboard button
document
  .getElementById("leaderboard-button")
  .addEventListener("click", function () {
    // Toggle the visibility of the leaderboard section
    const leaderboardSection = document.getElementById("leaderboard");
    leaderboardSection.style.display = "block"; // Show the leaderboard section

    // Hide other sections (quiz and result)
    quizSection.style.display = "none";
    resultSection.style.display = "none";
    landingPageSection.style.display = "none";

    // Call the function to display leaderboard data (you may need to modify this function)
    displayScores();
  });

// Event Listener for Clear Leaderboard button
document
  .getElementById("clear-button")
  .addEventListener("click", clearLeaderboard);

// Function to clear the leaderboard and local storage
function clearLeaderboard() {
  // Clear the leaderboard displayed on the webpage
  const leaderboardTable = document.querySelector("tbody");
  leaderboardTable.innerHTML = ""; // This removes all rows from the leaderboard table

  // Clear the leaderboard data in local storage
  localStorage.removeItem("scores");
}

// Event Listener for Exit Leaderboard button
document
  .getElementById("exit-leaderboard-button")
  .addEventListener("click", exitLeaderboard);

// Function to exit the leaderboard and return to the landing page
function exitLeaderboard() {
  // Hide the leaderboard section
  const leaderboardSection = document.getElementById("leaderboard");
  leaderboardSection.style.display = "none";

  // Show the landing page
  landingPageSection.style.display = "block";
}

// Initial actions on window load
window.addEventListener("load", displayScores);
window.addEventListener("load", updateScoreDisplay);
