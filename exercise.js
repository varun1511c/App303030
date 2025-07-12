const videoElement = document.getElementById('exercise-video');
const titleElement = document.getElementById('exercise-title');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');

// Get current day from URL
const urlParams = new URLSearchParams(window.location.search);
const currentDay = parseInt(urlParams.get('day'));

if (!currentDay || currentDay < 1 || currentDay > 30) {
  alert('Invalid day selected.');
  window.location.href = 'index.html';
}

const totalExercises = 30;
let currentExercise = parseInt(localStorage.getItem(`day${currentDay}_progress`)) || 1;

// Load the current exercise
function loadExercise() {
  titleElement.textContent = `Day ${currentDay} - Exercise ${currentExercise}`;
  videoElement.querySelector('source').src = `gifs/exercise${currentExercise}.mp4`;
  videoElement.load(); // Reload video source

  // Update button text and state
  if (currentExercise === totalExercises) {
    nextBtn.textContent = "🎉 Hurry! You're done for today. See you tomorrow!";
  } else {
    nextBtn.textContent = "Next ➡️";
  }

  // Disable "Previous" on first exercise
  prevBtn.disabled = currentExercise === 1;

  // Mark the day as in-progress if not yet complete
  if (localStorage.getItem(`day${currentDay}_status`) !== 'complete') {
    localStorage.setItem(`day${currentDay}_status`, 'in-progress');
  }
}

// When user clicks "Next"
nextBtn.addEventListener('click', () => {
  if (currentExercise < totalExercises) {
    currentExercise++;
    localStorage.setItem(`day${currentDay}_progress`, currentExercise);
    loadExercise();
  } else {
    // Final step: mark day as complete and return to calendar
    localStorage.setItem(`day${currentDay}_status`, 'complete');
    localStorage.removeItem(`day${currentDay}_progress`);
    window.location.href = 'index.html';
  }
});

// When user clicks "Previous"
prevBtn.addEventListener('click', () => {
  if (currentExercise > 1) {
    currentExercise--;
    localStorage.setItem(`day${currentDay}_progress`, currentExercise);
    loadExercise();
  }
});

loadExercise();
