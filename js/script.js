// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Dynamic copyright year
    var yearSpans = document.querySelectorAll('.copyright-year');
    var currentYear = new Date().getFullYear();
    yearSpans.forEach(function(span) {
        span.textContent = currentYear;
    });

    // Set default language based on browser settings or default to Japanese
    setLanguage(getBrowserLanguage());

    // Add event listeners to language buttons
    var langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var lang = this.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    // Mobile menu toggle
    var menuToggle = document.querySelector('.mobile-menu-toggle');
    var nav = document.querySelector('nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            var isActive = nav.classList.toggle('active');

            // Update ARIA attribute
            menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');

            // Toggle menu icon between bars and times (X)
            var icon = this.querySelector('i');
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
            var isClickInsideNav = nav.contains(event.target);
            var isClickOnToggle = menuToggle.contains(event.target);

            if (!isClickInsideNav && !isClickOnToggle && nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                var icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking on nav links
        var navLinks = nav.querySelectorAll('a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                var icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Handle contact form submission (Formspree with JS fallback)
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            var formData = new FormData(contactForm);
            var currentLang = document.body.getAttribute('data-lang');

            // Attempt to submit via Formspree
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(function(response) {
                var message = '';
                if (response.ok) {
                    if (currentLang === 'ja') {
                        message = 'お問い合わせありがとうございます。担当者が確認次第、ご連絡いたします。';
                    } else if (currentLang === 'en') {
                        message = 'Thank you for your inquiry. We will contact you as soon as possible.';
                    } else if (currentLang === 'zh') {
                        message = '感謝您的詢問。我們會盡快與您聯繫。';
                    }
                    alert(message);
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            }).catch(function() {
                // Fallback: show confirmation and suggest email
                var message = '';
                if (currentLang === 'ja') {
                    message = '送信に失敗しました。お手数ですが info@makoto.ltd まで直接ご連絡ください。';
                } else if (currentLang === 'en') {
                    message = 'Submission failed. Please contact us directly at info@makoto.ltd.';
                } else if (currentLang === 'zh') {
                    message = '提交失敗。請直接聯繫 info@makoto.ltd。';
                }
                alert(message);
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var targetElement = document.querySelector(targetId);

            if (targetElement) {
                var headerOffset = window.innerWidth <= 768 ? 60 : 80;
                var elementPosition = targetElement.getBoundingClientRect().top;
                var offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add throttled scroll event listener for header transparency
    var header = document.querySelector('header');
    var ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                if (window.scrollY > 100) {
                    header.style.backgroundColor = 'rgba(0, 51, 102, 0.95)';
                } else {
                    header.style.backgroundColor = 'var(--primary-color)';
                }
                ticking = false;
            });
            ticking = true;
        }
    });
});

// Language mapping for html lang attribute
var langMap = {
    'ja': 'ja',
    'en': 'en',
    'zh': 'zh-Hant'
};

// Function to set the language
function setLanguage(lang) {
    document.body.setAttribute('data-lang', lang);

    // Update html lang attribute for accessibility and SEO
    document.documentElement.setAttribute('lang', langMap[lang] || lang);

    // Update active state and aria-pressed of language buttons
    var langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(function(button) {
        var isActive = button.getAttribute('data-lang') === lang;
        if (isActive) {
            button.classList.add('active');
            button.setAttribute('aria-pressed', 'true');
        } else {
            button.classList.remove('active');
            button.setAttribute('aria-pressed', 'false');
        }
    });

    // Store the selected language in localStorage for persistence
    try {
        localStorage.setItem('preferredLanguage', lang);
    } catch (e) {
        // localStorage may be unavailable in private browsing mode
    }
}

// Function to get the browser language or stored preference
function getBrowserLanguage() {
    // Check if there's a stored preference
    try {
        var storedLang = localStorage.getItem('preferredLanguage');
        if (storedLang) {
            return storedLang;
        }
    } catch (e) {
        // localStorage may be unavailable in private browsing mode
    }

    // Get browser language
    var browserLang = navigator.language || '';

    // Simplify to just the first two characters (e.g., "en-US" -> "en")
    var lang = browserLang.substring(0, 2).toLowerCase();

    // Map browser language to our supported languages
    if (lang === 'ja') return 'ja';
    if (lang === 'zh') return 'zh';
    if (lang === 'en') return 'en';

    // Default to Japanese if not supported
    return 'ja';
}
