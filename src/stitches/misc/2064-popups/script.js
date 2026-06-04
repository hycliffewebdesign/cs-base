// Note that you may need to go into you Local Storage (in developer tools) and clear the "cookiesAccepted" key if you want this stitch to appear again

// Wait until the DOM is fully loaded - prevents any errors being thrown if the script isn't deferred
document.addEventListener('DOMContentLoaded', function () {
    const popup = document.getElementById('popup-2064');
    const closeButton = document.querySelector('.cs-close');
    const acceptButton = document.querySelector('.cs-accept');

    // Check if the user has already accepted cookies
    if (!localStorage.getItem('cookiesAccepted')) {
        // Set the popup to block, so we can apply the cs-show class and animate the popup into view
        popup.style.display = "block";

        // Set the popup to appear after a set period of time (default: 1000ms/1s).
        setTimeout(function () {
            popup.classList.add('cs-show');
        }, 1000);
    }

    // Function to close the popup. Add an item to localStorage to remember that the user has accepted cookies.
    function closePopup() {
        popup.classList.remove('cs-show');
        localStorage.setItem('cookiesAccepted', 'true');

        // Removes the popover from the screen (visibly and through screen readers) after the transition (0.3s - in the CSS) has finished
        setTimeout(function () {
            popup.style.display = "none";
        }, 300);
    }

    // Close button event listener
    closeButton.addEventListener('click', closePopup);

    // Accept button event listener
    acceptButton.addEventListener('click', () => {
        closePopup();

        // Cookie functionality should go here
        // For example: setCookies();
    });

    // Comment: Cookie functionality
    // Implement your cookie setting logic here. This is where you would set any necessary cookies after the user has accepted the cookie policy.
    // function setCookies() {
    //      Set your cookies here
    // }
});