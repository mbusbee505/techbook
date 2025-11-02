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

        // Create header with title and toggle button
        const tocHeader = document.createElement('div');
        tocHeader.className = 'toc-header';

        const tocTitle = document.createElement('div');
        tocTitle.className = 'toc-title';
        tocTitle.textContent = 'Page Outline';

        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'toc-toggle';
        toggleBtn.innerHTML = '☰';
        toggleBtn.setAttribute('aria-label', 'Close table of contents');

        tocHeader.appendChild(tocTitle);
        tocHeader.appendChild(toggleBtn);
        tocContainer.appendChild(tocHeader);

        // Create external toggle button (shown when TOC is collapsed)
        const externalToggle = document.createElement('button');
        externalToggle.className = 'toc-toggle-btn';
        externalToggle.innerHTML = '☰';
        externalToggle.setAttribute('aria-label', 'Open table of contents');

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
        document.body.appendChild(externalToggle);

        // Toggle functionality
        function toggleToc() {
            const isCollapsed = tocContainer.classList.contains('collapsed');

            if (isCollapsed) {
                // Show TOC
                tocContainer.classList.remove('collapsed');
                externalToggle.classList.remove('show');
            } else {
                // Hide TOC
                tocContainer.classList.add('collapsed');
                // Show external toggle button after TOC animation completes
                setTimeout(function() {
                    externalToggle.classList.add('show');
                }, 300);
            }

            // Save state to localStorage
            localStorage.setItem('tocCollapsed', !isCollapsed);
        }

        toggleBtn.addEventListener('click', toggleToc);
        externalToggle.addEventListener('click', toggleToc);

        // Restore collapsed state from localStorage
        const savedState = localStorage.getItem('tocCollapsed');
        if (savedState === 'true') {
            tocContainer.classList.add('collapsed');
            externalToggle.classList.add('show');
        }

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
