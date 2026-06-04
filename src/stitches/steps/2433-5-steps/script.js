document.addEventListener("DOMContentLoaded", () => {

    // === A11Y STATE MANAGEMENT ON RADIO CHANGE ===
    document.querySelectorAll('.cs-step-toggle').forEach(radio => {
        radio.addEventListener('change', () => {

            // Loop through all radios to update state accordingly
            document.querySelectorAll('.cs-step-toggle').forEach(input => {
                const isSelected = input.checked;

                // Reflect selection and expansion state for screen readers
                input.setAttribute('aria-selected', isSelected);
                input.setAttribute('aria-expanded', isSelected);

                const panelId = input.getAttribute('aria-controls');
                const panel = document.getElementById(panelId);

                if (panel) {
                    // Show/hide panels visually
                    panel.hidden = !isSelected;

                    // Prevent offscreen content from receiving focus or interaction
                    if (isSelected) {
                        panel.removeAttribute('inert');
                    } else {
                        panel.setAttribute('inert', '');
                    }

                    // Allow the selected panel to be focusable (e.g., via skip links or manual focus)
                    panel.setAttribute('tabindex', isSelected ? '0' : '-1');
                }
            });
        });
    });

    // === KEYBOARD HANDLING WITHIN PANELS ===
    document.querySelectorAll('.cs-step-panel').forEach(panel => {
        panel.addEventListener('keydown', (e) => {

            // Escape key: return focus to corresponding radio (tab)
            if (e.key === 'Escape') {
                const radioId = panel.getAttribute('aria-labelledby');
                const radio = document.getElementById(radioId);
                if (radio) {
                    radio.focus();
                    e.preventDefault();
                }
            }

            // Trap focus within panel content (loop back to start or end)
            if (e.key === 'Tab') {
                const focusable = panel.querySelectorAll(
                    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
                );
                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (e.shiftKey && document.activeElement === first) {
                    // Shift+Tab on first focusable loops to last
                    last.focus();
                    e.preventDefault();
                } else if (!e.shiftKey && document.activeElement === last) {
                    // Tab on last focusable loops to first
                    first.focus();
                    e.preventDefault();
                }
            }
        });
    });
});