import { render_seconds } from "./useful_functions.js";

// html elements
const time = document.querySelector("#timer h1");
const start_button = document.querySelector(".buttons button");
const timer_container = document.querySelector("#timer");
const reset_hint = document.querySelector("p.reset-hint");
const mode_buttons = Array.from(document.querySelectorAll(".modes button"));
const focus_button = {
  element: mode_buttons[0],
  is_active: true,
};
const break_button = {
  element: mode_buttons[1],
  is_active: false,
};

// import sounds
const end_sound = new Audio("./resources/end-sound.mp3");
const reset_sound = new Audio("./resources/reset-sound.mp3");

// general variables
const focus_time = 25 * 60;
const break_time = 5 * 60;
let countdown_time = focus_time;
let is_timerOn = false;

// display time on title
time.innerHTML = render_seconds(countdown_time);

// reset UI after timer has ended or been stopped
const reset_timer = function () {
  is_timerOn = false;

  mode_buttons.forEach((button) => {
    button.disabled = false;
    button.style.filter = "grayscale(0)";
    button.style.opacity = "1";
  });

  start_button.innerText = "start";
  start_button.disabled = false;
  start_button.style.opacity = "1";
  start_button.style.cursor = "pointer";

  document.body.style.backgroundColor = "white";

  timer_container.style.boxShadow = "none";

  reset_hint.style.opacity = "0";
  reset_hint.style.transform = "translateY(100px)";
};

// function for switching between modes
const switch_to_focus = function () {
  focus_button.element.classList.add("active");
  break_button.element.classList.remove("active");
  focus_button.is_active = true;
  break_button.is_active = false;
  countdown_time = focus_time;
  time.innerHTML = render_seconds(countdown_time);
};

const switch_to_break = function () {
  break_button.element.classList.add("active");
  focus_button.element.classList.remove("active");
  break_button.is_active = true;
  focus_button.is_active = false;
  countdown_time = break_time;
  time.innerHTML = render_seconds(countdown_time);
};

// clicking the start_button logic
const countdown = function (seconds) {
  seconds = Math.max(0, seconds);
  time.innerHTML = render_seconds(Math.ceil(seconds));
  if (seconds == 0) {
    reset_timer();

    end_sound.play();

    countdown_time = countdown_time == focus_time ? break_time : focus_time;

    if (countdown_time == focus_time) {
      switch_to_focus();
    } else {
      switch_to_break();
    }

    time.innerHTML = render_seconds(countdown_time);

    return;
  }

  if (!is_timerOn) {
    reset_timer();

    reset_sound.play();
    time.innerHTML = render_seconds(countdown_time);

    return;
  }

  setTimeout(() => countdown(seconds - 0.1), 100);
};

start_button.addEventListener("click", () => {
  is_timerOn = true;
  countdown(countdown_time);

  mode_buttons.forEach((button) => {
    button.disabled = true;
    button.style.filter = "grayscale(1)";
    button.style.opacity = ".7";
  });

  start_button.textContent = countdown_time == focus_time ? "FOCUS" : "REST";
  start_button.disabled = true;
  start_button.style.opacity = ".5";
  start_button.style.cursor = "default";

  timer_container.style.boxShadow = "0 0 2rem coral";

  document.body.style.backgroundColor = "#222";

  reset_hint.style.opacity = "1";
  reset_hint.style.transform = "translateY(0)";
});
// reset timer
window.addEventListener("keypress", (e) => {
  if (e.key === " ") {
    is_timerOn = false;
  }
});
reset_hint.addEventListener("click", () => {
  is_timerOn = false;
});

// switching between modes [focus and break]
focus_button.element.addEventListener("click", function () {
  if (!focus_button.is_active) {
    switch_to_focus();
  }
});

break_button.element.addEventListener("click", function () {
  if (!break_button.is_active) {
    switch_to_break();
  }
});
