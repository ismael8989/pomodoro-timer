const render_seconds = function(seconds) {
    if (typeof seconds !== 'number' || seconds < 0) {
        return 'Invalid input';
    }

    let minutes = Math.floor(seconds / 60);
    minutes = minutes.toString().padStart(2, '0');
    let remaining_seconds = seconds % 60;
    remaining_seconds = remaining_seconds.toString().padStart(2, '0');

    return `${minutes}<span>min</span> ${remaining_seconds}<span>sec</span>`;
};

// html elements
const time = document.querySelector("#timer h1");
const button = document.querySelector("button");
const timer_container = document.querySelector("#timer");

// clicking the button logic
const countdown = function(seconds) {
    time.innerHTML = render_seconds(seconds);
    if (seconds == 0) {
        time.innerHTML = "25<span>min</span> 00<span>sec</span>";
        button.textContent = "start";
        button.disabled = false;
        button.style.cursor = "pointer";
        document.body.style.backgroundColor = "white";
        timer_container.style.boxShadow = "none";
        return;
    }
    setTimeout(() => countdown(seconds - 1), 1000);
};

button.addEventListener("click", () => {
  countdown(25*60);
  button.textContent = "FOCUS";
  button.disabled = true;
  button.style.cursor = "default";
  timer_container.style.boxShadow = "0 0 2rem coral";
  document.body.style.backgroundColor = "#222";
});