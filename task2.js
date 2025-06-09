let timer;
let running = false;
let elapsedTime = 0;
let lapCounter = 1;

document.getElementById("startPause").addEventListener("click", function () {
    if (!running) {
        startTimer();
        this.textContent = "Pause";
    } else {
        clearInterval(timer);
        this.textContent = "Start";
    }
    running = !running;
});

document.getElementById("reset").addEventListener("click", function () {
    clearInterval(timer);
    elapsedTime = 0;
    running = false;
    document.getElementById("startPause").textContent = "Start";
    document.querySelector(".display").textContent = "00:00:00";
    document.getElementById("laps").innerHTML = "";
    lapCounter = 1;
});

document.getElementById("lap").addEventListener("click", function () {
    if (running) {
        let lapTime = document.querySelector(".display").textContent;
        let lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
        document.getElementById("laps").appendChild(lapItem);
        lapCounter++;

        // Store lap time in localStorage
        let lapData = JSON.parse(localStorage.getItem("laps")) || [];
        lapData.push(lapItem.textContent);
        localStorage.setItem("laps", JSON.stringify(lapData));
    }
});

function startTimer() {
    let startTime = Date.now() - elapsedTime;
    timer = setInterval(function () {
        elapsedTime = Date.now() - startTime;
        document.querySelector(".display").textContent = formatTime(elapsedTime);
    }, 100);
}

function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let milliseconds = Math.floor((ms % 1000) / 10);
    return (
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + ":" +
        String(milliseconds).padStart(2, "0")
    );
}