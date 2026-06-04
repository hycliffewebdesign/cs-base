document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('#why-choose-1825 .cs-button');
    const boxContents = document.querySelectorAll('#why-choose-1825 .cs-box-content');

    // Function to show the corresponding box content and hide others
    function showBoxContent(button) {
        const filterValue = button.getAttribute('data-filter');

        boxContents.forEach(box => {
            if (box.getAttribute('data-box') === filterValue) {
                box.classList.remove('cs-hidden');
            } else {
                box.classList.add('cs-hidden');
            }
        });

        buttons.forEach(btn => {
            if (btn === button) {
                btn.classList.add('cs-active');
            } else {
                btn.classList.remove('cs-active');
            }
        });
    }

    // Event listeners for screens below 1024px
    if (window.matchMedia('(max-width: 1024px)').matches) {
        buttons.forEach(button => {
            button.addEventListener('click', () => showBoxContent(button));
        });
    }

    // Event listeners for screens above 1024px
    if (window.matchMedia('(min-width: 1024px)').matches) {
        buttons.forEach(button => {
            button.addEventListener('mouseover', () => showBoxContent(button));
        });
    }
});