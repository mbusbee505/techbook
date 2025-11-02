// Collapse left sidebar by default
(function() {
    'use strict';

    window.addEventListener('load', function() {
        const sidebar = document.querySelector('.sidebar');
        const sidebarToggle = document.getElementById('sidebar-toggle');

        if (sidebar && sidebarToggle) {
            // Check if user has a preference saved
            const sidebarState = localStorage.getItem('mdbook-sidebar');

            // If no preference, collapse by default
            if (sidebarState === null) {
                sidebar.classList.add('hidden');
                localStorage.setItem('mdbook-sidebar', 'hidden');
            }
        }
    });
})();
