document.addEventListener("DOMContentLoaded", () => {
	// Get all review wrapper elements
	const reviewWrappers = document.querySelectorAll("#reviews-2327 .cs-wrapper");

	// Get navigation buttons (existing ones in your HTML)
	const prevButton = document.querySelector("#reviews-2327 .cs-flex .cs-button:first-child");
	const nextButton = document.querySelector("#reviews-2327 .cs-flex .cs-button:last-child");

	// Initialize the current review index
	let currentReviewIndex = 0;

	// Function to show a specific review
	const showReview = (index) => {
		// Hide all reviews
		reviewWrappers.forEach((wrapper) => {
			wrapper.classList.add("cs-hidden");
			wrapper.classList.remove("cs-active");
		});

		// Show the specified review
		reviewWrappers[index].classList.remove("cs-hidden");
		reviewWrappers[index].classList.add("cs-active");

		// Update current index
		currentReviewIndex = index;
	};

	// Next button click event
	if (nextButton) {
		nextButton.addEventListener("click", () => {
			let nextIndex = currentReviewIndex + 1;

			// Loop back to the first review if at the end
			if (nextIndex >= reviewWrappers.length) {
				nextIndex = 0;
			}

			showReview(nextIndex);
		});
	}

	// Previous button click event
	if (prevButton) {
		prevButton.addEventListener("click", () => {
			let prevIndex = currentReviewIndex - 1;

			// Loop to the last review if at the beginning
			if (prevIndex < 0) {
				prevIndex = reviewWrappers.length - 1;
			}

			showReview(prevIndex);
		});
	}

	// Initialize by showing the first review and hiding others
	reviewWrappers.forEach((wrapper, index) => {
		if (index === 0) {
			wrapper.classList.add("cs-active");
			wrapper.classList.remove("cs-hidden");
		} else {
			wrapper.classList.add("cs-hidden");
			wrapper.classList.remove("cs-active");
		}
	});
});