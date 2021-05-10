const { ipcRenderer } = require("electron");

const start = document.getElementById('start-stopwatch');
const pause = document.getElementById('stop-stopwatch');
const resume = document.getElementById('resume-stopwatch');
const cancel = document.getElementById('cancel-stopwatch');
const dispalyArea = document.getElementById('display-area');
// console.log('connected')
let currentSecond = 0;
let currentMinute = 0;
let currentHour = 0;
let currentStatus = 0; //0:timeIs_00:00:00, 1:running, 2:paused

let stopwatchInterval;
const updateStatus = () => {
    currentSecond++;
    if(currentSecond==60){
        currentSecond = 0;
        currentMinute++;
        if(currentMinute==60){
            currentMinute = 0;
            currentHour++;
        }
    }
    let sec = currentSecond;
    let hour = currentHour;
    let minute = currentMinute;
    const getStr = e => {
        if(e<=9)
            return '0'+e;
        else
            return ''+e;
    }
    return `${getStr(hour)}:${getStr(minute)}:${getStr(sec)}`
}

const hideNode = nodes => {
    for(let node of nodes){
        node.style.display = 'none';
    }
}
const showNode = nodes => {
    for(let node of nodes){
        node.style.display = 'block';
    }
}

hideNode([pause, resume, cancel]);
showNode([start]);

start.addEventListener('click', ()=>{
    // console.log('stopwatch started')
    stopwatchInterval = setInterval(()=>{
        dispalyArea.innerText = updateStatus();
    }, 1000);
    hideNode([start, resume]);
    showNode([pause, cancel]);
    currentStatus = 1;
})

pause.addEventListener('click', ()=>{
    // console.log('stopwatch paused');
    clearInterval(stopwatchInterval);
    hideNode([start, pause]);
    showNode([resume, cancel]);
    currentStatus = 2;
})

resume.addEventListener('click', ()=>{
    // console.log('stopwatch resumed');
    stopwatchInterval = setInterval(()=>{
        dispalyArea.innerText = updateStatus();
    }, 1000);
    hideNode([resume, start]);
    showNode([pause, cancel]);
    currentStatus = 1;
    
})

cancel.addEventListener('click', ()=>{
    // console.log('stopwatch stopped/canceled');
    clearInterval(stopwatchInterval);
    currentSecond = 0;
    currentMinute = 0;
    currentHour = 0;
    currentStatus = 0;
    dispalyArea.innerText = '00:00:00';
    hideNode([pause, resume, cancel]);
    showNode([start])
})

