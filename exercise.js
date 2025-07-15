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
let currentExercise = parseInt(localStorage.getItem(`day${currentDay}_progress`)) || 1;

// Track if done was clicked for current exercise
let doneClicked = false;

function loadExercise() {
  titleElement.textContent = `Day ${currentDay} - Exercise ${currentExercise}`;
  videoElement.querySelector('source').src = `gifs/exercise${currentExercise}.mp4`;
  videoElement.load();

  // Update Previous button label
  prevBtn.textContent = currentExercise === 1 ? "Home" : "Previous";

  // Reset button states
  doneClicked = false;
  updateButtonStates();

  // Mark the day as in-progress if not complete
  if (localStorage.getItem(`day${currentDay}_status`) !== 'complete') {
    localStorage.setItem(`day${currentDay}_status`, 'in-progress');
  }
}

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

// Event: Previous
prevBtn.addEventListener('click', () => {
  if (currentExercise === 1) {
    window.location.href = 'index.html';
  } else {
    currentExercise--;
    // Do NOT update progress when going back
    loadExercise();
  }
});

// Event: Done
doneBtn.addEventListener('click', () => {
  doneClicked = true;
  updateButtonStates();
});

// Event: Skip
skipBtn.addEventListener('click', () => {
  doneClicked = false;
  updateButtonStates();
});

// Event: Skip to Next / Done Next
skipNextBtn.addEventListener('click', () => {
  if (currentExercise < totalExercises) {
    currentExercise++;

    // Only update progress if we're ahead of stored value
    const savedProgress = parseInt(localStorage.getItem(`day${currentDay}_progress`)) || 1;
    localStorage.setItem(`day${currentDay}_progress`, Math.max(savedProgress, currentExercise));

    loadExercise();
  } else {
    // Final exercise completed
    localStorage.setItem(`day${currentDay}_status`, 'complete');
    localStorage.removeItem(`day${currentDay}_progress`);
    window.location.href = 'index.html';
  }
});

loadExercise();
