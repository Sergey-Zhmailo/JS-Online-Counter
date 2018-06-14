const timer = (function () {

  let countDown,
      timerDisplay,
      endTime,
      alarmSound;

  // Инициализация модуля
  function init(settings) {
      timerDisplay = document.querySelector(settings.timerDisplaySelector);
      endTime = document.querySelector(settings.endTimeSelector);
      alarmSound = new Audio(settings.alarmSound);
  }

  // Запуск таймера
  function start(seconds) {
    if (typeof seconds !== 'number') return new Error('Please provide seconds');

    const now = Date.now();
    const then = now + seconds * 1000;

    displayTimeLeft(seconds);
    displayEndTime(then);

    countDown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);
      if (secondsLeft < 0) {
        clearInterval(countDown);
        alarmSound.play();
        document.querySelector('.stop').classList.add('disable');
        addEventOnStartButtons();
        inputMinutes.disabled = false;
        return;
      }
        displayTimeLeft(secondsLeft);

        let stopBtn = document.querySelector('.stop');
        stopBtn.addEventListener('click', stop);
    }, 1000);
  }

  // STOP
    function stop() {
        let stopSeconds = 0;

        clearInterval(countDown);
        displayTimeLeft(stopSeconds);
        alarmSound.pause();
        alarmSound.currentTime = 0;
        document.querySelector('.stop').classList.add('disable');
        addEventOnStartButtons();
        inputMinutes.disabled = false;
        inputMinutes.value = '';
        endTime.textContent = `Остановлен`;
        return;
    }
  
  // Вывод сколько время осталось
  function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const reminderSeconds = seconds % 60;
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const reminderHours = hours % 24;
    const remiderMinutes = minutes % 60;

    const display = `${days > 0 ? days + ':' : ''}${reminderHours < 10 && reminderHours > 0 ? '0' : ''}${reminderHours > 0 ? reminderHours + ':' : ''}${remiderMinutes < 10 && remiderMinutes > 0 ? '0' : ''}${remiderMinutes}:${reminderSeconds < 10 ? '0' : ''}${reminderSeconds}`;
    timerDisplay.textContent = display;
    document.title = display;
    document.querySelector('.stop').classList.remove('disable');
  }  
    
  
  // Вывод таймера енд
  function displayEndTime(timestamp) {
      const end = new Date(timestamp);
      const hour = end.getHours();
      const minutes = end.getMinutes();
      const endTimeString = end.toLocaleString();
      endTime.textContent = `Вернусь ${endTimeString}`;
  }

  return {
    init,
    start,
    stop
  }

})();

const buttons = document.querySelectorAll('[data-time]');

timer.init ({
    timerDisplaySelector: '.display__time-left',
    endTimeSelector: '.display__end-time',
    alarmSound: 'audio/bell.mp3'
});

// Start timer on click
function startTimer(e) {
  const seconds = Number(this.dataset.time);
  timer.start(seconds);
  removeEventOnStartButtons();
  inputMinutes.disabled = true;
}

function addEventOnStartButtons() {
    buttons.forEach(btn => btn.addEventListener('click', startTimer));
}

function removeEventOnStartButtons() {
    buttons.forEach(btn => btn.removeEventListener('click', startTimer));
}

addEventOnStartButtons();

//Таймер через инпут
let inputMinutes = document.querySelector('input');
function numberOnly(){
    if (event.keyCode < 48 || event.keyCode > 57)
        event.returnValue= false;
}
inputMinutes.addEventListener('keydown', enter);
function enter(e) {
    value = inputMinutes.value;
    if (e.keyCode === 13) {
        e.preventDefault();
        let enterSeconds = Number(value) * 60;
        timer.start(enterSeconds);
        removeEventOnStartButtons();
        inputMinutes.disabled = true;
    }
}