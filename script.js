/* =========================================================
   MRINMOY SINGHA
   Academic Research Website
   Control Systems Interaction Layer
   Light Mode Only
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       LIGHT MODE
       ===================================================== */

    document.documentElement.setAttribute("data-theme", "light");


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (event) {

            const selector = this.getAttribute("href");

            if (!selector || selector === "#") {
                return;
            }

            const target = document.querySelector(selector);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    document.querySelectorAll("[data-year]").forEach(element => {
        element.textContent = new Date().getFullYear();
    });


    /* =====================================================
       REDUCED MOTION
       ===================================================== */

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* =====================================================
       SYSTEM STATUS
       ===================================================== */

    const statusDot = document.querySelector(".status-dot");

    if (statusDot && !reducedMotion) {

        const startTime = performance.now();

        function animateStatus(time) {

            const elapsed = time - startTime;

            const opacity =
                0.55 +
                0.45 *
                (
                    0.5 +
                    0.5 *
                    Math.sin(elapsed / 500)
                );

            statusDot.style.opacity = opacity;

            requestAnimationFrame(animateStatus);
        }

        requestAnimationFrame(animateStatus);
    }


    /* =====================================================
       LIVE STATE NORM
       Small visual telemetry effect
       ===================================================== */

    const stateNorm = document.querySelector("#stateNorm");

    if (stateNorm && !reducedMotion) {

        const startTime = performance.now();

        function updateStateNorm(time) {

            const elapsed = time - startTime;

            /*
             * A decaying oscillation.
             *
             * This is only a visual representation of a
             * stable state trajectory.
             */

            const value =
                0.12 +
                0.72 *
                Math.exp(-elapsed / 5000) *
                Math.abs(
                    Math.cos(elapsed / 950)
                );

            stateNorm.textContent = value.toFixed(2);

            requestAnimationFrame(updateStateNorm);
        }

        requestAnimationFrame(updateStateNorm);
    }


    /* =====================================================
       INTERSECTION OBSERVER
       Activate research animations only when visible
       ===================================================== */

    const animatedElements = document.querySelectorAll(
        ".research-card, .project-card, .publication"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "is-visible"
                        );

                    }

                });

            },
            {
                threshold: 0.18
            }
        );

        animatedElements.forEach(element => {
            observer.observe(element);
        });

    } else {

        animatedElements.forEach(element => {
            element.classList.add("is-visible");
        });

    }


    /* =====================================================
       MOUSE RESPONSE FOR HERO CONTROL VISUAL
       Very subtle 3-D movement
       ===================================================== */

    const controlVisual =
        document.querySelector(".control-visual");

    if (
        controlVisual &&
        !reducedMotion &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        controlVisual.addEventListener(
            "mousemove",
            event => {

                const rect =
                    controlVisual.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) /
                    rect.width;

                const y =
                    (event.clientY - rect.top) /
                    rect.height;

                const rotateY =
                    (x - 0.5) * 3;

                const rotateX =
                    (0.5 - y) * 3;

                controlVisual.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            }
        );

        controlVisual.addEventListener(
            "mouseleave",
            () => {

                controlVisual.style.transform =
                    "perspective(900px) rotateX(0deg) rotateY(0deg)";

            }
        );

    }


    /* =====================================================
       PIPELINE PARTICLE
       ===================================================== */

    const pipeline =
        document.querySelector(".control-pipeline");

    if (pipeline) {

        pipeline.setAttribute(
            "aria-label",
            "Research pipeline: model, analyze, optimize, control, simulate"
        );

    }


    /* =====================================================
       PUBLICATION CURVE INTERACTION
       ===================================================== */

    const publication =
        document.querySelector(".publication");

    if (
        publication &&
        !reducedMotion &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        publication.addEventListener(
            "mouseenter",
            () => {
                publication.classList.add(
                    "publication-active"
                );
            }
        );

        publication.addEventListener(
            "mouseleave",
            () => {
                publication.classList.remove(
                    "publication-active"
                );
            }
        );

    }


    /* =====================================================
       CONTACT LOOP
       ===================================================== */

    const contactSystem =
        document.querySelector(".contact-system");

    if (
        contactSystem &&
        !reducedMotion
    ) {

        /*
         * Slightly stagger the signal particles so the
         * feedback loop feels continuous rather than synchronized.
         */

        const particles =
            contactSystem.querySelectorAll(
                ".signal-particle-dark"
            );

        particles.forEach((particle, index) => {

            particle.style.animationDelay =
                `${index * 0.35}s`;

        });

    }


    /* =====================================================
       ACTIVE NAVIGATION
       Highlights the section currently in view.
       ===================================================== */

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    const navLinks =
        document.querySelectorAll(
            ".nav-links a"
        );

    if (
        sections.length &&
        navLinks.length &&
        "IntersectionObserver" in window
    ) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        navLinks.forEach(link => {

                            link.classList.remove(
                                "active"
                            );

                            if (
                                link.getAttribute("href") ===
                                `#${entry.target.id}`
                            ) {

                                link.classList.add(
                                    "active"
                                );

                            }

                        });

                    });

                },
                {
                    rootMargin:
                        "-35% 0px -55% 0px",
                    threshold: 0
                }
            );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });

    }

});