
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".site-nav .nav-links");

// Mobile navigation menu
if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("is-open");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            menuToggle.textContent = "☰";
        });
    });
}

// Smooth transitions between website pages
document.querySelectorAll('a[href]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const destination = new URL(link.href, window.location.href);

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

        // Keep same-page section navigation working normally
        if (
            destination.pathname === window.location.pathname &&
            destination.hash
        ) {
            return;
        }

        // Avoid reloading the exact same URL
        if (destination.href === window.location.href) {
            return;
        }

        event.preventDefault();
        document.body.classList.add("page-leaving");

        window.setTimeout(() => {
            window.location.href = destination.href;
        }, 220);
    });
});
