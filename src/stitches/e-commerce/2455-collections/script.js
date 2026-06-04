class CollectionCarousel {
	constructor() {
		this.slideshow = document.querySelector("#collection-2455 .cs-slideshow");
		this.items = Array.from(document.querySelectorAll("#collection-2455 .cs-item"));
		this.prevButton = document.querySelector("#collection-2455 .cs-button:first-of-type");
		this.nextButton = document.querySelector("#collection-2455 .cs-button:last-of-type");

		this.currentIndex = 0;
		this.isMoving = false;

		this.desktopQuery = window.matchMedia("(min-width: 48rem)");

		this.init();
	}

	init() {
		this.prevButton?.addEventListener("click", () => this.moveSlide("prev"));
		this.nextButton?.addEventListener("click", () => this.moveSlide("next"));

		this.desktopQuery.addEventListener("change", () => {
			this.currentIndex = 0;
			this.updateSlidePosition(false);
		});
	}

	getItemsPerView() {
		return this.desktopQuery.matches ? 6 : 3;
	}

	moveSlide(direction) {
		if (this.isMoving) return;
		this.isMoving = true;

		const itemsPerView = this.getItemsPerView();
		const maxIndex = this.items.length - itemsPerView;

		if (direction === "next") {
			this.currentIndex++;
			if (this.currentIndex > maxIndex) {
				this.currentIndex = 0;
			}
		} else {
			this.currentIndex--;
			if (this.currentIndex < 0) {
				this.currentIndex = maxIndex;
			}
		}

		this.updateSlidePosition(true);

		setTimeout(() => {
			this.isMoving = false;
		}, 500);
	}

	updateSlidePosition(animate = true) {
		if (!this.slideshow || !this.items.length) return;

		const itemWidth = this.items[0].offsetWidth;
		const gap = parseFloat(getComputedStyle(this.slideshow).gap);
		const moveDistance = (itemWidth + gap) * this.currentIndex;

		this.slideshow.style.transform = `translateX(-${moveDistance}px)`;
	}
}

document.addEventListener("DOMContentLoaded", () => {
	new CollectionCarousel();
});