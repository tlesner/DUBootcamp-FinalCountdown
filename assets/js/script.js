

// Select elements
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const playButton = document.querySelector('.control-button:nth-child(1)');
const pauseButton = document.querySelector('.control-button:nth-child(2)');
const resetButton = document.querySelector('.control-button:nth-child(3)');

let countdownInterval; // Variable to hold the interval
let totalSeconds; // Total countdown time in seconds
let initialHours, initialMinutes, initialSeconds; // To store initial input values for reset functionality
let isCounting = false; // State to track if the countdown is running

// Function to update the displayed time
function updateDisplay() {
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    hoursInput.value = String(hours).padStart(2, '0');
    minutesInput.value = String(minutes).padStart(2, '0');
    secondsInput.value = String(seconds).padStart(2, '0');
}

// Function to start the countdown
function startCountdown() {
    if (isCounting) return; // Prevent multiple intervals
    isCounting = true;

    // Get time from inputs and convert to total seconds
    totalSeconds =
        parseInt(hoursInput.value || '0') * 3600 +
        parseInt(minutesInput.value || '0') * 60 +
        parseInt(secondsInput.value || '0');

    // Update the display immediately
    updateDisplay();

    // Set interval to update the countdown
    countdownInterval = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(countdownInterval);
            isCounting = false;
            return; // Stop the countdown when it reaches 0
        }

        totalSeconds--;
        updateDisplay(); // Update display each second
    }, 1000);
}

// Function to pause the countdown
function pauseCountdown() {
    clearInterval(countdownInterval);
    isCounting = false;
}

// Function to reset the countdown to the initial input values
function resetCountdown() {
    clearInterval(countdownInterval); // Stop the timer if it's running
    isCounting = false;

    // Reset the inputs to their initial values
    hoursInput.value = String(initialHours).padStart(2, '0');
    minutesInput.value = String(initialMinutes).padStart(2, '0');
    secondsInput.value = String(initialSeconds).padStart(2, '0');
    
    // Also reset totalSeconds
    totalSeconds = initialHours * 3600 + initialMinutes * 60 + initialSeconds;

    // Update the display to reflect the reset time
    updateDisplay();
}

// Event listeners for buttons
playButton.addEventListener('click', () => {
    // Store initial values when "Play" is clicked
    initialHours = parseInt(hoursInput.value || '0');
    initialMinutes = parseInt(minutesInput.value || '0');
    initialSeconds = parseInt(secondsInput.value || '0');
    
    startCountdown();
});
pauseButton.addEventListener('click', pauseCountdown);
resetButton.addEventListener('click', resetCountdown);

// Theme Toggling
const toggleThemeButton = document.getElementById('toggle-theme'); // Select theme toggle button
let isDarkMode = false; // Default theme is light

// Function to toggle the theme
function switchTheme() {
    isDarkMode = !isDarkMode;

    if (isDarkMode) {
        document.body.classList.add('dark-theme');
        toggleThemeButton.textContent = '🌙'; // Update button icon
    } else {
        document.body.classList.remove('dark-theme');
        toggleThemeButton.textContent = '🌞'; // Reset button icon
    }

    // Save the theme preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// Apply saved theme on load
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        isDarkMode = true;
        document.body.classList.add('dark-theme');
        toggleThemeButton.textContent = '🌙';
    }
});

// Event listener for theme toggle
toggleThemeButton.addEventListener('click', switchTheme);
