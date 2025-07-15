const calendar = document.getElementById('calendar');
const progressSegments = document.getElementById('progress-segments');

function buildCalendar() {
  calendar.innerHTML = '';
  progressSegments.innerHTML = '';

  for (let i = 1; i <= 30; i++) {
    const taskStatus = localStorage.getItem(`day${i}_status`) || 'pending';
    const progress = parseInt(localStorage.getItem(`day${i}_progress`)) || 0;
    const isComplete = taskStatus === 'complete';
    const progressText = isComplete ? '30/30' : `${progress}/30`;

    // Create calendar tile
    const dayEl = document.createElement('div');
    dayEl.classList.add('day', taskStatus);
    dayEl.innerText = `Day ${i}\nStatus: ${taskStatus}\n (${progressText})`;
    dayEl.addEventListener('click', () => {
      window.location.href = `exercise.html?day=${i}`;
    });
    calendar.appendChild(dayEl);

    // Create segmented progress bar
    const segment = document.createElement('div');
    segment.classList.add('segment');
    if (taskStatus === 'complete') {
      segment.classList.add('complete');
    } else if (taskStatus === 'in-progress') {
      segment.classList.add('in-progress');
    }
    progressSegments.appendChild(segment);
  }
}

buildCalendar();
