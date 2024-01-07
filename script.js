document.addEventListener("DOMContentLoaded", function () {
  const needle = document.getElementById("needle");
  const speedDisplay = document.getElementById("speedDisplay");
  let totalTime = 0;

  // Erzeugen der Tachometer-Markierungen
  createTachoMarks();

  fetch("data.csv")
    .then((response) => response.text())
    .then((text) => parseCSV(text))
    .then((data) => animateNeedle(data));

  function parseCSV(csv) {
    return csv.split("\n").map((line) => {
      const [time, speed] = line
        .split(",")
        .map((item) => parseFloat(item.trim()));
      return { time, speed };
    });
  }

  function animateNeedle(data) {
    data.forEach(({ time, speed }) => {
      setTimeout(() => {
        const angle = speedToAngle(speed);
        needle.style.transform = `rotate(${angle}deg)`;
        speedDisplay.textContent = `${speed} km/h`;
      }, totalTime * 1000);

      totalTime += time;
    });
  }

  function speedToAngle(speed) {
    return (speed / 180) * 180; // Annahme: 0 bis 180 km/h über 180 Grad
  }

  function createTachoMarks() {
    const tachoMarks = document.getElementById("tacho-marks");
    for (let i = 1; i <= 18; i++) {
      let mark = document.createElement("div");
      mark.className = `speedometer-scale-${i}`;
      mark.textContent = i * 10;
      mark.style.transform = `rotate(${i * 10}deg)`;
      tachoMarks.appendChild(mark);
    }
  }
});
