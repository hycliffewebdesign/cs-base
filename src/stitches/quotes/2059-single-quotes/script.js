document.addEventListener('DOMContentLoaded', function () {
        const container = document.querySelector('#quote-2059 .cs-picture-group');
        const beforeImage = container.querySelector('.cs-picture-after img');
        const afterImage = container.querySelector('.cs-picture-before img');
        const afterContainer = container.querySelector('.cs-picture-before');
        const slider = container.querySelector('.cs-slider-wrapper');

        let isResizing = false;

        const getAspectRatio = (img) => img.naturalWidth / img.naturalHeight;

        const resize = (e) => {
            if (!isResizing) return;
            const containerRect = container.getBoundingClientRect();
            const x = (e.clientX || e.touches[0].clientX) - containerRect.left;
            const percent = Math.max(0, Math.min(100, x / containerRect.width * 100));
            slider.style.left = `${percent}%`;
            afterContainer.style.width = `${percent}%`;
        };

        const setDimensions = () => {
            const aspectRatio = getAspectRatio(beforeImage);
            const containerWidth = container.offsetWidth;
            const containerStyle = window.getComputedStyle(container);
            const maxHeight = parseInt(containerStyle.maxHeight);
            const containerHeight = containerWidth / aspectRatio;

            const finalHeight = Math.min(containerHeight, maxHeight);
            container.style.height = `${finalHeight}px`;

            const imageAspectRatio = aspectRatio;
            const containerAspectRatio = containerWidth / finalHeight;
            let imageWidth, imageHeight;

            if (imageAspectRatio > containerAspectRatio) {
                imageHeight = finalHeight;
                imageWidth = imageHeight * imageAspectRatio;
            } else {
                imageWidth = containerWidth;
                imageHeight = imageWidth / imageAspectRatio;
            }

            const offsetX = (containerWidth - imageWidth) / 2;
            const offsetY = (finalHeight - imageHeight) / 2;

            [beforeImage, afterImage].forEach(img => {
                img.style.width = `${imageWidth}px`;
                img.style.height = `${imageHeight}px`;
                img.style.left = `${offsetX}px`;
                img.style.top = `${offsetY}px`;
            });

            afterContainer.style.width = '50%';
        };

        Promise.all(Array.from(container.querySelectorAll('img')).map(img => {
            return new Promise((resolve) => {
                if (img.complete) resolve();
                else img.onload = resolve;
            });
        })).then(setDimensions);

        window.addEventListener('resize', setDimensions);

        container.addEventListener('mousedown', () => isResizing = true);
        container.addEventListener('touchstart', () => isResizing = true);
        window.addEventListener('mousemove', resize);
        window.addEventListener('touchmove', resize);
        window.addEventListener('mouseup', () => isResizing = false);
        window.addEventListener('touchend', () => isResizing = false);

        container.addEventListener('mousemove', (e) => {
            if (!isResizing) {
                const containerRect = container.getBoundingClientRect();
                const x = e.clientX - containerRect.left;
                const percent = Math.max(0, Math.min(100, x / containerRect.width * 100));
                slider.style.left = `${percent}%`;
                afterContainer.style.width = `${percent}%`;
            }
        });

        container.addEventListener('mouseleave', () => {
            if (!isResizing) {
                slider.style.left = '50%';
                afterContainer.style.width = '50%';
            }
        });
    });