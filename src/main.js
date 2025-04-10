import './style.css';
import { mainQuizObject } from './main-quiz';
import { mediumQuizObject } from './medium-quiz';
import { hardQuizObject } from './hard-quiz';
import {
  handleLevelButtons,
  initDifficulty,
  currentDifficulty,
} from './difficulty-buttons';
const startButton = document.getElementById('start');
const container = document.getElementById('container');
const allPositions = [
  { colStart: 1, rowStart: 2 },
  { colStart: 1, rowStart: 3 },
  { colStart: 2, rowStart: 2 },
  { colStart: 2, rowStart: 3 },
];

document.addEventListener('DOMContentLoaded', () => {
  handleLevelButtons();
  initDifficulty();
});

const startQuiz = () => {
  currentScore = 0;
  correctAnswersAmount = 0;
  renderQuiz();
};

let currentScore = 0;
let correctAnswersAmount = 0;
let currentQuestionList = [];
if (currentDifficulty == 'easy') {
  currentQuestionList = [...mainQuizObject];
} else if (currentDifficulty == 'medium') {
  currentQuestionList = [...mediumQuizObject];
} else if (currentDifficulty == 'hard') {
  currentQuestionList = [...hardQuizObject];
}

const renderQuiz = () => {
  container.innerHTML = '';
  let currentWord =
    currentQuestionList[Math.floor(Math.random() * currentQuestionList.length)];
  let currentWordIndex = currentQuestionList.indexOf(currentWord);

  const quizWrapper = document.createElement('div');
  quizWrapper.classList.add(
    'grid',
    'grid-cols-2',
    'grid-rows-3',
    'gap-10',
    'auto-rows-[0]',
    'grid-flow-dense'
  );

  const counterContainer = renderCounter(currentScore);

  const roundWord = document.createElement('h2');
  const answerA = document.createElement('button');
  const answerB = document.createElement('button');
  const answerC = document.createElement('button');
  const answerD = document.createElement('button');
  quizWrapper.append(roundWord, answerA, answerB, answerC, answerD);
  container.append(quizWrapper, counterContainer);

  roundWord.classList.add(
    'text-white',
    'font-bold',
    'col-start-1',
    'col-end-3',
    'min-w-xl',
    'text-5xl',
    'text-center'
  );

  const shuffledPositions = [...allPositions].sort(() => Math.random() - 0.5);

  [answerA, answerB, answerC, answerD].forEach((el, i) => {
    el.style.gridRowStart = shuffledPositions[i].rowStart;
    el.style.gridColumnStart = shuffledPositions[i].colStart;
    el.classList.add('answer__button', 'min-w-4');
  });
  roundWord.innerText = currentWord.word;
  answerA.innerText = currentWord.a;
  answerB.innerText = currentWord.b;
  answerC.innerText = currentWord.c;
  answerD.innerText = currentWord.d;
  let buttons = document.querySelectorAll('button');

  buttons.forEach((el) => {
    const handler = (event) => {
      el.removeEventListener('click', handler);
      handleAnswer(event, currentWord, currentWordIndex);
    };
    el.addEventListener('click', handler);
  });
};

const handleAnswer = (event, currentWord, currentWordIndex) => {
  let correctAnswer = Array.from(document.querySelectorAll('button')).find(
    (button) => button.innerText === currentWord.correct
  );
  currentScore++;
  console.log(currentWordIndex);
  console.log(currentQuestionList.length);
  console.log(currentQuestionList);
  currentQuestionList.splice(currentWordIndex, 1);
  if (event.target.innerHTML === correctAnswer.innerHTML) {
    event.target.style.backgroundColor = 'green';
    correctAnswersAmount++;

    setTimeout(() => {
      renderQuiz();
    }, 2000);
  } else if (event.target.innerHTML !== correctAnswer.innerHTML) {
    event.target.style.backgroundColor = 'red';
    correctAnswer.style.backgroundColor = 'green';

    setTimeout(() => {
      renderQuiz();
    }, 2000);
  }

  handleRoundEnd();
};

const renderCounter = (currentScore) => {
  let scoreContainer = document.createElement('div');
  let counter = document.createElement('span');

  counter.innerText = `${currentScore}/20`;
  counter.classList.add('text-white', 'font-bold', 'text-4xl');
  scoreContainer.classList.add('absolute', 'top-[55%]', 'right-[15%]');
  scoreContainer.append(counter);
  return scoreContainer;
};

const handleRoundEnd = () => {
  if (currentScore === 20) {
    container.innerHTML = '';
    renderEndingScreen();
  }
};

const renderEndingScreen = () => {
  let endingWrapper = document.createElement('div');
  endingWrapper.classList.add('flex', 'flex-col', 'gap-20', 'items-center');
  let endingTitle = document.createElement('h3');
  endingTitle.textContent =
    correctAnswersAmount <= 5
      ? 'Knowledge is like pizza—even a small slice is good!'
      : correctAnswersAmount >= 5 && correctAnswersAmount < 10
        ? 'Progress is visible! The next round will be even better!'
        : correctAnswersAmount > 10 && correctAnswersAmount <= 15
          ? 'Strong performance! You’re on your way to the top!'
          : correctAnswersAmount > 15 && correctAnswersAmount <= 19
            ? 'Almost flawless! You’re on the edge of greatness!'
            : '100%! Are you a walking Great Britain?';
  endingTitle.classList.add('text-4xl', 'font-gidole', 'text-white');

  let endingResultText = document.createElement('p');
  endingResultText.classList.add(
    'text-3xl',
    'font-gidole',
    'text-white',
    'text-center'
  );
  endingResultText.textContent = `Round is finished! You made ${correctAnswersAmount} correct answers.`;

  let restartButton = document.createElement('button');
  restartButton.classList.add(
    'text-white',
    'bg-indigo-500',
    'p-5',
    'font-gidole',
    'text-2x1',
    'font-bold',
    'rounded-xl',
    'min-w-30',
    'hover:cursor-pointer',
    'hover:bg-indigo-400',
    'max-w-md'
  );
  restartButton.textContent = 'Restart';

  endingWrapper.append(endingTitle, endingResultText, restartButton);
  container.append(endingWrapper);

  restartButton.addEventListener('click', () => {
    currentQuestionList = [...mainQuizObject];
    startQuiz();
  });
};

startButton.addEventListener('click', startQuiz);
