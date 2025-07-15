const videoElement = document.getElementById('exercise-video');
const titleElement = document.getElementById('exercise-title');

// Buttons
const prevBtn = document.getElementById('prev-btn');
const doneBtn = document.getElementById('done-btn');
const skipBtn = document.getElementById('skip-btn');
const skipNextBtn = document.getElementById('next-btn');

// Get current day from URL
const urlParams = new URLSearchParams(window.location.search);
const currentDay = parseInt(urlParams.get('day'));

if (!currentDay || currentDay < 1 || currentDay > 30) {
  alert('Invalid day selected.');
  window.location.href = 'index.html';
}

const totalExercises = 30;
let currentExercise = findFirstIncompleteExercise(currentDay);
let doneClicked = false;

// Helper: Key for done status
function getDoneKey(day, exercise) {
  return `day${day}_exercise${exercise}_done`;
}

// Helper: Find the first exercise not done
function findFirstIncompleteExercise(day) {
  for (let i = 1; i <= totalExercises; i++) {
    if (localStorage.getItem(getDoneKey(day, i)) !== 'true') {
      return i;
    }
  }
  return totalExercises; // All done, return last
}

// Load current exercise
function loadExercise() {
  titleElement.textContent = `Day ${currentDay} - Exercise ${currentExercise}`;
  videoElement.querySelector('source').src = `gifs/exercise${currentExercise}.mp4`;
  videoElement.load();

  prevBtn.textContent = currentExercise === 1 ? "Home" : "Previous";

  doneClicked = localStorage.getItem(getDoneKey(currentDay, currentExercise)) === 'true';
  updateButtonStates();

  if (localStorage.getItem(`day${currentDay}_status`) !== 'complete') {
    localStorage.setItem(`day${currentDay}_status`, 'in-progress');
  }

  checkIfDayComplete();
}

// Button UI state
function updateButtonStates() {
  if (doneClicked) {
    doneBtn.classList.add('selected');
    skipBtn.classList.remove('selected');
    skipNextBtn.textContent = "Done Next";
    skipNextBtn.classList.remove('orange');
    skipNextBtn.classList.add('green');
  } else {
    doneBtn.classList.remove('selected');
    skipBtn.classList.add('selected');
    skipNextBtn.textContent = "Skip to Next";
    skipNextBtn.classList.remove('green');
    skipNextBtn.classList.add('orange');
  }
}

// Check if all exercises are done, then mark day complete
function checkIfDayComplete() {
  for (let i = 1; i <= totalExercises; i++) {
    if (localStorage.getItem(getDoneKey(currentDay, i)) !== 'true') {
      localStorage.setItem(`day${currentDay}_status`, 'in-progress');
      return;
    }
  }

  // All done
  localStorage.setItem(`day${currentDay}_status`, 'complete');
  localStorage.removeItem(`day${currentDay}_progress`);
}

// Event: Previous
prevBtn.addEventListener('click', () => {
  if (currentExercise === 1) {
    window.location.href = 'index.html';
  } else {
    currentExercise--;
    loadExercise();
  }
});

// Event: Done
doneBtn.addEventListener('click', () => {
  doneClicked = true;
  localStorage.setItem(getDoneKey(currentDay, currentExercise), 'true');
  updateButtonStates();
  checkIfDayComplete();
});

// Event: Skip
skipBtn.addEventListener('click', () => {
  doneClicked = false;
  localStorage.removeItem(getDoneKey(currentDay, currentExercise));
  updateButtonStates();
  checkIfDayComplete();
});

// Event: Next (Skip or Done)
skipNextBtn.addEventListener('click', () => {
  if (currentExercise < totalExercises) {
    currentExercise++;
    loadExercise();
  } else {
    checkIfDayComplete();
    window.location.href = 'index.html';
  }
});

// Event: Home Button
document.getElementById('home-btn').addEventListener('click', () => {
  window.location.href = 'index.html';
});


loadExercise();
