const calendar = document.getElementById('calendar');
const progressSegments = document.getElementById('progress-segments');

function buildCalendar() {
  calendar.innerHTML = '';
  progressSegments.innerHTML = '';

  for (let i = 1; i <= 30; i++) {
    let doneCount = 0;

    // Count how many exercises were actually marked as 'done'
    for (let j = 1; j <= 30; j++) {
      if (localStorage.getItem(`day${i}_exercise${j}_done`) === 'true') {
        doneCount++;
      }
    }

    // Update status based on real done count
    let taskStatus = 'pending';
    if (doneCount === 30) {
      taskStatus = 'complete';
      localStorage.setItem(`day${i}_status`, 'complete');
    } else if (doneCount > 0) {
      taskStatus = 'in-progress';
      localStorage.setItem(`day${i}_status`, 'in-progress');
    } else {
      localStorage.setItem(`day${i}_status`, 'pending');
    }

    const progressText = `${doneCount}/30`;

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
