// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="index.html">Introduction</a></li><li class="chapter-item expanded "><a href="Intune-Lab/introduction.html"><strong aria-hidden="true">1.</strong> Intune Lab</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="Intune-Lab/01-setting-up-the-lab.html"><strong aria-hidden="true">1.1.</strong> Setting Up The Lab</a></li><li class="chapter-item expanded "><a href="Intune-Lab/02-enrolling-devices.html"><strong aria-hidden="true">1.2.</strong> Enrolling Devices</a></li><li class="chapter-item expanded "><a href="Intune-Lab/03-polishing-oobe.html"><strong aria-hidden="true">1.3.</strong> Polishing OOBE</a></li><li class="chapter-item expanded "><a href="Intune-Lab/04-installing-apps.html"><strong aria-hidden="true">1.4.</strong> Installing Apps</a></li><li class="chapter-item expanded "><a href="Intune-Lab/05-creating-update-rings.html"><strong aria-hidden="true">1.5.</strong> Creating Update Rings</a></li><li class="chapter-item expanded "><a href="Intune-Lab/06-securing-devices.html"><strong aria-hidden="true">1.6.</strong> Securing Devices</a></li><li class="chapter-item expanded "><a href="Intune-Lab/07-enrolling-iphones.html"><strong aria-hidden="true">1.7.</strong> Enrolling iPhones</a></li><li class="chapter-item expanded "><a href="Intune-Lab/08-enrolling-androids.html"><strong aria-hidden="true">1.8.</strong> Enrolling Androids</a></li><li class="chapter-item expanded "><a href="Intune-Lab/09-monitor-and-report.html"><strong aria-hidden="true">1.9.</strong> Monitor &amp; Report</a></li><li class="chapter-item expanded "><a href="Intune-Lab/10-conclusion.html"><strong aria-hidden="true">1.10.</strong> Conclusion</a></li></ol></li><li class="chapter-item expanded "><a href="SOC101-Lab/introduction.html"><strong aria-hidden="true">2.</strong> SOC Lab</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="SOC101-Lab/01-hypervisor-and-network.html"><strong aria-hidden="true">2.1.</strong> Hypervisor &amp; Network</a></li><li class="chapter-item expanded "><a href="SOC101-Lab/02-windows-environment.html"><strong aria-hidden="true">2.2.</strong> Windows Environment</a></li><li class="chapter-item expanded "><a href="SOC101-Lab/03-security-onion.html"><strong aria-hidden="true">2.3.</strong> Security Onion</a></li><li class="chapter-item expanded "><a href="SOC101-Lab/04-splunk.html"><strong aria-hidden="true">2.4.</strong> Splunk</a></li><li class="chapter-item expanded "><a href="SOC101-Lab/05-forwarders.html"><strong aria-hidden="true">2.5.</strong> Forwarders</a></li></ol></li><li class="chapter-item expanded "><a href="Rust/rust-notes.html"><strong aria-hidden="true">3.</strong> Rust</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
