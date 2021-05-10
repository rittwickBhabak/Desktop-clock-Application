const hour = document.getElementById('hour');
const minute = document.getElementById('minute');
const second = document.getElementById('second');

const startTimer = document.getElementById('start-timer')
const pauseTimer = document.getElementById('pause-timer')
const resumeTimer = document.getElementById('resume-timer')
const cancelTimer = document.getElementById('cancel-timer')
const resetTimer = document.getElementById('reset-timer')
const timerDisplay = document.getElementById('timer-run-dispay')
const timerInputArea = document.getElementById('timer-input-area')

let totalSecond;
let timerInterval;
let remainingSeconds = totalSecond;

const hideNodeTimer = nodes => {
    for (let node of nodes) {
        node.style.display = 'none';
    }
}
const showNodeTimer = nodes => {
    for (let node of nodes) {
        node.style.display = 'block';
    }
}

const formatStr = e => {
    let minute = Math.floor(e/60)
    let second = e % 60;
    if (minute <= 9) {
        minute =  '0' + minute;
    } 
    if (second <= 9) {
        second =  '0' + second;
    } 
    return `${minute}:${second}`
}
const setDisplay = e => {
    timerDisplay.innerText = e
}
showNodeTimer([timerInputArea, startTimer]);
hideNodeTimer([pauseTimer, resumeTimer, cancelTimer, resetTimer, timerDisplay])
const setTimer = ()=> {
    timerInterval = setInterval(() => {
        remainingSeconds--;
        setDisplay(formatStr(remainingSeconds))
        if (remainingSeconds <= 0) {
            setDisplay('Time Up');
            // console.log('Clearing interval')
            clearInterval(timerInterval);
            showNodeTimer([resetTimer, timerDisplay]);
            hideNodeTimer([startTimer, timerInputArea, pauseTimer, resumeTimer, cancelTimer])
        }
    }, 1000);
}
startTimer.addEventListener('click', () => {
    totalSecond = +hour.value * 3600 + +minute.value * 60 + +second.value;
    remainingSeconds = totalSecond
    setDisplay(formatStr(remainingSeconds));
    setTimer();
    hideNodeTimer([startTimer, resumeTimer, timerInputArea, resetTimer]);
    showNodeTimer([pauseTimer, cancelTimer, timerDisplay]);
})

pauseTimer.addEventListener('click', ()=>{
    clearInterval(timerInterval);
    hideNodeTimer([startTimer, pauseTimer, timerInputArea, resetTimer]);
    showNodeTimer([resumeTimer, cancelTimer, timerDisplay]);
})

resumeTimer.addEventListener('click', ()=>{
    setTimer();
    hideNodeTimer([resumeTimer, startTimer, timerInputArea, resetTimer]);
    showNodeTimer([pauseTimer, cancelTimer, timerDisplay]);
})

cancelTimer.addEventListener('click', ()=>{
    clearInterval(timerInterval);
    remainingSeconds = totalSecond;
    setDisplay(formatStr(remainingSeconds))
    hideNodeTimer([pauseTimer, resumeTimer, cancelTimer, timerDisplay, resetTimer]);
    showNodeTimer([startTimer, timerInputArea]);
})

resetTimer.addEventListener('click', ()=>{
    showNodeTimer([timerInputArea, startTimer])
    hideNodeTimer([timerDisplay, resetTimer, pauseTimer, resumeTimer, cancelTimer])
})