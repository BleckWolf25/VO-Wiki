document.addEventListener('DOMContentLoaded', function () {
    // Advanced Smooth Scrolling with Easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        });
    });

    // Enhanced Lazy Loading with Placeholder Effect
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyLoadOptions = {
        rootMargin: '50px 0px',
        threshold: 0.01
    };

    const lazyLoad = (target) => {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Add a subtle blur-to-clear transition
                    img.style.filter = 'blur(10px)';
                    img.style.transition = 'filter 0.3s ease-in-out';
                    
                    img.src = img.dataset.src;
                    img.onload = () => {
                        img.removeAttribute('data-src');
                        img.style.filter = 'blur(0)';
                    };
                    
                    observer.unobserve(img);
                }
            });
        }, lazyLoadOptions);

        imageObserver.observe(target);
    };

    lazyImages.forEach(lazyLoad);

    // Advanced Interactive Hover Effects with Performance Optimization
    const interactiveElements = document.querySelectorAll('.interactive-element');
    const throttle = (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    };

    interactiveElements.forEach(element => {
        const hoverHandler = throttle((e) => {
            element.style.transform = 'scale(1.02)';
            element.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
        }, 50);

        const leaveHandler = throttle((e) => {
            element.style.transform = 'scale(1)';
            element.style.boxShadow = 'none';
        }, 50);

        element.addEventListener('mouseenter', hoverHandler);
        element.addEventListener('mouseleave', leaveHandler);
    });

    // Advanced Scroll-Triggered Animations
    const animateOnScroll = () => {
        const revealElements = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const revealPoint = 150;

            if (elementTop < windowHeight - revealPoint && elementBottom >= 0) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        });
    };

    window.addEventListener('scroll', throttle(animateOnScroll, 50));
    animateOnScroll(); // Initial check

    // Enhanced Toast Notification System
    class NotificationManager {
        static show(message, type = 'info', duration = 3000) {
            const toast = document.createElement('div');
            toast.classList.add('toast', `toast--${type}`, 'toast--animated');
            toast.innerHTML = `
                <div class="toast__icon"></div>
                <div class="toast__content">${message}</div>
                <div class="toast__progress"></div>
            `;

            document.body.appendChild(toast);
            
            // Trigger reflow for animation
            toast.offsetHeight;
            
            toast.classList.add('toast--visible');

            const progressBar = toast.querySelector('.toast__progress');
            progressBar.style.animationDuration = `${duration}ms`;

            setTimeout(() => {
                toast.classList.remove('toast--visible');
                setTimeout(() => toast.remove(), 300);
            }, duration);
        }
    }

    // Example usage
    window.NotificationManager = NotificationManager;

    // Advanced Version Comparison Tooltip
    const addVersionTooltips = () => {
        const versionElements = document.querySelectorAll('.mod-version');
        
        versionElements.forEach(element => {
            const version = element.getAttribute('data-version');
            const compatibilityInfo = element.getAttribute('data-compatibility');

            element.addEventListener('mouseenter', (e) => {
                const tooltip = document.createElement('div');
                tooltip.classList.add('version-tooltip');
                tooltip.innerHTML = `
                    <strong>Version:</strong> ${version}<br>
                    <strong>Compatibility:</strong> ${compatibilityInfo}
                `;
                
                document.body.appendChild(tooltip);
                
                const rect = element.getBoundingClientRect();
                tooltip.style.top = `${rect.bottom + window.scrollY + 10}px`;
                tooltip.style.left = `${rect.left + window.scrollX}px`;
            });

            element.addEventListener('mouseleave', () => {
                const existingTooltip = document.querySelector('.version-tooltip');
                if (existingTooltip) {
                    existingTooltip.remove();
                }
            });
        });
    };

    addVersionTooltips();

    // Performance Monitoring and Error Tracking
    window.addEventListener('error', (event) => {
        NotificationManager.show(`Error: ${event.message}`, 'error');
        // You could send this to a tracking service in a real implementation
        console.error('Unhandled error:', event);
    });
});