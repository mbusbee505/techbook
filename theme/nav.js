// Custom navigation buttons
(function() {
    'use strict';

    window.addEventListener('load', function() {
        // Get the existing navigation links
        const prevLink = document.querySelector('.nav-chapters.previous');
        const nextLink = document.querySelector('.nav-chapters.next');

        if (!prevLink && !nextLink) return;

        // Create top navigation container
        const topNav = document.createElement('div');
        topNav.className = 'custom-nav custom-nav-top';

        // Create bottom navigation container
        const bottomNav = document.createElement('div');
        bottomNav.className = 'custom-nav custom-nav-bottom';

        // Create previous button
        if (prevLink && prevLink.href) {
            const prevBtnTop = document.createElement('a');
            prevBtnTop.href = prevLink.href;
            prevBtnTop.className = 'nav-arrow nav-prev';
            prevBtnTop.innerHTML = '←';
            prevBtnTop.setAttribute('aria-label', 'Previous page');
            topNav.appendChild(prevBtnTop);

            const prevBtnBottom = document.createElement('a');
            prevBtnBottom.href = prevLink.href;
            prevBtnBottom.className = 'nav-arrow nav-prev';
            prevBtnBottom.innerHTML = '←';
            prevBtnBottom.setAttribute('aria-label', 'Previous page');
            bottomNav.appendChild(prevBtnBottom);
        }

        // Create next button
        if (nextLink && nextLink.href) {
            const nextBtnTop = document.createElement('a');
            nextBtnTop.href = nextLink.href;
            nextBtnTop.className = 'nav-arrow nav-next';
            nextBtnTop.innerHTML = '→';
            nextBtnTop.setAttribute('aria-label', 'Next page');
            topNav.appendChild(nextBtnTop);

            const nextBtnBottom = document.createElement('a');
            nextBtnBottom.href = nextLink.href;
            nextBtnBottom.className = 'nav-arrow nav-next';
            nextBtnBottom.innerHTML = '→';
            nextBtnBottom.setAttribute('aria-label', 'Next page');
            bottomNav.appendChild(nextBtnBottom);
        }

        // Add navigation to page
        document.body.appendChild(topNav);
        document.body.appendChild(bottomNav);
    });
})();
