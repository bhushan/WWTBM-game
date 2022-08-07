const questions = [
  {
    question: "In 2016, whom did Boris Johnson succeed as Foreign Secretary?",
    level: 1,
    options: {
      a: "Liam Fox",
      b: "Philip Hammond",
      c: "Kenneth Clarke",
      d: "William Hague",
    },
    correctAnswer: "b",
  },
  {
    question: "question asked Level 2",
    level: 2,
    options: {
      a: "option a",
      b: "option b",
      c: "option c",
      d: "option d",
    },
    correctAnswer: "a",
  },
  {
    question: "question asked Level 3",
    level: 3,
    options: {
      a: "option a",
      b: "option b",
      c: "option c",
      d: "option d",
    },
    correctAnswer: "a",
  },
];

const questionsAskedInEachLevel = 5;

let currentLevel = 1;
let optionSelected = false;
let currentQuestion = {};

const questionElement = document.querySelector(".question");
const optionElements = document.querySelectorAll(".option");

const resetState = () => {
  currentLevel = 1;
  optionSelected = false;
  currentQuestion = {};
  optionElements.forEach((element) =>
    element.classList.remove("selected", "correct")
  );
};

// start()
// getRandomQuestion from question bank with level
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const getRandomQuestion = (level = 1) => {
  // TODO: use levels to fetch correct level question
  const questionsCount = questions.length;
  if (questionsCount === 0) {
    alert(
      "All questions have been asked already, fill up question bank with more questions"
    );
    return {};
  }

  const randomIndex = getRandomArbitrary(0, questionsCount);

  const question = questions[randomIndex];

  questions.splice(randomIndex, 1);

  return question;
};

const attachEventListForSelection = () => {
  optionElements.forEach((optionElement) =>
    optionElement.addEventListener("click", function () {
      if (optionSelected) return;
      optionElement.classList.add("selected");
      optionSelected = true;
      if (Object.keys(currentQuestion).length === 0) {
        return;
      }
      const { correctAnswer } = currentQuestion;
      const correctOptionElement = document.querySelector(
        `.option .${correctAnswer}`
      );
      correctOptionElement.parentNode.classList.remove("selected");
      correctOptionElement.parentNode.classList.add("correct");
    })
  );
};

const attachEventListnerForNextQuestion = () => {
  questionElement.addEventListener("click", function () {
    if (!optionSelected) return;
    resetState();
    currentQuestion = getRandomQuestion(currentLevel);
    if (Object.keys(currentQuestion).length === 0) {
      return;
    }
    displayQuestion(currentQuestion);
  });
};

const start = () => {
  currentQuestion = getRandomQuestion(currentLevel);
  if (Object.keys(currentQuestion).length === 0) {
    return;
  }
  displayQuestion(currentQuestion);
  attachEventListForSelection();
  attachEventListnerForNextQuestion();
};

const displayQuestion = ({ question, options }) => {
  questionElement.innerText = question;

  const optionAElement = document.querySelector(".option .a");
  const optionBElement = document.querySelector(".option .b");
  const optionCElement = document.querySelector(".option .c");
  const optionDElement = document.querySelector(".option .d");

  optionAElement.innerText = options.a;
  optionBElement.innerText = options.b;
  optionCElement.innerText = options.c;
  optionDElement.innerText = options.d;
};

start();
