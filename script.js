/* =========================================================
   MRINMOY SINGHA — ACADEMIC WEBSITE
   Light Mode Only
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ================= LIGHT MODE ================= */

    // Force light mode regardless of the device's system theme
    document.documentElement.setAttribute("data-theme", "light");


    /* ================= SMOOTH SCROLL ================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const target = document.querySelector(
                this.getAttribute("href")
            );

            if (target) {
                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    });


    /* ================= CURRENT YEAR ================= */

    const yearElements = document.querySelectorAll("[data-year]");

    yearElements.forEach(element => {
        element.textContent = new Date().getFullYear();
    });


    /* ================= CONTROL SYSTEM STATUS ================= */

    const statusDot = document.querySelector(".status-dot");

    if (statusDot) {

        let startTime = performance.now();

        function animateStatus(time) {

            const elapsed = time - startTime;

            // Subtle pulsing effect
            const opacity =
                0.55 + 0.45 * (0.5 + 0.5 * Math.sin(elapsed / 500));

            statusDot.style.opacity = opacity;

            requestAnimationFrame(animateStatus);
        }

        requestAnimationFrame(animateStatus);
    }

});