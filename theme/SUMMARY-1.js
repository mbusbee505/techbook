// Replace print button to print current page only
(function() {
    'use strict';

    window.addEventListener('load', function() {
        // Find the print button
        const printButton = document.getElementById('print-button');

        if (printButton) {
            // Remove the default href behavior
            printButton.removeAttribute('href');
            printButton.setAttribute('href', '#');

            // Add click handler to print current page
            printButton.addEventListener('click', function(e) {
                e.preventDefault();
                window.print();
            });
        }
    });
})();
