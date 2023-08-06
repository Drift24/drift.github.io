//target all elements to save to constants
const Aboutbtn = document.querySelector("#Aboutbtn");
const Historybtn = document.querySelector("#Historybtn");
const Productionbtn = document.querySelector("#Productionbtn");
const Preperationbtn = document.querySelector("#Preperationbtn");
const menuIcon = document.querySelector(".menu-icon");
const navList = document.querySelector("ul");
const navElement = document.querySelector('nav');
const headers = document.querySelectorAll(".header");
const sections = document.querySelectorAll('section');
const questionElement = document.getElementById("question");
const answerbuttons = document.getElementById("answer-buttons");
const nextbutton = document.getElementById("nextbtn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextbutton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerbuttons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  })
}

function resetState() {
  nextbutton.style.display = "none";
  while (answerbuttons.firstChild) {
    answerbuttons.removeChild(answerbuttons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct == "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerbuttons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  })
  nextbutton.style.display = "block";
}

nextbutton.addEventListener('click', () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
})
function showScore() {
  resetState();
  questionElement.innerHTML = `Your Scored ${score} out of ${questions.length}!`;
  nextbutton.innerHTML = "play Again";
  nextbutton.style.display = "block";
}
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

const questions = [
  {
    question: "What is matcha?",
    answers: [
      { text: "A drug", correct: false },
      { text: "Tea", correct: true },
      { text: "Medicine", correct: false },
      { text: "Building Block", correct: false },
    ]
  },
  {
    question: "When was matcha first founded?",
    answers: [
      { text: "7th century", correct: true },
      { text: "10th centry", correct: false },
      { text: "13th century", correct: false },
      { text: "21st century", correct: false },
    ]
  },
  {
    question: "How many forms does matcha have?",
    answers: [
      { text: "1", correct: false },
      { text: "2", correct: true },
      { text: "3", correct: false },
      { text: "4", correct: false },
    ]
  },

]

headers.forEach(header => {
  header.addEventListener("click", () => {
    header.nextElementSibling.classList.toggle("active");
  });
});


menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("active");
  navList.classList.toggle("active");
});
// Function to toggle the sticky class based on scroll position
function toggleStickyNav() {
  if (window.scrollY > navElement.offsetTop) {
    navElement.classList.add('sticky');
  } else {
    navElement.classList.remove('sticky');
  }
}

// Add event listener to detect scrolling and call the toggleStickyNav function
window.addEventListener('scroll', toggleStickyNav);

window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop;
    let height = sec.offsetHeight;

    if (top >= offset && top < offset + height) {
      sec.classList.add('show-animate');
    }
    //for repeating animaton on scrollgameWidth
    else {
      sec.classList.remove('show-animate');
    }
  })
}


startQuiz();