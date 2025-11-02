// Generate table of contents for current page
(function() {
    'use strict';

    // Wait for page to load
    window.addEventListener('load', function() {
        const content = document.querySelector('.content');
        if (!content) return;

        // Get all headers
        const headers = content.querySelectorAll('h1, h2, h3, h4, h5, h6');
        if (headers.length === 0) return;

        // Create TOC container
        const tocContainer = document.createElement('div');
        tocContainer.className = 'page-toc';
        tocContainer.innerHTML = '<div class="toc-title">On this page</div>';

        const tocList = document.createElement('ul');
        tocList.className = 'toc-list';

        headers.forEach(function(header) {
            // Skip the main title (first h1)
            if (header.tagName === 'H1' && header === headers[0]) return;

            const level = parseInt(header.tagName.charAt(1));
            const id = header.id || header.textContent.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

            if (!header.id) {
                header.id = id;
            }

            const listItem = document.createElement('li');
            listItem.className = 'toc-item toc-level-' + level;

            const link = document.createElement('a');
            link.href = '#' + id;
            link.textContent = header.textContent;
            link.className = 'toc-link';

            listItem.appendChild(link);
            tocList.appendChild(listItem);
        });

        tocContainer.appendChild(tocList);
        document.body.appendChild(tocContainer);

        // Highlight current section on scroll
        let currentActive = null;

        function updateActiveLink() {
            const scrollPos = window.scrollY + 100;
            let activeHeader = null;

            headers.forEach(function(header) {
                if (header.offsetTop <= scrollPos) {
                    activeHeader = header;
                }
            });

            if (activeHeader && activeHeader.id) {
                const links = tocList.querySelectorAll('.toc-link');
                links.forEach(function(link) {
                    if (link.getAttribute('href') === '#' + activeHeader.id) {
                        if (currentActive) currentActive.classList.remove('active');
                        link.classList.add('active');
                        currentActive = link;
                    }
                });
            }
        }

        window.addEventListener('scroll', updateActiveLink);
        updateActiveLink();
    });
})();
