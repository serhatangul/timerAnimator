const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

const createTimerAnimator = () => {
  let intervalId;

  return (seconds) => {
    clearInterval(intervalId);

    if (seconds <= 0) {
      timerEl.textContent = '00:00:00';
      return;
    }

    const startTime = Date.now();
    const endTime = startTime + seconds * 1000;

    const updateTimer = () => {
      const timeLeft = Math.round((endTime - Date.now()) / 1000);

      if (timeLeft >= 0) {
        const hours = Math.floor(timeLeft / 3600)
          .toString()
          .padStart(2, '0');
        const minutes = Math.floor((timeLeft % 3600) / 60)
          .toString()
          .padStart(2, '0');
        const seconds = (timeLeft % 60).toString().padStart(2, '0');

        timerEl.textContent = `${hours}:${minutes}:${seconds}`;
      } else {
        clearInterval(intervalId);
        timerEl.textContent = '00:00:00';
      }
    };

    updateTimer();
    intervalId = setInterval(updateTimer, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  inputEl.value = inputEl.value.replace(/[^0-9]/g, '');
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});
