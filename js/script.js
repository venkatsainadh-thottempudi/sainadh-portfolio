
// PORTFOLIO INTERACTIONS

emailjs.init({
    publicKey: "Qu0IlCCe0LRpAvukH",
});

document.addEventListener("DOMContentLoaded", () => {

    // 1. Scroll reveal animation

    const revealElements = document.querySelectorAll(
        ".section-heading, .about-content, .about-info, " +
        ".skill-card, .project-card, .timeline-item, " +
        ".certificate-card, .contact-container"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    
    // 2. Animated circular skill indicators

    const skillCircles = document.querySelectorAll(".skill-circle");

    const skillObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const circle = entry.target;

                const target = parseInt(
                    circle.style.getPropertyValue("--percentage"),
                    10
                );

                const number = circle.querySelector("span");

                if (isNaN(target) || !number) {
                    console.error("Skill percentage not found:", circle);
                    return;
                }

                let current = 0;
                const duration = 1500;
                const start = performance.now();

                function animate(now) {

                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);

                    current = Math.round(target * progress);

                    circle.style.setProperty("--progress", current);
                    number.textContent = current + "%";

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    }
                }

                requestAnimationFrame(animate);

                skillObserver.unobserve(circle);
            }

        });

    }, { threshold: 0.1 });

    skillCircles.forEach(circle => {
        circle.style.setProperty("--progress", 0);
        skillObserver.observe(circle);
    });
}); 

// Contact Form - EmailJS
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    formStatus.textContent = "Sending message...";

    const templateParams = {
        from_name: document.getElementById("name").value,
        from_email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    emailjs.send(
        "service_gkmdnbj",
        "template_3zwehl6",
        templateParams
    )
    .then(function () {
        formStatus.textContent = "Message sent successfully! Thank you.";
        formStatus.style.color = "#38bdf8";
        contactForm.reset();
    })
    .catch(function (error) {
        console.error("EmailJS Error:", error);
        formStatus.textContent = "Failed to send message. Please try again.";
        formStatus.style.color = "#ff4d6d";
    });
});


// Project Details Modal
const projectDetails = {
    "portfolio": {
        label: "Personal Project",
        title: "Personal Developer Portfolio",
        description: "A responsive personal portfolio website built to showcase my technical skills, projects and professional journey with a modern dark-themed interface.",
        features: [
            "Responsive design for desktop and mobile devices",
            "Animated hero section and typing effect",
            "Interactive project details modals",
            "Contact form integration using EmailJS",
            "Resume download functionality",
            "Mobile hamburger navigation",
            "SEO and social sharing metadata"
        ],
        technologies: ["HTML5", "CSS3", "JavaScript", "EmailJS"],
        github: "https://github.com/venkatsainadh-thottempudi/sainadh-portfolio"
    },

    "ai-reviewer": {
        label: "Python Project",
        title: "AI Code Reviewer",
        description: "A Python-based code analysis tool that evaluates source code quality and helps identify potential improvements.",
        features: [
            "Code quality analysis",
            "Docstring coverage evaluation",
            "Cyclomatic complexity analysis",
            "Coding-style compliance checks"
        ],
        technologies: ["Python", "Streamlit", "HTML"],
        github: "https://github.com/venkatsainadh-thottempudi/ai_code_reviewer"
    },

    
    "secure-transfer": {
        label: "Academic Team Project",
        title: "Secure File Transfer System",
        description: "A team-developed application designed for secure file sharing using AES and RSA encryption. My primary contribution was developing the frontend interface using HTML, CSS and JavaScript.",
        features: [
            "Frontend interface for file-sharing operations",
            "User interface development using HTML, CSS and JavaScript",
            "Collaboration with the team on the file-sharing application",
            "Team project incorporating AES and RSA encryption"
        ],
        technologies: ["HTML", "CSS", "JavaScript", "Python Flask", "MySQL", "AES / RSA"],
        github: null
    }

};

function openProjectModal(projectId) {
    const project = projectDetails[projectId];

    if (!project) return;

    document.getElementById("modalLabel").textContent = project.label;
    document.getElementById("modalTitle").textContent = project.title;
    document.getElementById("modalDescription").textContent = project.description;

    const features = document.getElementById("modalFeatures");
    features.innerHTML = "";

    project.features.forEach(feature => {
        const li = document.createElement("li");
        li.textContent = feature;
        features.appendChild(li);
    });

    const tech = document.getElementById("modalTech");
    tech.innerHTML = "";

    project.technologies.forEach(item => {
        const span = document.createElement("span");
        span.textContent = item;
        tech.appendChild(span);
    });

    const github = document.getElementById("modalGithub");

    if (project.github) {
        github.href = project.github;
        github.style.display = "inline-block";
    } else {
        github.style.display = "none";
        github.removeAttribute("href");
    }

    document.getElementById("projectModal").classList.add("active");
}

function closeProjectModal() {
    document.getElementById("projectModal").classList.remove("active");
}

// Close modal when clicking outside
document.getElementById("projectModal").addEventListener("click", function(event) {
    if (event.target === this) {
        closeProjectModal();
    }
});

// Close modal using Escape key
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeProjectModal();
    }
});


// ===== PRELOADER ANIMATION =====

window.addEventListener("load", function () {

    const preloader = document.getElementById("preloader");
    const progressBar = document.getElementById("loaderProgress");
    const percentageText = document.getElementById("loaderPercentage");

    let progress = 0;

    const loadingInterval = setInterval(function () {

        progress += 1;

        progressBar.style.width = progress + "%";
        percentageText.textContent = progress + "%";

        if (progress >= 100) {
            clearInterval(loadingInterval);

            setTimeout(function () {
                preloader.classList.add("hide");
            }, 400);
        }

    }, 20);

});


// ===== SCROLL PROGRESS & BACK TO TOP =====

const scrollProgress = document.getElementById("scrollProgress");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {

    // Calculate scroll progress
    const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const scrollPercentage = scrollableHeight > 0
        ? (window.scrollY / scrollableHeight) * 100
        : 0;

    scrollProgress.style.width = scrollPercentage + "%";

    // Show or hide back-to-top button
    if (window.scrollY > 300) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

});

// Smooth scroll to top
backToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// ===== CUSTOM NEON CURSOR =====

const cursorDot = document.getElementById("cursorDot");
const cursorRing = document.getElementById("cursorRing");

if (cursorDot && cursorRing) {

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    document.addEventListener("mousemove", function (event) {
        mouseX = event.clientX;
        mouseY = event.clientY;

        cursorDot.style.left = mouseX + "px";
        cursorDot.style.top = mouseY + "px";
    });

    function animateCursor() {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;

        cursorRing.style.left = ringX + "px";
        cursorRing.style.top = ringY + "px";

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Enlarge cursor when hovering over interactive elements
    const interactiveElements = document.querySelectorAll(
        "a, button, .project-card, input, textarea"
    );

    interactiveElements.forEach(element => {

        element.addEventListener("mouseenter", function () {
            cursorRing.classList.add("cursor-hover");
        });

        element.addEventListener("mouseleave", function () {
            cursorRing.classList.remove("cursor-hover");
        });

    });
}


/* ===== HERO TYPING EFFECT ===== */

const typingText = document.getElementById("typingText");

if (typingText) {
    const roles = [
        "Java Developer",
        "Software Engineer",
        "Full Stack Developer",
        "Problem Solver"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {
        const currentRole = roles[roleIndex];

        if (deleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        typingText.textContent = currentRole.substring(0, charIndex);

        let delay = deleting ? 55 : 100;

        if (!deleting && charIndex === currentRole.length) {
            deleting = true;
            delay = 1500;
        } else if (deleting && charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            delay = 400;
        }

        setTimeout(typeEffect, delay);
    }

    typeEffect();
}


/* ===== MOBILE HAMBURGER MENU ===== */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuToggle.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

// Close menu after clicking a navigation link
navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
});
