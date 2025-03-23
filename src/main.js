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

const renderQuiz = () => {
  let currentWord =
    mainQuizObject[Math.floor(Math.random() * mainQuizObject.length)];
  console.log(currentWord);

  container.innerHTML = '';

  const quizWrapper = document.createElement('div');
  quizWrapper.classList.add('grid', 'grid-cols-4', 'grid-rows-3', 'gap-3');
  const roundWord = document.createElement('h2');
  const answerA = document.createElement('button');
  const answerB = document.createElement('button');
  const answerC = document.createElement('button');
  const answerD = document.createElement('button');
  quizWrapper.append(roundWord, answerA, answerB, answerC, answerD);
  container.append(quizWrapper);

  roundWord.classList.add(
    'text-white',
    'font-bold',
    'col-start-2',
    'col-end-4',
    'min-w-xl',
    'text-5xl',
    'text-center'
  );
  answerA.classList.add(
    'col-start-2',
    'col-end-3',
    'row-start-2',
    'row-end-3',
    'answer__button',
    'min-w-4'
  );
  answerB.classList.add(
    'col-start-2',
    'col-end-3',
    'row-start-3',
    'row-end-4',
    'answer__button',
    'min-w-4'
  );
  answerC.classList.add(
    'col-start-3',
    'col-end-4',
    'row-start-2',
    'row-end-3',
    'answer__button',
    'min-w-4'
  );
  answerD.classList.add(
    'col-start-3',
    'col-end-4',
    'row-start-3',
    'row-end-4',
    'min-w-4',
    'answer__button'
  );

  roundWord.innerText = currentWord.word;
  answerA.innerText = currentWord.a;
  answerB.innerText = currentWord.b;
  answerC.innerText = currentWord.c;
  answerD.innerText = currentWord.d;
};

startButton.addEventListener('click', startQuiz);
