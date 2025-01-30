document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyLoad = (target) => {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        io.observe(target);
    };

    lazyImages.forEach(lazyLoad);

    // Add hover effects to buttons and cards
    const buttons = document.querySelectorAll('.button');
    const cards = document.querySelectorAll('.feature-card, .quick-link');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    });

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });

    // Progress Bar
    const progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar');
    document.body.insertBefore(progressBar, document.querySelector('header'));

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = `${scrollPercentage}%`;
    });

    // Toast Notifications
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.classList.add('toast', `toast--${type}`);
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('toast--visible');
        }, 100);

        setTimeout(() => {
            toast.classList.remove('toast--visible');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    // Add focus styles for better accessibility
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]');
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = `2px solid ${getComputedStyle(document.documentElement).getPropertyValue('--color-primary')}`;
            element.style.outlineOffset = '2px';
        });
        element.addEventListener('blur', () => {
            element.style.outline = 'none';
        });
    });

    // Add a subtle fade-in animation for sections on scroll
    const sections = document.querySelectorAll('section');
    const fadeInOnScroll = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionBottom = section.getBoundingClientRect().bottom;
            if (sectionTop < window.innerHeight && sectionBottom > 0) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll(); // Initial check

    // Add a subtle parallax effect to the hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            hero.style.backgroundPositionY = `${scrollY * 0.5}px`;
        });
    }
});