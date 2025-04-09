const easyButton = document.getElementById('button-easy');
const mediumButton = document.getElementById('button-medium');
const hardButton = document.getElementById('button-hard');

const makeActive = (event) => {
  if (event.target.id === easyButton) {
    event.target.classList.add('bg-teal-500');
  } else if (event.target.id === mediumButton) {
    event.target.classList.add('bg-yellow-500');
  } else {
    event.target.classList.add('bg-red-500');
  }
};
