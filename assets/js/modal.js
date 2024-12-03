
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalButton = document.querySelector(".btn-open");
const closeModalButton = document.querySelector(".btn-close");

// Open the modal and allow the person to subscribe
const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  };
// Close the modal and apply a "hidden" feature
  const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  };

// Event listener for the button to open and close on the button
  openModalButton.addEventListener("click", openModal);
  closeModalButton.addEventListener("click", closeModal);

// Close a the modal by 
  overlay.addEventListener("click", closeModal);
