class HeroSlideshow {
    constructor(heroElement) {
        // config
        this.hero = heroElement;
        this.dots = Array.from(this.hero.querySelectorAll('.cs-dot'));
        this.slides = Array.from(this.hero.querySelectorAll('.cs-background'));
        this.currentSlide = 0;
        this.totalSlides = this.dots.length;
        this.slideDuration = 7000; // 7 seconds - this needs to be the same as the transition duration in the css
        this.slideInterval = null;

        this.init();
    }

    init() {
        this.slides.forEach((slide, index) => {
            slide.style.opacity = index === 0 ? '1' : '0';
        });

        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.handleDotClick(index));
        });

        this.activateDot(0);
        this.startSlideshow();
    }

    activateDot(index) {
        const dot = this.dots[index];
        dot.classList.add('cs-active');
    }

    deactivateDot(index) {
        const dot = this.dots[index];
        dot.classList.remove('cs-active');
    }

    goToSlide(slideIndex) {
        this.deactivateDot(this.currentSlide);
        this.slides[this.currentSlide].style.opacity = '0';
        this.currentSlide = slideIndex;

        requestAnimationFrame(() => {
            this.activateDot(this.currentSlide);
            this.slides[this.currentSlide].style.opacity = '1';
        });
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    }

    startSlideshow() {
        this.slideInterval = setInterval(() => this.nextSlide(), this.slideDuration);
    }

    resetSlideshow() {
        clearInterval(this.slideInterval);
        this.startSlideshow();
    }

    handleDotClick(index) {
        if (index !== this.currentSlide) {
            this.goToSlide(index);
            this.resetSlideshow();
        }
    }

    destroy() {
        clearInterval(this.slideInterval);
        this.dots.forEach((dot, index) => {
            dot.removeEventListener('click', () => this.handleDotClick(index));
        });
    }
}

// initialize slideshow on DOM ready, if the hero element exists. this prevents errors if the hero element does not exist.
document.addEventListener('DOMContentLoaded', function () {
    const hero = document.querySelector('#hero-2469');
    if (hero) {
        new HeroSlideshow(hero);
    }
});