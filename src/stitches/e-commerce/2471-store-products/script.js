class ProductQuantity {
    constructor(quantityElement) {
        this.quantityElement = quantityElement;
        this.minusButton = this.quantityElement.querySelectorAll('.cs-quantity-button')[0];
        this.plusButton = this.quantityElement.querySelectorAll('.cs-quantity-button')[1];
        this.valueDisplay = this.quantityElement.querySelector('.cs-quantity-value');
        this.quantity = parseInt(this.valueDisplay.textContent) || 1;
        this.minQuantity = 1;

        this.init();
    }

    init() {
        this.minusButton.addEventListener('click', () => this.decrement());
        this.plusButton.addEventListener('click', () => this.increment());
        this.updateDisplay();
    }

    increment() {
        this.quantity++;
        this.updateDisplay();
    }

    decrement() {
        if (this.quantity > this.minQuantity) {
            this.quantity--;
            this.updateDisplay();
        }
    }

    updateDisplay() {
        this.valueDisplay.textContent = this.quantity;

        if (this.quantity <= this.minQuantity) {
            this.minusButton.classList.add('cs-inactive');
        } else {
            this.minusButton.classList.remove('cs-inactive');
        }
    }

    destroy() {
        this.minusButton.removeEventListener('click', () => this.decrement());
        this.plusButton.removeEventListener('click', () => this.increment());
    }
}

class ProductImageGallery {
    constructor(productElement) {
        this.productElement = productElement;
        this.largeImages = Array.from(this.productElement.querySelectorAll('.cs-large-image'));
        this.thumbnails = Array.from(this.productElement.querySelectorAll('.cs-thumbnail'));
        this.currentIndex = 0;

        this.init();
    }

    init() {
        this.largeImages.forEach((image, index) => {
            image.style.opacity = index === 0 ? '1' : '0';
        });

        if (this.thumbnails.length > 0) {
            this.thumbnails[0].classList.add('cs-active');
        }

        this.thumbnails.forEach((thumbnail) => {
            thumbnail.addEventListener('click', () => {
                const index = parseInt(thumbnail.getAttribute('data-index'));
                this.handleThumbnailClick(index);
            });
        });
    }

    handleThumbnailClick(index) {
        if (index !== this.currentIndex) {
            this.thumbnails[this.currentIndex].classList.remove('cs-active');
            this.largeImages[this.currentIndex].style.opacity = '0';
            this.currentIndex = index;
            this.thumbnails[this.currentIndex].classList.add('cs-active');

            requestAnimationFrame(() => {
                this.largeImages[this.currentIndex].style.opacity = '1';
            });
        }
    }

    destroy() {
        this.thumbnails.forEach((thumbnail) => {
            const index = parseInt(thumbnail.getAttribute('data-index'));
            thumbnail.removeEventListener('click', () => this.handleThumbnailClick(index));
        });
    }
}

// initialize components on DOM ready
document.addEventListener('DOMContentLoaded', function () {
    const product = document.querySelector('#product-2471');
    if (product) {
        const quantityElement = product.querySelector('.cs-quantity');
        if (quantityElement) {
            new ProductQuantity(quantityElement);
        }

        new ProductImageGallery(product);
    }
});