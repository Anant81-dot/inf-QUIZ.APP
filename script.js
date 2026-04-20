// DOM ELEMENTS 
const startscreen = document.getElementById("start-screen");
const quizscreen = document.getElementById("quiz-screen");          // FIX 1: was "Quiz-screen" (wrong ID & capital Q)
const resultscreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answerContainer = document.getElementById("answers-container"); // FIX 2: was "answer-Container"
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");        // FIX 3: was "final-Score"
const resultmessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");         // FIX 4: was "restart-Btn"
const progressBar = document.getElementById("progress");

// Quiz questions 
const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Paris", correct: true },
            { text: "Madrid", correct: false },
        ],
    },
    {
        question: "Which Planet is known as the Red Planet?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false },
        ],
    },
    {
        question: "Which of these is NOT a programming language?",
        answers: [
            { text: "Java", correct: false },
            { text: "Banana", correct: true },
            { text: "Python", correct: false },
            { text: "JavaScript", correct: false },
        ],
    },
    {
        question: "What is the chemical symbol of Bromine?",
        answers: [
            { text: "Ag", correct: false },
            { text: "Br", correct: true },
            { text: "Bo", correct: false },
            { text: "Be", correct: false },
        ],
    },
    {
        question: "How many continents are there on Earth?",
        answers: [
            { text: "5", correct: false },
            { text: "6", correct: false },
            { text: "7", correct: true },
            { text: "8", correct: false },
        ],
    },
];

// QUIZ VARIABLES
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

// Event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;                                      // FIX 5: score was not reset to 0
    scoreSpan.textContent = 0;
    startscreen.classList.remove("active");
    quizscreen.classList.add("active");
    showQuestion();
}

function showQuestion() {
    answersDisabled = false;
    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    totalQuestionSpan.textContent = quizQuestions.length;

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";
    questionText.textContent = currentQuestion.question;

    answerContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");
        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
        answerContainer.appendChild(button);
    });
}

function selectAnswer(event) {
    if (answersDisabled) return;

    answersDisabled = true;
    const selectedButton = event.target;                             // FIX 6: was "selectButton" then used "selectedButton"
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answerContainer.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else if (button === selectedButton) {
            button.classList.add("incorrect");
        }
    });

    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();                                           // FIX 7: was "showRsults()" typo
        }
    }, 1000);
}

function showResults() {
    quizscreen.classList.remove("active");
    resultscreen.classList.add("active");
    finalScoreSpan.textContent = score;

    const percentage = (score / quizQuestions.length) * 100;

    if (percentage === 100) {
        resultmessage.textContent = "Perfect! You're a genius 🎉";
    } else if (percentage >= 80) {
        resultmessage.textContent = "Great job! You know your stuff 🔥";
    } else if (percentage >= 60) {
        resultmessage.textContent = "Good effort! Keep learning 📚";
    } else if (percentage >= 40) {
        resultmessage.textContent = "Not bad! Try again to improve 💪";
    } else {
        resultmessage.textContent = "Keep studying! Better luck next time 😊";
    }
}

function restartQuiz() {
    resultscreen.classList.remove("active");
    startQuiz();
}