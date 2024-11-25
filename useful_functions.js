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

export {render_seconds};