document.addEventListener("DOMContentLoaded", function () {
    let lapHistory = document.getElementById("lapHistory");
    let lapData = JSON.parse(localStorage.getItem("laps")) || [];

    lapData.forEach(lap => {
        let lapItem = document.createElement("li");
        lapItem.textContent = lap;
        lapHistory.appendChild(lapItem);
    });
});