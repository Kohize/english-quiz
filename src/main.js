import './style.css';
import { mainQuizObject } from './main-quiz';
let currentWord =
  mainQuizObject[Math.floor(Math.random() * mainQuizObject.length)];
console.log(currentWord);
const startButton = document.getElementById('start');
const container = document.getElementById('container');

const startQuiz = () => {
  renderQuiz();
};

const allPositions = [
  { colStart: 1, rowStart: 2 },
  { colStart: 1, rowStart: 3 },
  { colStart: 2, rowStart: 2 },
  { colStart: 2, rowStart: 3 },
];

let currentScore = 0;

const renderQuiz = () => {
  let currentWord =
    mainQuizObject[Math.floor(Math.random() * mainQuizObject.length)];

  console.log(currentWord);
  const counterContainer = renderCounter(currentScore);

  container.innerHTML = '';

  const quizWrapper = document.createElement('div');
  quizWrapper.classList.add(
    'grid',
    'grid-cols-2',
    'grid-rows-3',
    'gap-10',
    'auto-rows-[0]',
    'grid-flow-dense'
  );
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
  console.log(shuffledPositions);
  answerA.classList.add(
    `row-start-${shuffledPositions[0].rowStart}`,
    `col-start-${shuffledPositions[0].colStart}`,
    'answer__button',
    'min-w-4'
  );

  answerB.classList.add(
    `row-start-${shuffledPositions[1].rowStart}`,
    `col-start-${shuffledPositions[1].colStart}`,
    'answer__button',
    'min-w-4'
  );

  answerC.classList.add(
    `row-start-${shuffledPositions[2].rowStart}`,
    `col-start-${shuffledPositions[2].colStart}`,
    'answer__button',
    'min-w-4'
  );

  answerD.classList.add(
    `row-start-${shuffledPositions[3].rowStart}`,
    `col-start-${shuffledPositions[3].colStart}`,
    'answer__button',
    'min-w-4'
  );

  roundWord.innerText = currentWord.word;
  answerA.innerText = currentWord.a;
  answerB.innerText = currentWord.b;
  answerC.innerText = currentWord.c;
  answerD.innerText = currentWord.d;

  let buttons = document.querySelectorAll('button');
  buttons.forEach((el) =>
    el.addEventListener('click', (event) => {
      let correctAnswer = Array.from(document.querySelectorAll('button')).find(
        (button) => button.innerText === currentWord.correct
      );
      console.log(correctAnswer.innerHTML);
      console.log(event.target.innerHTML);
      console.log(event.target);
      currentScore++;
      if (event.target.innerHTML === correctAnswer.innerHTML) {
        event.target.style.backgroundColor = 'green';
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
    })
  );
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

startButton.addEventListener('click', startQuiz);
