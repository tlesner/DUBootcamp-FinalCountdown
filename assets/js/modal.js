const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalButton = document.querySelector(".btn-open");
const closeModalButton = document.querySelector(".btn-close");
const emailInput = document.getElementById("email");

// Open the modal and allow the person to subscribe
const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");

    // Check if the email is already stored in localStorage
    const savedEmail = localStorage.getItem("subscribedEmail");
    if (savedEmail) {
        emailInput.value = savedEmail; // Pre-fill the email input if it exists
    }
};

// Close the modal and apply a "hidden" feature
const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

// Function to save the email to localStorage
const saveEmail = function () {
    const email = emailInput.value;
    if (email) {
        localStorage.setItem("subscribedEmail", email);
        alert("Subscription saved!"); // Notify the user
        closeModal();
    } else {
        alert("Please enter a valid email address!");
    }
};

// Event listener for the button to open and close on the button
openModalButton.addEventListener("click", openModal);
closeModalButton.addEventListener("click", closeModal);

// Close the modal by clicking the overlay
overlay.addEventListener("click", closeModal);

// Add an event listener to the subscribe button
document.querySelector(".btn").addEventListener("click", saveEmail);
