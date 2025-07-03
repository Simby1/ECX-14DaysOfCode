document.addEventListener('DOMContentLoaded', function() {
    // --- Typing Effect  ---
    const animatedTextElement = document.getElementById('animatedHeaderText');
    const phrases = ["Grinding", "Growing", "Coding"]; 
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; 
    let deletingSpeed = 50; 
    let pauseAfterType = 1500; 
    let pauseAfterDelete = 500; 

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            animatedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            animatedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let currentTypingSpeed = typingSpeed;

        if (isDeleting) {
            currentTypingSpeed = deletingSpeed;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            currentTypingSpeed = pauseAfterType;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            currentTypingSpeed = pauseAfterDelete;
        }

        setTimeout(typeEffect, currentTypingSpeed);
    }

    typeEffect(); 

    // --- Navbar for mobile ---
    const navToggle = document.createElement('div'); 
    navToggle.classList.add('nav-toggle');
    navToggle.innerHTML = `
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
    `;
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('nav ul'); 

    nav.insertBefore(navToggle, navLinks); 

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active'); 
        navToggle.classList.toggle('active'); 
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
});