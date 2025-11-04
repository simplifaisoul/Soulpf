// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenuMobile = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenuMobile.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenuMobile.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Simple validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    // Simulate form submission (replace with actual implementation)
    showNotification('Thank you for your message! I will get back to you soon.', 'success');
    contactForm.reset();
    
    // In a real implementation, you would send this data to a server
    console.log('Form submitted:', formData);
    
    // Example of how you might send this data to a server:
    // fetch('/api/contact', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData)
    // })
    // .then(response => response.json())
    // .then(data => {
    //     showNotification('Message sent successfully!', 'success');
    //     contactForm.reset();
    // })
    // .catch(error => {
    //     showNotification('Error sending message. Please try again.', 'error');
    // });
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    `;

    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.background = '#10b981';
            break;
        case 'error':
            notification.style.background = '#ef4444';
            break;
        default:
            notification.style.background = '#3b82f6';
    }

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.service-card, .stat-item, .highlight-item, .contact-method, .company-logo'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Typing effect for hero name
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        const originalText = heroName.textContent;
        typeWriter(heroName, originalText, 80);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add hover effect to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add hover effect to social links
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) rotate(5deg)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotate(0)';
    });
});

// Form input focus effects
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
        this.parentElement.style.transition = 'transform 0.2s ease';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Add loading state to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.type === 'submit') {
            const originalText = this.textContent;
            this.textContent = 'Sending...';
            this.disabled = true;
            
            // Reset after 2 seconds (in real implementation, this would be based on server response)
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 2000);
        }
    });
});

// Smooth reveal animation for sections
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Add reveal class to elements that should animate on scroll
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('reveal');
    });
});

// Initialize reveal on scroll
revealOnScroll();



// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Enhanced Terminal Animation
function animateTerminal() {
    const terminalLines = document.querySelectorAll('.terminal-line');
    if (terminalLines.length === 0) return;
    
    terminalLines.forEach((line, index) => {
        setTimeout(() => {
            if (line) {
                line.style.opacity = '1';
                line.style.transform = 'translateX(0)';
            }
        }, index * 200);
    });
}

// Initialize terminal animation (only if not already initialized)
document.addEventListener('DOMContentLoaded', () => {
    if (!document.body.classList.contains('terminal-initialized')) {
        document.body.classList.add('terminal-initialized');
        setTimeout(() => {
            if (!document.body.classList.contains('fully-loaded')) {
                animateTerminal();
            }
        }, 1000);
    }
});

// Enhanced Form Validation
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!formData.subject || formData.subject.trim().length < 3) {
        errors.push('Subject must be at least 3 characters long');
    }
    
    if (!formData.message || formData.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    return errors;
}

// Enhanced Contact Form
contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    const errors = validateForm(formData);
    
    if (errors.length > 0) {
        showNotification(errors[0], 'error');
        return;
    }

    const submitBtn = contactForm.querySelector('.btn-primary');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        showNotification('Thank you for your message! I will get back to you soon.', 'success');
        contactForm.reset();
        
        // Track form submission (analytics)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submission', {
                'event_category': 'Contact',
                'event_label': 'Contact Form'
            });
        }
        
    } catch (error) {
        showNotification('Error sending message. Please try again.', 'error');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Real-time form validation
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('blur', function() {
        validateField(this);
    });
    
    input.addEventListener('input', function() {
        if (this.parentElement.classList.contains('error')) {
            validateField(this);
        }
    });
});

function validateField(field) {
    const formGroup = field.parentElement;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove existing error and success states
    const existingError = formGroup.querySelector('.error-message');
    const existingSuccess = formGroup.querySelector('.success-message');
    if (existingError) existingError.remove();
    if (existingSuccess) existingSuccess.remove();
    formGroup.classList.remove('error', 'success');

    switch(field.id) {
        case 'name':
            if (value.length === 0) {
                isValid = false;
                errorMessage = 'Name is required';
            } else if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters';
            } else if (!/^[a-zA-Z\s'-]+$/.test(value)) {
                isValid = false;
                errorMessage = 'Name can only contain letters, spaces, hyphens, and apostrophes';
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value.length === 0) {
                isValid = false;
                errorMessage = 'Email is required';
            } else if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
        case 'subject':
            if (value.length === 0) {
                isValid = false;
                errorMessage = 'Subject is required';
            } else if (value.length < 3) {
                isValid = false;
                errorMessage = 'Subject must be at least 3 characters';
            } else if (value.length > 100) {
                isValid = false;
                errorMessage = 'Subject must be less than 100 characters';
            }
            break;
        case 'message':
            if (value.length === 0) {
                isValid = false;
                errorMessage = 'Message is required';
            } else if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters';
            } else if (value.length > 1000) {
                isValid = false;
                errorMessage = 'Message must be less than 1000 characters';
            }
            break;
    }

    if (!isValid) {
        formGroup.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        formGroup.appendChild(errorDiv);
        
        // Announce error to screen readers
        announceToScreenReader(`Validation error: ${errorMessage}`);
    } else if (value.length > 0) {
        formGroup.classList.add('success');
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = 'Looks good!';
        formGroup.appendChild(successDiv);
    }

    return isValid;
}

// Enhanced screen reader announcement function
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        if (announcement.parentNode) {
            document.body.removeChild(announcement);
        }
    }, 1000);
}

// Enhanced Intersection Observer
const enhancedObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const enhancedObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Add staggered animation for grid items
            if (entry.target.classList.contains('expertise-grid') || 
                entry.target.classList.contains('tech-stack-grid')) {
                const items = entry.target.querySelectorAll('.expertise-item, .tech-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate-in');
                    }, index * 100);
                });
            }
            
            enhancedObserver.unobserve(entry.target);
        }
    });
}, enhancedObserverOptions);

// Observe more elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.service-card, .stat-item, .highlight-item, .contact-method, .company-logo, ' +
        '.expertise-grid, .tech-stack-grid, .achievement-card, .timeline-item'
    );
    
    animateElements.forEach(el => {
        enhancedObserver.observe(el);
    });
});

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (element.dataset.suffix) {
            element.textContent = Math.floor(current) + element.dataset.suffix;
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Initialize counters when in view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const target = parseInt(entry.target.dataset.target);
            animateCounter(entry.target, target);
            entry.target.classList.add('animated');
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});

// Enhanced Mobile Navigation
const mobileMenuBtn = document.getElementById('mobile-menu');
const navMenuEnhanced = document.querySelector('.nav-menu');
const navLinksEnhanced = document.querySelectorAll('.nav-link');

if (mobileMenuBtn && navMenuEnhanced) {
    mobileMenuBtn.addEventListener('click', () => {
        const isActive = mobileMenuBtn.classList.toggle('active');
        navMenuEnhanced.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        
        // Announce menu state to screen readers
        announceToScreenReader(isActive ? 'Navigation menu opened' : 'Navigation menu closed');
        
        // Focus management
        if (isActive) {
            const firstNavLink = navMenuEnhanced.querySelector('.nav-link');
            if (firstNavLink) firstNavLink.focus();
        }
    });

    navLinksEnhanced.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navMenuEnhanced.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !navMenuEnhanced.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            navMenuEnhanced.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });

    // Close mobile menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenuBtn.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            navMenuEnhanced.classList.remove('active');
            document.body.classList.remove('no-scroll');
            mobileMenuBtn.focus();
        }
    });
}

// Enhanced Scroll Progress Bar
function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        progressFill.style.width = scrollPercent + '%';
    }
}

window.addEventListener('scroll', updateScrollProgress);

// Theme Toggle (if implemented)
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

// Initialize theme toggle
document.addEventListener('DOMContentLoaded', initThemeToggle);

// Enhanced Performance Monitoring
function logPerformanceMetrics() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                console.log('DOM Interactive:', perfData.domInteractive - perfData.navigationStart, 'ms');
            }, 0);
        });
    }
}

logPerformanceMetrics();

// Advanced Accessibility Features
function initAccessibility() {
    // Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(skipLink.getAttribute('href'));
            if (target) {
                target.focus();
                target.scrollIntoView();
            }
        });
    }

    // Keyboard navigation enhancement
    document.addEventListener('keydown', (e) => {
        // Tab navigation enhancement
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
        
        // Escape key to close mobile menu
        if (e.key === 'Escape') {
            const mobileMenu = document.getElementById('mobile-menu');
            const navMenuAccessibility = document.querySelector('.nav-menu');
            if (mobileMenu && navMenuAccessibility) {
                mobileMenu.classList.remove('active');
                navMenuAccessibility.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        }
    });

    // Remove keyboard navigation class on mouse use
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

    // Focus management for modals and dynamic content
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        lastFocusable.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        firstFocusable.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }

    // Announce dynamic content changes to screen readers
    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    // Enhanced form validation with accessibility
    function enhanceFormAccessibility() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                // Add aria-describedby for error messages
                const errorElement = input.parentElement.querySelector('.form-error');
                if (errorElement) {
                    const errorId = `error-${input.id || Math.random().toString(36).substr(2, 9)}`;
                    errorElement.id = errorId;
                    input.setAttribute('aria-describedby', errorElement);
                    errorElement.setAttribute('role', 'alert');
                }

                // Live validation feedback
                input.addEventListener('input', () => {
                    const isValid = validateField(input);
                    if (!isValid) {
                        input.setAttribute('aria-invalid', 'true');
                        announceToScreenReader(`Validation error in ${input.labels?.[0]?.textContent || 'field'}`);
                    } else {
                        input.setAttribute('aria-invalid', 'false');
                    }
                });
            });
        });
    }

    enhanceFormAccessibility();
}

// Performance Optimization
function optimizePerformance() {
    // Lazy loading for images with intersection observer
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });

    images.forEach(img => imageObserver.observe(img));

    // Lazy loading for sections
    const sections = document.querySelectorAll('section[data-lazy]');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                section.classList.add('loaded');
                sectionObserver.unobserve(section);
                
                // Trigger any lazy-loaded animations
                const lazyElements = section.querySelectorAll('[data-lazy-animation]');
                lazyElements.forEach(el => {
                    el.classList.add('animate-in');
                });
            }
        });
    }, {
        rootMargin: '100px 0px',
        threshold: 0.1
    });

    sections.forEach(section => sectionObserver.observe(section));

    // Advanced debounce function
    function debounce(func, wait, immediate = false) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    }

    // Throttle function for performance-critical events
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Optimized scroll handlers
    const optimizedScrollHandler = throttle(() => {
        // Scroll-based animations
        updateScrollProgress();
        
        // Parallax effects
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.parallax) || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        // Update active navigation
        updateActiveNavigation();
    }, 16); // ~60fps

    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

    // Preload critical resources with priority
    const criticalResources = [
        {
            url: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
            as: 'style',
            priority: 'high'
        },
        {
            url: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
            as: 'style',
            priority: 'high'
        }
    ];

    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = resource.as;
        link.href = resource.url;
        if (resource.priority === 'high') {
            link.setAttribute('importance', 'high');
        }
        document.head.appendChild(link);
    });

    // Optimize images loading
    document.addEventListener('DOMContentLoaded', () => {
        // Add loading placeholder styles
        const style = document.createElement('style');
        style.textContent = `
            img[data-src] {
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                animation: loading 1.5s infinite;
            }
            img.loaded {
                animation: fadeIn 0.5s ease-in;
            }
            @keyframes loading {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    });
}

// Update active navigation based on scroll
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Enhanced Micro-interactions
function initMicroInteractions() {
    // Smooth reveal animations with stagger
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const staggeredObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 100);
                staggeredObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for staggered animations
    const animateElements = document.querySelectorAll(
        '.service-card, .stat-item, .expertise-item, .contact-method, .company-logo'
    );
    
    animateElements.forEach(el => {
        staggeredObserver.observe(el);
    });

    // Magnetic button effect
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0) scale(1)';
        });
    });

    // Enhanced cursor effects
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursorFollower);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
}

// Custom Cursor System
class CustomCursor {
    constructor() {
        this.cursor = document.getElementById('customCursor');
        this.cursorDot = this.cursor ? this.cursor.querySelector('.cursor-dot') : null;
        this.cursorRing = this.cursor ? this.cursor.querySelector('.cursor-ring') : null;
        this.cursorVisible = false;
        this.cursorScale = 1;
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        this.init();
    }

    init() {
        if (!this.cursor || !this.cursorDot || !this.cursorRing) return;
        
        // Hide default cursor
        document.body.style.cursor = 'none';
        
        // Mouse move handler
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        
        // Mouse enter/leave handlers
        document.addEventListener('mouseenter', () => this.showCursor());
        document.addEventListener('mouseleave', () => this.hideCursor());
        
        // Hover effects for interactive elements
        this.addHoverEffects();
        
        // Click effects
        this.addClickEffects();
        
        // Start animation loop
        this.animate();
    }

    handleMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        
        if (!this.cursorVisible) {
            this.showCursor();
        }
    }

    showCursor() {
        this.cursorVisible = true;
        if (this.cursor) {
            this.cursor.style.opacity = '1';
        }
    }

    hideCursor() {
        this.cursorVisible = false;
        if (this.cursor) {
            this.cursor.style.opacity = '0';
        }
    }

    addHoverEffects() {
        const interactiveElements = document.querySelectorAll(
            'a, button, .btn, .service-card, .expertise-item, .stat-card, .contact-method, .social-link, .nav-link, .nav-cta'
        );

        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
                this.cursorScale = 1.5;
            });

            element.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
                this.cursorScale = 1;
            });
        });

        // Special hover for buttons
        const buttons = document.querySelectorAll('.btn, .nav-cta');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                this.cursorScale = 2;
            });
        });
    }

    addClickEffects() {
        document.addEventListener('mousedown', () => {
            this.cursor.classList.add('click');
            this.cursorScale = 0.8;
        });

        document.addEventListener('mouseup', () => {
            this.cursor.classList.remove('click');
            this.cursorScale = this.cursor.classList.contains('hover') ? 1.5 : 1;
        });
    }

    animate() {
        // Smooth cursor following with easing
        const easing = 0.15;
        this.cursorX += (this.mouseX - this.cursorX) * easing;
        this.cursorY += (this.mouseY - this.cursorY) * easing;

        if (this.cursor) {
            this.cursor.style.transform = `translate(${this.cursorX}px, ${this.cursorY}px) scale(${this.cursorScale})`;
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Performance Optimization - Lazy Loading
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });

    images.forEach(img => imageObserver.observe(img));
}

// Preload Critical Resources
function preloadCriticalResources() {
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    ];

    criticalResources.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = url;
        document.head.appendChild(link);
    });
}

// Optimize Font Loading
function optimizeFontLoading() {
    const fontDisplay = 'swap';
    const style = document.createElement('style');
    style.textContent = `
        @font-face {
            font-family: 'Inter';
            font-display: ${fontDisplay};
        }
        @font-face {
            font-family: 'Space Grotesk';
            font-display: ${fontDisplay};
        }
    `;
    document.head.appendChild(style);
}

// Debounce function for performance
function debounce(func, wait, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Initialize all enhancements (legacy support)
document.addEventListener('DOMContentLoaded', () => {
    // Prevent duplicate initialization
    if (document.body.classList.contains('legacy-initialized')) {
        return;
    }
    document.body.classList.add('legacy-initialized');
    
    // Performance optimizations first
    try {
        preloadCriticalResources();
        optimizeFontLoading();
        initLazyLoading();
    } catch (error) {
        console.warn('Performance optimizations failed:', error);
    }
    
    // Then initialize other features
    try {
        initAccessibility();
        optimizePerformance();
        initMicroInteractions();
    } catch (error) {
        console.warn('Feature initialization failed:', error);
    }
    
    // Initialize custom cursor
    try {
        new CustomCursor();
    } catch (error) {
        console.warn('Custom cursor failed to initialize:', error);
    }
    
    // Add loading animation classes
    document.body.classList.add('aaa-enhanced');
    
    // Mark page as loaded for analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_load_complete', {
            'event_category': 'Performance',
            'custom_map': {'custom_parameter_1': 'page_load_time'}
        });
    }
});

// Enhanced Console Welcome Message
console.log('%c🚀 Welcome to Souleimen Mrad\'s Portfolio!', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with passion and modern web technologies', 'color: #10b981; font-size: 14px;');
console.log('%cInterested in collaboration? Reach out at soulsimplifai@gmail.com', 'color: #8b5cf6; font-size: 14px;');
console.log('%c🎨 Enhanced with AAA quality, accessibility, and performance optimizations', 'color: #f59e0b; font-size: 12px;');
console.log('%c♿ WCAG 2.1 AA Compliant | 🚀 Performance Optimized | ✨ Premium UX', 'color: #a855f7; font-size: 11px;');

// ===== PARTICLE SYSTEM =====
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }

    init() {
        if (!this.canvas || !this.ctx) return;
        
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2,
                hue: Math.random() * 60 + 240 // Purple to pink range
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Mouse interaction
            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.x -= (dx / distance) * force * 2;
                particle.y -= (dy / distance) * force * 2;
            }
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`;
            this.ctx.fill();
            
            // Draw connections
            this.particles.slice(index + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = `hsla(${particle.hue}, 70%, 60%, ${0.2 * (1 - distance / 120)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Loading Screen System
class LoadingScreen {
    constructor() {
        this.loadingScreen = document.getElementById('loadingScreen');
        this.progressBar = this.loadingScreen ? this.loadingScreen.querySelector('.progress-bar') : null;
        this.percentageText = this.loadingScreen ? this.loadingScreen.querySelector('.loading-percentage') : null;
        this.progress = 0;
        this.isLoading = false;
        this.init();
    }

    init() {
        if (!this.loadingScreen) return;
        
        // Prevent multiple instances
        if (window.loadingScreenInstance) {
            return;
        }
        window.loadingScreenInstance = this;
        
        this.simulateLoading();
    }

    simulateLoading() {
        if (this.isLoading) return;
        this.isLoading = true;
        
        let progressSteps = [10, 25, 40, 60, 75, 85, 95, 100];
        let currentStep = 0;
        
        const interval = setInterval(() => {
            if (currentStep < progressSteps.length) {
                this.progress = progressSteps[currentStep];
                this.updateProgress(this.progress);
                currentStep++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    this.hideLoadingScreen();
                }, 300);
            }
        }, 150);
    }

    updateProgress(progress) {
        if (this.progressBar) {
            this.progressBar.style.width = `${progress}%`;
        }
        if (this.percentageText) {
            this.percentageText.textContent = `${Math.floor(progress)}%`;
        }
    }

    hideLoadingScreen() {
        if (this.loadingScreen) {
            this.loadingScreen.classList.add('fade-out');
            
            setTimeout(() => {
                if (this.loadingScreen) {
                    this.loadingScreen.style.display = 'none';
                }
                // Initialize other components after loading
                this.initializeAfterLoad();
            }, 500);
        }
    }

    initializeAfterLoad() {
        // Trigger animations and other initializations
        document.body.classList.add('fully-loaded');
        
        // Initialize terminal animation
        if (typeof animateTerminal === 'function') {
            setTimeout(animateTerminal, 500);
        }
    }
}

// Enhanced Micro-interactions System
class MicroInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.initMagneticEffects();
        this.initRippleEffects();
        this.initParallaxEffects();
        this.initScrollReveal();
        this.initHoverEffects();
        this.initTypewriterEffects();
        this.initCounterAnimations();
        this.initProgressBars();
        this.initFloatingElements();
        this.initGlitchEffects();
    }

    // Magnetic cursor effect for interactive elements
    initMagneticEffects() {
        const magneticElements = document.querySelectorAll('.btn, .service-card, .expertise-item, .nav-cta');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const moveX = x * 0.15;
                const moveY = y * 0.15;
                
                element.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0) scale(1)';
            });
        });
    }

    // Ripple effect for buttons
    initRippleEffects() {
        const rippleButtons = document.querySelectorAll('.btn, .nav-cta');
        
        rippleButtons.forEach(button => {
            button.classList.add('ripple');
            
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    left: ${x}px;
                    top: ${y}px;
                    transform: scale(0);
                    animation: rippleEffect 0.6s ease-out;
                    pointer-events: none;
                `;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rippleEffect {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Enhanced parallax effects
    initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        const handleParallax = throttle(() => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.parallax) || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }, 16);

        window.addEventListener('scroll', handleParallax, { passive: true });
    }

    // Advanced scroll reveal with stagger
    initScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal, .service-card, .expertise-item, .stat-card');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                        
                        // Add stagger effect for grids
                        if (entry.target.parentElement.classList.contains('services-grid') ||
                            entry.target.parentElement.classList.contains('expertise-grid')) {
                            const siblings = entry.target.parentElement.children;
                            Array.from(siblings).forEach((sibling, siblingIndex) => {
                                setTimeout(() => {
                                    sibling.classList.add('animate-in');
                                }, siblingIndex * 100);
                            });
                        }
                    }, index * 50);
                    
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

    // Enhanced hover effects
    initHoverEffects() {
        // Card tilt effect
        const cards = document.querySelectorAll('.service-card, .expertise-item');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });

        // Text gradient animation on hover
        const gradientTexts = document.querySelectorAll('.hero-name, .section-title');
        
        gradientTexts.forEach(text => {
            text.addEventListener('mouseenter', () => {
                text.classList.add('gradient-text');
            });
            
            text.addEventListener('mouseleave', () => {
                setTimeout(() => {
                    text.classList.remove('gradient-text');
                }, 2000);
            });
        });
    }

    // Typewriter effect for text elements
    initTypewriterEffects() {
        const typewriterElements = document.querySelectorAll('[data-typewriter]');
        
        typewriterElements.forEach(element => {
            const text = element.textContent;
            const speed = parseInt(element.dataset.speed) || 50;
            
            element.textContent = '';
            element.classList.add('typewriter-cursor');
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, speed);
                } else {
                    element.classList.remove('typewriter-cursor');
                }
            };
            
            // Start typing when element is in view
            const typeObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        typeWriter();
                        typeObserver.unobserve(entry.target);
                    }
                });
            });
            
            typeObserver.observe(element);
        });
    }

    // Animated counters for statistics
    initCounterAnimations() {
        const counters = document.querySelectorAll('[data-counter]');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const target = parseInt(entry.target.dataset.counter);
                    const duration = parseInt(entry.target.dataset.duration) || 2000;
                    const suffix = entry.target.dataset.suffix || '';
                    
                    this.animateCounter(entry.target, target, duration, suffix);
                    entry.target.classList.add('counted');
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    animateCounter(element, target, duration, suffix) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            element.textContent = Math.floor(current).toLocaleString() + suffix;
        }, 16);
    }

    // Animated progress bars
    initProgressBars() {
        const progressBars = document.querySelectorAll('[data-progress]');
        
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    const progress = parseInt(entry.target.dataset.progress);
                    const bar = entry.target.querySelector('.progress-fill');
                    
                    if (bar) {
                        setTimeout(() => {
                            bar.style.width = `${progress}%`;
                        }, 200);
                    }
                    
                    entry.target.classList.add('animated');
                    progressObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        progressBars.forEach(bar => {
            progressObserver.observe(bar);
        });
    }

    // Floating animation for decorative elements
    initFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating');
        
        floatingElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.5}s`;
            element.style.animationDuration = `${3 + (index % 2)}s`;
        });
    }

    // Glitch effect for terminal and tech elements
    initGlitchEffects() {
        const glitchElements = document.querySelectorAll('.terminal, .tech-item');
        
        glitchElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.classList.add('glitch-enhanced');
                element.dataset.text = element.textContent;
                
                setTimeout(() => {
                    element.classList.remove('glitch-enhanced');
                }, 2000);
            });
        });
    }
}

// Performance monitoring and optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.initImageOptimization();
        this.initResourceHints();
        this.initCriticalCSS();
        this.initLazyLoading();
    }

    // Optimize image loading
    initImageOptimization() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('fade-in');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Add resource hints for better performance
    initResourceHints() {
        const hints = [
            { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
            { rel: 'dns-prefetch', href: '//cdnjs.cloudflare.com' },
            { rel: 'preconnect', href: 'https://fonts.googleapis.com', crossorigin: true },
            { rel: 'preconnect', href: 'https://cdnjs.cloudflare.com', crossorigin: true }
        ];

        hints.forEach(hint => {
            const link = document.createElement('link');
            link.rel = hint.rel;
            link.href = hint.href;
            if (hint.crossorigin) link.crossOrigin = hint.crossorigin;
            document.head.appendChild(link);
        });
    }

    // Critical CSS optimization
    initCriticalCSS() {
        // Add loading styles
        const style = document.createElement('style');
        style.textContent = `
            .fade-in {
                animation: fadeIn 0.5s ease-in;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            .loading-shimmer {
                background: linear-gradient(90deg, 
                    rgba(168, 85, 247, 0.1) 0%, 
                    rgba(168, 85, 247, 0.3) 50%, 
                    rgba(168, 85, 247, 0.1) 100%);
                background-size: 200% 100%;
                animation: shimmer 2s ease-in-out infinite;
            }
        `;
        document.head.appendChild(style);
    }

    // Enhanced lazy loading
    initLazyLoading() {
        const lazySections = document.querySelectorAll('section[data-lazy]');
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const section = entry.target;
                    section.classList.add('loaded');
                    
                    // Trigger animations for lazy-loaded content
                    const lazyElements = section.querySelectorAll('[data-lazy-animation]');
                    lazyElements.forEach((el, index) => {
                        setTimeout(() => {
                            el.classList.add('animate-in');
                        }, index * 100);
                    });
                    
                    sectionObserver.unobserve(section);
                }
            });
        }, {
            rootMargin: '100px 0px',
            threshold: 0.1
        });

        lazySections.forEach(section => sectionObserver.observe(section));
    }
}

// Initialize all enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Prevent multiple initializations
    if (document.body.classList.contains('initialized')) {
        return;
    }
    document.body.classList.add('initialized');
    
    // Performance optimizations first
    try {
        new PerformanceOptimizer();
    } catch (error) {
        console.warn('Performance optimizer failed to initialize:', error);
    }
    
    // Initialize micro-interactions
    try {
        new MicroInteractions();
    } catch (error) {
        console.warn('Micro-interactions failed to initialize:', error);
    }
    
    // Initialize loading screen first
    try {
        new LoadingScreen();
    } catch (error) {
        console.warn('Loading screen failed to initialize:', error);
        // Fallback: hide loading screen manually
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
    }
    
    // Initialize other systems after a small delay
    setTimeout(() => {
        try {
            new ParticleSystem();
        } catch (error) {
            console.warn('Particle system failed to initialize:', error);
        }
        
        try {
            new CustomCursor();
        } catch (error) {
            console.warn('Custom cursor failed to initialize:', error);
        }
    }, 100);
    
    // Add enhanced classes
    document.body.classList.add('aaa-enhanced');
    
    // Console welcome with enhanced styling
    console.log('%c🚀 Welcome to Souleimen Mrad\'s Enhanced Portfolio!', 'color: #a855f7; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
    console.log('%c✨ Enhanced with premium animations & micro-interactions', 'color: #ec4899; font-size: 16px; font-weight: 600;');
    console.log('%c🎯 Performance Optimized | ♿ Accessible | 📱 Responsive', 'color: #10b981; font-size: 14px;');
    console.log('%c🔧 Built with modern web technologies and best practices', 'color: #8b5cf6; font-size: 12px;');
});