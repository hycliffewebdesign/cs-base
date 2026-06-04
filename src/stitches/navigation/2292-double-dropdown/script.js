// Tertiary Dropdown Extension - Simply copy and paste this script at the end of you nav.js file.
(() => {
	"use strict";

	// Configuration
	const CONFIG = {
		BREAKPOINTS: {
			MOBILE: 1023.5,
		},
		SELECTORS: {
			navigation: "#cs-navigation",
			tertiaryDropdown: ".cs-drop-li.cs-drop3-main",
			tertiaryDropdownActive: ".cs-drop-li.drop3-active",
			dropdownToggle: ".cs-dropdown-toggle",
			dropdown: ".cs-dropdown",
		},
		CLASSES: {
			active: "cs-active",
			dropdown: "cs-dropdown",
			tertiaryActive: "drop3-active",
		},
	};

	// DOM Elements
	const elements = {
		navigation: document.querySelector(CONFIG.SELECTORS.navigation),
	};

	// Early exit if no navigation found
	if (!elements.navigation) return;

	// Cache tertiary dropdowns
	const tertiaryDropdowns = elements.navigation.querySelectorAll(CONFIG.SELECTORS.tertiaryDropdown);
	if (!tertiaryDropdowns.length) return;

	// Utilities
	const isMobile = () => window.matchMedia(`(max-width: ${CONFIG.BREAKPOINTS.MOBILE}px)`).matches;

	const toggleAttribute = (element, attribute, value1 = "true", value2 = "false") => {
		if (!element) return;
		const current = element.getAttribute(attribute);
		element.setAttribute(attribute, current === value1 ? value2 : value1);
	};

	// Tertiary Dropdown Management
	const tertiaryManager = {
		toggle(element) {
			element.classList.toggle(CONFIG.CLASSES.tertiaryActive);
			const button = element.querySelector(CONFIG.SELECTORS.dropdownToggle);
			button && toggleAttribute(button, "aria-expanded");
		},

		closeAll() {
			if (!elements.navigation) return false;
			let closed = false;

			elements.navigation.querySelectorAll(CONFIG.SELECTORS.tertiaryDropdownActive).forEach((dropdown) => {
				dropdown.classList.remove(CONFIG.CLASSES.tertiaryActive);
				const button = dropdown.querySelector(CONFIG.SELECTORS.dropdownToggle);
				button && button.setAttribute("aria-expanded", "false");
				closed = true;
			});

			return closed;
		},
	};

	// Keyboard Management
	const keyboardManager = {
		handleEscape(event) {
			if (event.key !== "Escape") return;

			// Close tertiary dropdowns first
			const tertiaryDropdowns = elements.navigation.querySelectorAll(CONFIG.SELECTORS.tertiaryDropdownActive);
			if (tertiaryDropdowns.length > 0) {
				tertiaryDropdowns.forEach((dropdown) => {
					dropdown.classList.remove(CONFIG.CLASSES.tertiaryActive);
					const button = dropdown.querySelector(CONFIG.SELECTORS.dropdownToggle);
					if (button) {
						button.setAttribute("aria-expanded", "false");
						button.focus();
					}
				});
				event.stopPropagation();
			}
		},
	};

	// Event Management
	const eventManager = {
		handleTertiaryInteraction(event) {
			const button = event.target.closest(CONFIG.SELECTORS.dropdownToggle);
			if (!button) return;

			const tertiary = button.closest(CONFIG.SELECTORS.tertiaryDropdown);
			if (!tertiary) return;

			// Handle click events (mobile only)
			if (event.type === "click" && isMobile()) {
				event.preventDefault();
				event.stopPropagation();
				tertiaryManager.toggle(tertiary);
			}

			// Handle keyboard events
			if (event.type === "keydown" && (event.key === "Enter" || event.key === " ")) {
				event.preventDefault();
				event.stopPropagation();
				tertiaryManager.toggle(tertiary);
			}
		},

		handleTertiaryFocus(event) {
			if (event.type === "focusout") {
				setTimeout(() => {
					if (!event.relatedTarget) return;

					const tertiary = event.target.closest(CONFIG.SELECTORS.tertiaryDropdown);
					if (tertiary?.classList.contains(CONFIG.CLASSES.tertiaryActive) && !tertiary.contains(event.relatedTarget)) {
						tertiaryManager.toggle(tertiary);
					}
				}, 10);
			}
		},
	};

	// Observer Management
	const observerManager = {
		create() {
			return new MutationObserver((mutations) => {
				mutations.forEach((mutation) => {
					if (mutation.type === "attributes" && mutation.attributeName === "class") {
						const target = mutation.target;
						if (target.classList.contains(CONFIG.CLASSES.dropdown) && !target.classList.contains(CONFIG.CLASSES.active)) {
							// Parent dropdown closed, close any tertiary dropdowns inside
							const tertiaryDropdowns = target.querySelectorAll(CONFIG.SELECTORS.tertiaryDropdownActive);
							tertiaryDropdowns.forEach((dropdown) => {
								dropdown.classList.remove(CONFIG.CLASSES.tertiaryActive);
								const button = dropdown.querySelector(CONFIG.SELECTORS.dropdownToggle);
								button && button.setAttribute("aria-expanded", "false");
							});
						}
					}
				});
			});
		},

		observe(observer) {
			elements.navigation.querySelectorAll(CONFIG.SELECTORS.dropdown).forEach((dropdown) => {
				observer.observe(dropdown, { attributes: true, attributeFilter: ["class"] });
			});
		},
	};

	// Initialization & Setup
	const init = {
		eventListeners() {
			// Tertiary dropdown event delegation on the main navigation element
			elements.navigation.addEventListener("click", eventManager.handleTertiaryInteraction, true);
			elements.navigation.addEventListener("keydown", eventManager.handleTertiaryInteraction, true);
			elements.navigation.addEventListener("focusout", eventManager.handleTertiaryFocus, true);

			// Enhanced escape handling with higher priority
			document.addEventListener("keydown", keyboardManager.handleEscape, true);
		},

		observer() {
			const observer = observerManager.create();
			observerManager.observe(observer);
		},
	};

	// Initialize tertiary dropdown system
	init.eventListeners();
	init.observer();
})();