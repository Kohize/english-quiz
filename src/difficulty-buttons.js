const levelButtons = document.querySelectorAll('.level__button');
export let currentDifficulty = 'easy';

const makeActive = (event) => {
  disableButtons();
  event.target.classList.remove('disabled');
  event.target.classList.add('active');
  currentDifficulty = event.target.innerText.toLowerCase();
  console.log(currentDifficulty);
};

const disableButtons = () => {
  levelButtons.forEach((element) => {
    element.classList.add('disabled');
    element.classList.remove('active');
  });
};

export const handleLevelButtons = () => {
  levelButtons.forEach((element) =>
    element.addEventListener('click', makeActive)
  );
};

export const getCurrentDifficulty = () => {
  return currentDifficulty;
};

export const initDifficulty = () => {
  const activeButton = document.querySelector('.level__button.active');
  if (activeButton) {
    currentDifficulty = activeButton.innerText.toLowerCase();
  }
};
console.log(currentDifficulty);
