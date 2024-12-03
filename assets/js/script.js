// Countdown variables
let countdownInterval;
let totalSeconds = 0; // Default countdown to 0 seconds
let isCounting = false;

// Select elements
const timerElement = document.getElementById("timer");
const playPauseButton = document.getElementById("play-pause"); // Play/Pause button
const resetButton = document.getElementById("reset");
const reloadButton = document.getElementById("reload");

const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");

const toggleThemeButton = document.getElementById("toggle-theme"); // Sun icon button for theme toggle

// Function to update the displayed time
function updateDisplay() {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Update the input fields with remaining time
    hoursInput.value = hours < 10 ? `0${hours}` : hours;
    minutesInput.value = minutes < 10 ? `0${minutes}` : minutes;
    secondsInput.value = seconds < 10 ? `0${seconds}` : seconds;

    // Update the display timer
    timerElement.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Function to get the total time in seconds from the inputs
function getTotalSeconds() {
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    return hours * 3600 + minutes * 60 + seconds;
}

// Function to start or pause the countdown
function toggleCountdown() {
    if (isCounting) {
        clearInterval(countdownInterval);
        isCounting = false;
        playPauseButton.textContent = "Play/Pause"; // Change button text to "Play/Pause"
    } else {
        totalSeconds = getTotalSeconds(); // Get the total time in seconds
        countdownInterval = setInterval(() => {
            if (totalSeconds <= 0) {
                clearInterval(countdownInterval);
                isCounting = false;
                timerElement.textContent = "Time's up!";
                playPauseButton.textContent = "Play/Pause"; // Reset the button text to "Play/Pause"
            } else {
                totalSeconds--;
                updateDisplay(); // Update the display every second
            }
        }, 1000);
        isCounting = true;
        playPauseButton.textContent = "Pause"; // Change button text to "Pause"
    }
}

// Function to reset the countdown to the initial state (stop the countdown, clear inputs)
function resetCountdown() {
    clearInterval(countdownInterval);
    isCounting = false;
    totalSeconds = 0; // Reset to 0 seconds
    updateDisplay(); // Update the display to show 00:00:00
    playPauseButton.textContent = "Play/Pause"; // Reset button text to "Play/Pause"
}

// Function to reset all buttons and inputs (like a soft reset of the entire state)
function resetButtonsAndInputs() {
    // Stop any ongoing countdown
    clearInterval(countdownInterval);
    isCounting = false;

    // Reset the timer inputs to 00:00:00
    hoursInput.value = "00";
    minutesInput.value = "00";
    secondsInput.value = "00";

    // Reset the countdown display to 00:00:00
    totalSeconds = 0;
    updateDisplay();

    // Reset the Play/Pause button text back to "Play/Pause"
    playPauseButton.textContent = "Play/Pause";

    // Optionally, reset the Reset button text to its initial state (it should remain "Reset" by default)
    resetButton.textContent = "Reset";

    // Reset the Reload button text to its initial state (it should remain "Reload" by default)
    reloadButton.textContent = "Reload";
}

// Function to toggle the theme
function toggleTheme() {
    document.body.classList.toggle("dark-theme");

    // Change sun icon to moon icon when dark mode is active
    if (document.body.classList.contains("dark-theme")) {
        toggleThemeButton.textContent = "🌙"; // Change to moon icon
    } else {
        toggleThemeButton.textContent = "🌞"; // Change to sun icon
    }

    // Save the theme to localStorage so it's remembered after page reload
    const currentTheme = document.body.classList.contains("dark-theme") ? "dark" : "light";
    localStorage.setItem("theme", currentTheme);
}

// Apply saved theme from localStorage
window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        toggleThemeButton.textContent = "🌙"; // Change to moon icon
    } else {
        document.body.classList.remove("dark-theme");
        toggleThemeButton.textContent = "🌞"; // Change to sun icon
    }
});

// Event listeners for buttons
playPauseButton.addEventListener("click", toggleCountdown);
resetButton.addEventListener("click", resetCountdown);
reloadButton.addEventListener("click", resetButtonsAndInputs);  // Reset buttons and inputs
toggleThemeButton.addEventListener("click", toggleTheme); // Theme toggle button click event

// Initialize the display on page load
updateDisplay();

// Explosion Effect Code
function createExplosion(e) {
    const explosionContainer = document.createElement('div');
    explosionContainer.style.position = 'absolute';
    explosionContainer.style.top = '0';
    explosionContainer.style.left = '0';
    explosionContainer.style.pointerEvents = 'none';
    explosionContainer.style.zIndex = '10000';
    document.body.appendChild(explosionContainer);

    const explosion = document.createElement('div');
    explosion.style.position = 'absolute';
    explosion.style.borderRadius = '50%';
    explosion.style.backgroundColor = '#ff4e00'; // Orange color
    explosion.style.animation = 'explode 0.6s ease-out forwards';
    explosion.style.width = '50px';
    explosion.style.height = '50px';

    // Set the position where the explosion occurs (cursor position)
    explosion.style.left = `${e.clientX - 25}px`;
    explosion.style.top = `${e.clientY - 25}px`;

    explosionContainer.appendChild(explosion);

    // Cleanup explosion after animation
    setTimeout(() => {
        explosionContainer.remove();
    }, 600);
}

// Add mouse click event listener to trigger the explosion effect
document.addEventListener('click', createExplosion);

// Add explosion animation through CSS
const style = document.createElement('style');
style.innerHTML = `
    @keyframes explode {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        50% {
            transform: scale(1.5);
            opacity: 0.7;
        }
        100% {
            transform: scale(3);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
