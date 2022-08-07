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

let currentLevel = 1;
let optionSelected = false;
let currentQuestionNumber = 1;
let currentQuestion = {};

let questionStates = Array.from({ length: 15 });

const questionsAskedInEachLevel = 5;

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

const resetGame = () => {
  location.reload();
};

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

function submitAnswer(event) {
  if (optionSelected) return;
  let optionElement = event.target;

  if (optionElement !== this) {
    optionElement = event.target.parentNode;
  }

  optionElement.classList.add("selected");
  optionSelected = true;
  if (Object.keys(currentQuestion).length === 0) {
    return;
  }
  const { correctAnswer } = currentQuestion;
  const correctOptionElement = document.querySelector(
    `.option .${correctAnswer}`
  ).parentNode;

  correctOptionElement.classList.remove("selected");
  correctOptionElement.classList.add("correct");

  if (currentQuestionNumber > 15) {
    return;
  }

  const leaderboard = document.querySelector(
    `[data-value='${currentQuestionNumber}']`
  );

  leaderboard.classList.remove("current");

  if (optionElement === correctOptionElement) {
    questionStates[currentQuestionNumber - 1] = true;
    leaderboard.classList.add("correct");
  } else {
    questionStates[currentQuestionNumber - 1] = false;
    leaderboard.classList.add("wrong");
  }
}

const proceedToNextQuestion = () => {
  if (!optionSelected) return;
  resetState();
  currentQuestion = getRandomQuestion(currentLevel);
  if (Object.keys(currentQuestion).length === 0) {
    return;
  }

  currentQuestionNumber++;

  if (currentQuestionNumber > 15) {
    resetGame();
    return;
  }

  const leaderboard = document.querySelector(
    `[data-value='${currentQuestionNumber}']`
  );
  leaderboard.classList.add("current");
  displayQuestion(currentQuestion);
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

optionElements.forEach((optionElement) =>
  optionElement.addEventListener("click", submitAnswer)
);
questionElement.addEventListener("click", proceedToNextQuestion);

const init = () => {
  currentQuestion = getRandomQuestion(currentLevel);
  if (Object.keys(currentQuestion).length === 0) {
    return;
  }

  displayQuestion(currentQuestion);

  const leaderboard = document.querySelector(
    `[data-value='${currentQuestionNumber}']`
  );
  leaderboard.classList.add("current");
};

init();
