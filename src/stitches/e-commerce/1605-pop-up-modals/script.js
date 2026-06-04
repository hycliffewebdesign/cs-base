// your local storage reset for local testing. uncomment this command so you can still access you pop up after clicking the close or submit button.
// localStorage.setItem('modalClosed', 'false');

document.addEventListener('DOMContentLoaded', function () {
    // Variables
    var CSmodal = document.getElementById("cs-modal-1605");
var CScloseButton = document.getElementById("cs-close-1605");
var CSsubmitButton = document.getElementById("cs-submit-1605");

    // Check localStorage to see if the modal has been closed before
    if (localStorage.getItem('modalClosed') !== 'true') {
        // Show the modal after 5 seconds
        setTimeout(function () {
            CSmodal.classList.add('cs-loaded');
            CSmodal.style.zIndex = 12000; // Set z-index to 12000 to make it visible
        }, 0);
    } else {
        // If modal is marked as closed, make sure it's hidden
        CSmodal.classList.add('cs-closed');
        CSmodal.classList.remove('cs-loaded');
        CSmodal.style.zIndex = -10000; // Set z-index to -1000 to keep it hidden
    }

    // Close button event listener
    CScloseButton.addEventListener('click', function () {
        // Add 'cs-closed' class and remove 'cs-loaded' class
        CSmodal.classList.add('cs-closed');
        CSmodal.classList.remove('cs-loaded');
        CSmodal.style.zIndex = -1000; // Set z-index to -1000 to hide the modal

        // Store the closed state in localStorage
        localStorage.setItem('modalClosed', 'true');
    });

    // Optional: Add event listener for the submit button if you want any functionality
    CSsubmitButton.addEventListener('click', function () {
        // Your submit button logic here (e.g., form submission)
    });

});