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
const sound = new Audio("./resources/sound.mp3");

// general variables
let focus_time = 25;
let break_time = 5;
let countdown_time = focus_time;

// display time on title
time.innerHTML = render_seconds(countdown_time);

// clicking the button logic
const countdown = function(seconds) {
    time.innerHTML = render_seconds(seconds);
    if (seconds == 0) {
        button.innerText = "start";
        button.disabled = false;
        button.style.cursor = "pointer";
        document.body.style.backgroundColor = "white";
        timer_container.style.boxShadow = "none";
        sound.play();
        countdown_time = countdown_time == focus_time ? break_time : focus_time;
        time.innerHTML = render_seconds(countdown_time);
        return;
    }
    setTimeout(() => countdown(seconds - 1), 1000);
};

button.addEventListener("click", () => {
  countdown(countdown_time);
  button.textContent = "FOCUS";
  button.disabled = true;
  button.style.cursor = "default";
  timer_container.style.boxShadow = "0 0 2rem coral";
  document.body.style.backgroundColor = "#222";
});