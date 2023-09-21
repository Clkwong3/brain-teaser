// Define variables
const startButton = document.getElementById("start");
const quizSection = document.getElementById("quiz");
const resultSection = document.getElementById("result");
const landingPageSection = document.getElementById("landing-page");
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
    document.querySelector("h2").textContent = `Question ${
      currentQuestion + 1
    }`;
    document.querySelector("p").textContent = questionData.question;
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

// Placeholder function for submitting scores
function submitScore() {
  // Implement your code for submitting scores here
  alert("Score submitted!"); // This is just a placeholder
}

// Event listeners
startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", submitScore);
