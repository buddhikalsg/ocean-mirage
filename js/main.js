
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("is-open");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuToggle.textContent = isOpen ? "✕" : "☰";
    });
}



/* Smooth Transitions Between Website Pages */

document.querySelectorAll("a[href]").forEach(function (link) {
    link.addEventListener("click", function (event) {
        const destination = new URL(link.href, window.location.href);

        // Allow normal browser behaviour for special links.
        if (
            event.ctrlKey ||
            event.metaKey ||
            event.shiftKey ||
            event.altKey ||
            link.target === "_blank" ||
            link.hasAttribute("download") ||
            destination.origin !== window.location.origin
        ) {
            return;
        }

        // Keep same-page section links working normally.
        if (
            destination.pathname === window.location.pathname &&
            destination.hash
        ) {
            return;
        }

        // Ignore links that point to the current page.
        if (destination.href === window.location.href) {
            return;
        }

        event.preventDefault();

        document.body.classList.add("page-leaving");

        setTimeout(function () {
            window.location.href = destination.href;
        }, 220);
    });
});
