const calendar = document.getElementById('calendar');

for (let i = 1; i <= 30; i++) {
  const dayEl = document.createElement('div');
  dayEl.classList.add('day');

  const taskStatus = localStorage.getItem(`day${i}_status`) || 'pending';
  if (taskStatus === 'complete') {
    dayEl.classList.add('complete');
  } else if (taskStatus === 'in-progress') {
    dayEl.classList.add('in-progress');
  } else {
    dayEl.classList.add('pending');
  }

  dayEl.innerText = `Day ${i}\nStatus: ${taskStatus}`;
  dayEl.addEventListener('click', () => {
    window.location.href = `exercise.html?day=${i}`;
  });

  calendar.appendChild(dayEl);
}
