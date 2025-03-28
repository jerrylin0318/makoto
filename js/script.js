// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set default language based on browser settings or default to Japanese
    setLanguage(getBrowserLanguage() || 'ja');
    
    // Add event listeners to language buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent the click from bubbling up
            nav.classList.toggle('active');
            // Toggle menu icon between bars and times (X)
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = nav.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking on nav links
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
    
    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real application, you would send the form data to a server
            // For this demo, we'll just show a success message
            const formData = new FormData(contactForm);
            let message = '';
            
            const currentLang = document.body.getAttribute('data-lang');
            if (currentLang === 'ja') {
                message = 'お問い合わせありがとうございます。担当者が確認次第、ご連絡いたします。';
            } else if (currentLang === 'en') {
                message = 'Thank you for your inquiry. We will contact you as soon as possible.';
            } else if (currentLang === 'zh') {
                message = '感謝您的詢問。我們會盡快與您聯繫。';
            }
            
            alert(message);
            contactForm.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = window.innerWidth <= 768 ? 60 : 80; // Smaller offset for mobile
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll event listener for header transparency
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(0, 51, 102, 0.95)';
        } else {
            header.style.backgroundColor = 'var(--primary-color)';
        }
    });
});

// Function to set the language
function setLanguage(lang) {
    document.body.setAttribute('data-lang', lang);
    
    // Update active state of language buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        if (button.getAttribute('data-lang') === lang) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
    
    // Store the selected language in localStorage for persistence
    localStorage.setItem('preferredLanguage', lang);
}

// Function to get the browser language or stored preference
function getBrowserLanguage() {
    // Check if there's a stored preference
    const storedLang = localStorage.getItem('preferredLanguage');
    if (storedLang) {
        return storedLang;
    }
    
    // Get browser language
    const browserLang = navigator.language || navigator.userLanguage;
    
    // Simplify to just the first two characters (e.g., "en-US" -> "en")
    const lang = browserLang.substring(0, 2).toLowerCase();
    
    // Map browser language to our supported languages
    if (lang === 'ja') return 'ja';
    if (lang === 'zh') return 'zh';
    if (lang === 'en') return 'en';
    
    // Default to Japanese if not supported
    return 'ja';
} 