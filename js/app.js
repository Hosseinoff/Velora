"use strict";


/* =========================
   HELPERS
========================= */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);


const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


/* =========================
   MOBILE MENU
========================= */

const menuButton = $(".menu-btn");
const navLinks = $(".nav-links");


if (menuButton && navLinks) {

    menuButton.addEventListener("click", () => {

        const isOpen =
            navLinks.classList.toggle("open");

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });


    $$(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* =========================
   SCROLL PROGRESS
========================= */

const progress =
    $("#scroll-progress");


function updateProgress() {

    if (!progress) return;


    const scrollTop =
        window.scrollY;


    const documentHeight =
        document.documentElement.scrollHeight;


    const viewportHeight =
        window.innerHeight;


    const maxScroll =
        documentHeight - viewportHeight;


    const percentage =
        maxScroll > 0
            ? (scrollTop / maxScroll) * 100
            : 0;


    progress.style.width =
        `${percentage}%`;

}


window.addEventListener(
    "scroll",
    updateProgress,
    { passive: true }
);


updateProgress();


/* =========================
   REVEAL ANIMATION
========================= */

const revealElements =
    $$(".reveal");


if (
    "IntersectionObserver"
    in window
) {

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add("visible");

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: .12
            }
        );


    revealElements.forEach(element => {

        observer.observe(element);

    });

} else {

    revealElements.forEach(element => {

        element.classList.add(
            "visible"
        );

    });

}


/* =========================
   YEAR
========================= */

const yearElement =
    $("#year");


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================
   COPY EMAIL
========================= */

const copyEmailButton =
    $("#copy-email");


const toast =
    $(".toast");


if (copyEmailButton) {

    copyEmailButton.addEventListener(
        "click",
        async () => {

            const email =
                "hossein.tavakoli.one@gmail.com";


            try {

                await navigator
                    .clipboard
                    .writeText(email);


                showToast(
                    "ایمیل با موفقیت کپی شد ✓"
                );


            } catch (error) {

                window.location.href =
                    `mailto:${email}`;

            }

        }
    );

}


/* =========================
   TOAST
========================= */

function showToast(message) {

    if (!toast) return;


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(() => {

        toast.classList.remove(
            "show"
        );

    }, 1800);

}


/* =========================
   CONTACT FORM
========================= */

const contactForm =
    $("#contact-form");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                $("#name")?.value.trim();


            const email =
                $("#email")?.value.trim();


            const message =
                $("#message")?.value.trim();


            if (
                !name ||
                !email ||
                !message
            ) {

                showToast(
                    "لطفاً همه فیلدها را تکمیل کنید."
                );

                return;

            }


            const subject =
                encodeURIComponent(
                    `درخواست همکاری از ${name}`
                );


            const body =
                encodeURIComponent(
                    `نام: ${name}

ایمیل: ${email}

پیام:
${message}`
                );


            window.location.href =
                `mailto:hossein.tavakoli.one@gmail.com?subject=${subject}&body=${body}`;

        }
    );

}


/* =========================
   3D TILT
========================= */

const tiltElements =
    $$("[data-tilt]");


tiltElements.forEach(element => {

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {
        return;
    }


    if (
        window.innerWidth < 900
    ) {
        return;
    }


    element.addEventListener(
        "pointermove",
        event => {

            const rect =
                element.getBoundingClientRect();


            const x =
                (event.clientX - rect.left)
                / rect.width
                - .5;


            const y =
                (event.clientY - rect.top)
                / rect.height
                - .5;


            const rotateX =
                (-y * 4).toFixed(2);


            const rotateY =
                (x * 5).toFixed(2);


            element.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-4px)`;

        }
    );


    element.addEventListener(
        "pointerleave",
        () => {

            element.style.transform =
                "";

        }
    );

});