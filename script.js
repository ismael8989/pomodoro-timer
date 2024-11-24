import { render_seconds } from "./useful_functions.js";
// html elements
const time = document.querySelector("#timer h1");
const button = document.querySelector("button");
const timer_container = document.querySelector("#timer");
const reset_hint = document.querySelector("p.reset-hint");

// import sounds
const sound = new Audio("./resources/sound.mp3");
const reset_sound = new Audio("./resources/reset-sound.mp3");

// general variables
const focus_time = 25;
const break_time = 5;
let countdown_time = focus_time;
let is_timerOn = false;

// display time on title
time.innerHTML = render_seconds(countdown_time);

// reset UI after timer has ended or been stopped
const reset_timer = function(){
    is_timerOn = false;

    button.innerText = "start";
    button.disabled = false;
    button.style.opacity = "1";
    button.style.cursor = "pointer";

    document.body.style.backgroundColor = "white";

    timer_container.style.boxShadow = "none";

    reset_hint.style.opacity = "0";
    reset_hint.style.transform = "translateY(100px)";

}

// clicking the button logic
const countdown = function(seconds) {
    seconds = Math.max(0 , seconds);
    time.innerHTML = render_seconds(Math.ceil(seconds));
    if (seconds == 0) {

        reset_timer();

        sound.play();

        countdown_time = countdown_time == focus_time ? break_time : focus_time;
        time.innerHTML = render_seconds(countdown_time);

        return;
    }

    if(!is_timerOn){

        reset_timer();

        reset_sound.play();
        time.innerHTML = render_seconds(countdown_time);

        return;
    }

    setTimeout(() => countdown(seconds - .1), 100);
};

button.addEventListener("click", () => {
  is_timerOn = true;
  countdown(countdown_time);

  button.textContent = countdown_time == focus_time ? "FOCUS" : "REST";
  button.disabled = true;
  button.style.opacity = ".5";
  button.style.cursor = "default";

  timer_container.style.boxShadow = "0 0 2rem coral";

  document.body.style.backgroundColor = "#222";

  reset_hint.style.opacity = "1";
  reset_hint.style.transform = "translateY(0)";
});

window.addEventListener("keypress", (e) => {
    if(e.key === " "){
        is_timerOn = false;
    }
})