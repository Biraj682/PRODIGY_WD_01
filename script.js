/* ==================== Scroll Effect Functionality ==================== */

// Get the navbar element
const navbar = document.querySelector('.navbar');

// Variable to track scroll state
let isScrolled = false;

// Function to handle scroll event
function handleScroll() {
    const scrollPosition = window.scrollY;

    // Check if scrolled past 50 pixels
    if (scrollPosition > 50) {
        // Add 'scrolled' class if not already added
        if (!isScrolled) {
            navbar.classList.add('scrolled');
            isScrolled = true;
        }
    } else {
        // Remove 'scrolled' class if scrolled back to top
        if (isScrolled) {
            navbar.classList.remove('scrolled');
            isScrolled = false;
        }
    }
}

// Add scroll event listener
window.addEventListener('scroll', handleScroll);

/* ==================== Smooth Scroll for Navigation Links ==================== */

// Get all navigation links
const navLinks = document.querySelectorAll('.navbar-link');

// Add click event listener to each link for smooth scrolling
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        // Get the target section id from the href attribute
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        // Smooth scroll to target section
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ==================== Form Submission ==================== */

// Get the contact form
const contactForm = document.querySelector('.contact-form');

// Handle form submission
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form inputs
        const nameInput = this.querySelector('input[type="text"]');
        const emailInput = this.querySelector('input[type="email"]');
        const messageInput = this.querySelector('textarea');

        // Validate form (basic validation)
        if (nameInput.value.trim() === '' || emailInput.value.trim() === '' || messageInput.value.trim() === '') {
            alert('Please fill in all fields');
            return;
        }

        // Show success message
        alert(`Thank you for your message, ${nameInput.value}! We will get back to you soon.`);

        // Reset form
        this.reset();
    });
}

/* ==================== CTA Button Click Handler ==================== */

// Get the CTA button
const ctaButton = document.querySelector('.cta-button');

// Add click event listener to CTA button
if (ctaButton) {
    ctaButton.addEventListener('click', function () {
        // Smooth scroll to contact section
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

/* ==================== Active Link Highlighting ==================== */

// Function to update active link based on scroll position
function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.navbar-link[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all links
            navLinks.forEach(link => link.style.color = '');

            // Add active styling to current link
            if (navLink) {
                navLink.style.color = '#3498db';
                navLink.style.fontWeight = 'bold';
            }
        }
    });
}

// Add scroll event listener for active link highlighting
window.addEventListener('scroll', updateActiveLink);

/* ==================== Add Animation on Scroll for Elements ==================== */

// Create Intersection Observer for fade-in animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for fade-in effect
const sections = document.querySelectorAll('.section');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

/* ==================== Mobile Menu Toggle (Optional) ==================== */

// This can be extended to add a hamburger menu for mobile devices
// You can uncomment and modify this section if you want to add a mobile menu

/*
const navbarContainer = document.querySelector('.navbar-container');
const menuToggle = document.createElement('button');
menuToggle.classList.add('menu-toggle');
menuToggle.innerHTML = '☰';
menuToggle.style.display = 'none';

navbarContainer.appendChild(menuToggle);

function checkScreenSize() {
    if (window.innerWidth <= 768) {
        menuToggle.style.display = 'block';
    } else {
        menuToggle.style.display = 'none';
        document.querySelector('.navbar-menu').style.display = 'flex';
    }
}

window.addEventListener('resize', checkScreenSize);
checkScreenSize();

menuToggle.addEventListener('click', () => {
    const menu = document.querySelector('.navbar-menu');
    menu.style.display = menu.style.display === 'none' ? 'flex' : 'none';
});
*/

/* ==================== Utility: Debounce Function ==================== */

// Debounce function to improve scroll event performance
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Optional: Apply debounce to scroll events for better performance
// window.addEventListener('scroll', debounce(handleScroll, 50));
