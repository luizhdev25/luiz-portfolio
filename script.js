
// =====================================
// MOBILE NAVIGATION
// =====================================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

const navigationLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.classList.toggle("active", isOpen);

    menuToggle.setAttribute("aria-expanded", String(isOpen));

});


navigationLinks.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

    });

});


document.addEventListener("click", event => {

    const clickedInsideMenu = navLinks.contains(event.target);

    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {

        navLinks.classList.remove("open");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

    }

});


// =====================================
// DARK AND LIGHT THEME
// =====================================

const themeToggle = document.getElementById("theme-toggle");

const themeIcon = document.getElementById("theme-icon");


function applyTheme(theme) {

    const isLight = theme === "light";

    document.body.classList.toggle("light-theme", isLight);

    themeIcon.textContent = isLight ? "☾" : "☀";

    themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark mode" : "Switch to light mode"
    );

}


const savedTheme = localStorage.getItem("portfolio-theme");

applyTheme(savedTheme === "light" ? "light" : "dark");


themeToggle.addEventListener("click", () => {

    const isCurrentlyLight =
        document.body.classList.contains("light-theme");

    const newTheme = isCurrentlyLight ? "dark" : "light";

    applyTheme(newTheme);

    localStorage.setItem("portfolio-theme", newTheme);

});


// =====================================
// SCROLL REVEAL ANIMATION
// =====================================

const revealElements = document.querySelectorAll(".reveal");


const revealObserver = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.12
});


revealElements.forEach(element => {

    revealObserver.observe(element);

});


// =====================================
// PROJECT CARD 3D EFFECT
// =====================================

const projectCards = document.querySelectorAll(".project-card");


projectCards.forEach(card => {

    card.addEventListener("pointermove", event => {

        if (event.pointerType !== "mouse") return;

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;

        const y = event.clientY - rect.top;

        const rotateX = ((y / rect.height) - 0.5) * -5;

        const rotateY = ((x / rect.width) - 0.5) * 5;

        card.style.transform = `
            translateY(-8px)
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
        `;

    });


    card.addEventListener("pointerleave", () => {

        card.style.transform = "";

    });

});


// =====================================
// SKILL AND CERTIFICATE CARD EFFECT
// =====================================

const interactiveCards = document.querySelectorAll(
    ".skill-card, .certificate-card"
);


interactiveCards.forEach(card => {

    card.addEventListener("pointerenter", event => {

        if (event.pointerType !== "mouse") return;

        card.style.transform = "translateY(-7px)";

    });


    card.addEventListener("pointerleave", () => {

        card.style.transform = "";

    });

});


// =====================================
// ACTIVE NAVIGATION ON SCROLL
// =====================================

const sections = document.querySelectorAll("main section[id]");


const sectionObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const currentId = entry.target.getAttribute("id");

        navigationLinks.forEach(link => {

            const linkId = link.getAttribute("href").replace("#", "");

            link.classList.toggle("active", linkId === currentId);

        });

    });

}, {
    rootMargin: "-35% 0px -55% 0px"
});


sections.forEach(section => {

    sectionObserver.observe(section);

});


// =====================================
// BACK TO TOP
// =====================================

const backTop = document.querySelector(".back-top");


backTop.addEventListener("click", event => {

    event.preventDefault();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// =====================================
// AUTOMATIC FOOTER YEAR
// =====================================

document.getElementById("current-year").textContent =
    new Date().getFullYear();
