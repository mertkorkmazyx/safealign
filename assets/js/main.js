// ===== MAIN.JS - SAFEALIGN WEBSITE =====

// ===== GLOBAL VARIABLES =====
let isLoading = true;
let scrollPosition = 0;
let ticking = false;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// ===== INITIALIZE WEBSITE =====
function initializeWebsite() {
    // Initialize components directly without loading screen
    initializeComponents();
}

// ===== INITIALIZE ALL COMPONENTS =====
function initializeComponents() {
    initializeNavigation();
    initializeLanguageSwitcher();
    initializeScrollEffects();
    initializeAnimations();
    initializeCounters();
    initializeContactForm();
    initializeSmoothScrolling();
    initializeParallax();
    initializeLazyLoading();
    initializePerformanceOptimizations();
}

// ===== NAVIGATION =====
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.scrollY > 50;
                navbar.classList.toggle('scrolled', scrolled);
                ticking = false;
            });
            ticking = true;
        }
    });

    // Active navigation highlight
    updateActiveNavigation();
    window.addEventListener('scroll', updateActiveNavigation);
}

function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    const scrollElements = document.querySelectorAll('[data-aos], .service-card, .project-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                entry.target.style.opacity = '1';
                entry.target.style.visibility = 'visible';
            }
        });
    }, observerOptions);
    
    scrollElements.forEach(el => {
        // Set initial state
        if (!el.classList.contains('service-card')) {
            el.style.opacity = '0';
            el.style.visibility = 'hidden';
        }
        observer.observe(el);
    });
    
    // Fallback for older scroll effect
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= 
            (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('aos-animate');
        element.style.opacity = '1';
        element.style.visibility = 'visible';
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(handleScrollAnimation);
            ticking = true;
        }
    });

    // Initial check
    handleScrollAnimation();
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Floating elements animation
    animateFloatingElements();
    
    // Stats counter animation
    initializeCounters();
    
    // Scroll indicator
    initializeScrollIndicator();
    
    // Service cards hover effect
    initializeServiceCards();
    
    // Project cards animation
    initializeProjectCards();
}

function animateFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-ship, .floating-compass, .floating-anchor');
    
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
        element.classList.add('animate-wave-float');
    });
}

function initializeScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.querySelector('#services').scrollIntoView({
                behavior: 'smooth'
            });
        });
        
        // Hide scroll indicator after scrolling
        window.addEventListener('scroll', () => {
            const heroHeight = document.querySelector('.hero').offsetHeight;
            if (window.scrollY > heroHeight * 0.5) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }
}

function initializeServiceCards() {
    // Wait for DOM to be fully loaded
    const waitForCards = () => {
        const serviceCards = document.querySelectorAll('.service-card');
        
        if (serviceCards.length === 0) {
            // If cards not found, try again after a short delay
            setTimeout(waitForCards, 100);
            return;
        }
        
        console.log(`Found ${serviceCards.length} service cards`);
        
        serviceCards.forEach((card, index) => {
            // Add initial visibility
            card.style.opacity = '1';
            card.style.visibility = 'visible';
            
            // Add hover effects
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) rotateX(5deg)';
                card.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateX(0deg)';
                card.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            });
            
            // Add stagger animation delay
            card.style.animationDelay = `${index * 0.1}s`;
        });
    };
    
    waitForCards();
}

function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const overlay = card.querySelector('.project-overlay');
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
    });
}

// ===== COUNTERS =====
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    const speed = 200; // Animation speed

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const count = parseInt(counter.innerText);
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounter(counter), 1);
        } else {
            counter.innerText = target;
        }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                counter.innerText = '0';
                animateCounter(counter);
                observer.unobserve(counter);
            }
        });
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// ===== CONTACT FORM =====
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
        
        // Add form validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', validateInput);
            input.addEventListener('input', clearValidationError);
        });
    }
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Validate form
    if (!validateForm(form)) {
        showFormMessage('Lütfen gerekli alanları doldurun.', 'error');
        return;
    }
    
    // Disable submit button
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';
    
    // Simulate form submission (replace with actual endpoint)
    setTimeout(() => {
        // Reset form
        form.reset();
        
        // Show success message
        showFormMessage('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.', 'success');
        
        // Reset submit button
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Mesaj Gönder';
    }, 2000);
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'Bu alan gereklidir.');
            isValid = false;
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
            showFieldError(field, 'Geçerli bir e-posta adresi girin.');
            isValid = false;
        }
    });
    
    return isValid;
}

function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    
    if (input.hasAttribute('required') && !value) {
        showFieldError(input, 'Bu alan gereklidir.');
    } else if (input.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(input, 'Geçerli bir e-posta adresi girin.');
    } else {
        clearFieldError(input);
    }
}

function clearValidationError(e) {
    clearFieldError(e.target);
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    field.style.borderColor = '#e53e3e';
    
    const errorElement = document.createElement('span');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = '#e53e3e';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    errorElement.style.display = 'block';
    
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(field) {
    field.style.borderColor = '#E2E8F0';
    
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    // Style the message
    messageElement.style.padding = '1rem';
    messageElement.style.borderRadius = '0.5rem';
    messageElement.style.marginTop = '1rem';
    messageElement.style.fontSize = '0.875rem';
    messageElement.style.fontWeight = '500';
    
    if (type === 'success') {
        messageElement.style.backgroundColor = '#f0fff4';
        messageElement.style.color = '#22543d';
        messageElement.style.border = '1px solid #9ae6b4';
    } else if (type === 'error') {
        messageElement.style.backgroundColor = '#fed7d7';
        messageElement.style.color = '#c53030';
        messageElement.style.border = '1px solid #feb2b2';
    }
    
    // Add to form
    const contactForm = document.getElementById('contactForm');
    contactForm.appendChild(messageElement);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageElement.style.opacity = '0';
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 300);
    }, 5000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== PARALLAX EFFECTS =====
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('.hero-background');
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                
                parallaxElements.forEach(element => {
                    element.style.transform = `translateY(${rate}px)`;
                });
                
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ===== LAZY LOADING =====
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function initializePerformanceOptimizations() {
    // Add will-change property for animations
    const animatedElements = document.querySelectorAll('.floating-ship, .floating-compass, .floating-anchor, .service-card, .project-card');
    animatedElements.forEach(element => {
        element.style.willChange = 'transform';
    });
    
    // Remove will-change after animations complete
    setTimeout(() => {
        animatedElements.forEach(element => {
            element.style.willChange = 'auto';
        });
    }, 5000);
    
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Scroll ended
            document.body.classList.remove('scrolling');
        }, 100);
        
        document.body.classList.add('scrolling');
    });
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== RESPONSIVE UTILITIES =====
function isMobile() {
    return window.innerWidth <= 768;
}

function isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
}

function isDesktop() {
    return window.innerWidth > 1024;
}

// ===== ACCESSIBILITY =====
function initializeAccessibility() {
    // Focus management for keyboard navigation
    const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    // Add focus styles
    focusableElements.forEach(element => {
        element.addEventListener('focus', (e) => {
            e.target.style.outline = '2px solid #2E86AB';
            e.target.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', (e) => {
            e.target.style.outline = 'none';
        });
    });
    
    // Keyboard navigation for mobile menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('nav-toggle');
            
            if (navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
                navToggle.focus();
            }
        }
    });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // You can add error reporting here
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
    // You can add error reporting here
});

// ===== BROWSER SUPPORT =====
function checkBrowserSupport() {
    const features = {
        intersectionObserver: 'IntersectionObserver' in window,
        customProperties: CSS.supports('color', 'var(--fake-var)'),
        flexbox: CSS.supports('display', 'flex'),
        grid: CSS.supports('display', 'grid')
    };
    
    // Add fallbacks for unsupported features
    if (!features.intersectionObserver) {
        // Fallback for scroll animations
        console.warn('IntersectionObserver not supported. Using fallback scroll detection.');
    }
    
    return features;
}

// ===== INITIALIZATION =====
// Initialize accessibility and browser support checks
document.addEventListener('DOMContentLoaded', () => {
    initializeAccessibility();
    checkBrowserSupport();
});

// ===== SEO & ANALYTICS HELPERS =====
function trackEvent(eventName, eventData = {}) {
    // Google Analytics 4 event tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Console log for development
    console.log('Event tracked:', eventName, eventData);
}

// Track button clicks
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn, .nav-link, .contact-link')) {
        const element = e.target;
        const eventData = {
            element_type: element.className,
            element_text: element.textContent.trim(),
            page_location: window.location.href
        };
        
        trackEvent('button_click', eventData);
    }
});

// Track form submissions
document.addEventListener('submit', (e) => {
    if (e.target.matches('#contactForm')) {
        trackEvent('form_submit', {
            form_name: 'contact_form',
            page_location: window.location.href
        });
    }
});

// ===== LANGUAGE SWITCHER =====
function initializeLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const currentLang = localStorage.getItem('safealign-language') || 'en';
    
    // Set initial language
    setLanguage(currentLang);
    
    // Add click listeners
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
            localStorage.setItem('safealign-language', lang);
        });
    });
}

function setLanguage(lang) {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    // Update active button
    langButtons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    
    // Update document language
    document.documentElement.lang = lang;
    
    // Update content
    updateContent(lang);
    
    // Update navigation links
    updateNavigation(lang);
}

function updateContent(lang) {
    const translations = {
        en: {
            // Navigation
            home: "Home",
            services: "Our Capabilities", 
            about: "About Us",
            projects: "Events",
            location: "Contact",
            
            // Hero
            heroTitle: "Safety at Every Step, Excellence in Every Project!",
            heroSubtitle: "Professional marine engineering solutions with precision laser alignment technology",
            heroButton: "Our Services",
            heroContact: "Contact Us",
            
            // Services
            servicesTag: "Our Capabilities",
            servicesTitle: "Professional Marine Engineering Services",
            servicesSubtitle: "We provide specialized engineering solutions with advanced technology and expert team.",
            
            service1Title: "Laser Shaft Alignment",
            service1Desc: "Precision alignment of propulsion systems using advanced laser technology for optimal performance.",
            service1Detail: "With advanced laser shaft alignment technology, we perform hot alignment and cold alignment checks with micron-level precision to ensure the reliability of your marine engines.",
            service1Benefits: "Benefits",
            service1Benefit1: "Micron-level precision with laser systems",
            service1Benefit2: "Faster alignment and adjustment compared to traditional methods", 
            service1Benefit3: "Reliable and repeatable results meeting international standards",
            
            service2Title: "Hot And Cold Alignment", 
            service2Desc: "Thermal compensation alignment services for various operating conditions and temperatures.",
            service2Detail: "Proper shaft alignment is essential for the safe and efficient operation of main engines. Misalignment can cause bearing wear, increased vibration, energy loss, and even serious failures. To prevent these risks, Cold Alignment and Hot Alignment measurements are carried out.",
            service2Cold: "Cold Alignment",
            service2Cold1: "Performed when the engine is cold and not in operation",
            service2Cold2: "Ensures that the shaft line is correctly aligned after a new installation, major maintenance, or overhaul",
            service2Cold3: "Provides a secure baseline setup before the engine starts running",
            service2Hot: "Hot Alignment",
            service2Hot1: "Performed when the engine reaches its normal operating temperature",
            service2Hot2: "Considers thermal expansion and bearing clearances to analyze the system under real operating conditions",
            service2Hot3: "Verifies whether the cold alignment remains safe and efficient during operation",            service3Title: "Jacking Test Services", 
            service3Desc: "Comprehensive jacking tests to verify shaft alignment and bearing clearances.",
            service3Detail: "The Jacking Test is a critical procedure for large marine engines and shaft lines, used to verify proper load distribution and alignment of the propeller shaft and bearings. It helps detect any overloading, deflection, or misalignment along the shaft line.",
            service3What: "What is a Jacking Test?",
            service3Point1: "The shaft line is lifted at specific points using hydraulic jacks to measure load distribution",
            service3Point2: "The measured values are compared with manufacturer tolerances and international standards", 
            service3Point3: "Any abnormal bearing loads or misalignment issues can be detected",
            
            service4Title: "Propeller and Rudder Installation",
            service4Desc: "Professional installation and alignment of propellers and rudder systems.",
            service4Detail: "The installation of propellers and rudders is one of the most critical stages in shipbuilding and maintenance. Improper installation can lead to increased vibration, fuel inefficiency, poor maneuverability, and reduced equipment lifetime.",
            service4PropTitle: "Propeller Installation",
            service4Prop1: "Propellers are mounted to the shaft line with micron-level precision",
            service4Prop2: "Laser shaft alignment is applied to verify shaft line accuracy",
            service4Prop3: "Cone surfaces and keying elements are fitted in compliance with manufacturer standards",
            service4Prop4: "Post-installation balance and vibration tests ensure reliable performance",
            service4RudTitle: "Rudder Installation", 
            service4Rud1: "Rudder stock and bearings are aligned and fitted with strict tolerances",
            service4Rud2: "Load distribution and clearance are checked to prevent excessive wear",
            service4Rud3: "Hydraulic systems and steering gear are tested to ensure safe maneuvering",
            
            service5Title: "Sterntube Laser Adjustment",
            service5Desc: "Precise sterntube alignment using laser measurement systems for optimal efficiency.",
            service5Detail: "Sterntube laser adjustment is a critical procedure to ensure the safe, efficient, and long-lasting operation of marine engines and shaft lines. Misalignment of sterntube bearings can result in excessive friction, oil leakages, bearing wear, shaft damage, and reduced fuel efficiency.",
            service5What: "What is Sterntube Laser Adjustment?",
            service5Point1: "Using advanced laser alignment systems, the shaft line is checked against sterntube bearings to verify proper alignment",
            service5Point2: "After installation or maintenance, the shaft is aligned with the bearings to ensure smooth operation", 
            service5Point3: "If deviations are detected, adjustments are made to prevent premature wear and extend bearing life",
            
            service6Title: "Propulsion System Consultancy",
            service6Desc: "Expert consulting services for propulsion system design and optimization.",
            service6Detail: "The propulsion system is one of the most vital components of a vessel. Proper installation of the propeller, shaft line, sterntube, bearings, and rudder is essential for fuel efficiency, safe maneuverability, reduced maintenance costs, and extended machinery lifetime. We provide consultancy services for propulsion system installation, supporting shipbuilding and maintenance projects in compliance with international marine standards.",
            
            // About
            aboutTag: "About Us",
            aboutTitle: "Reliability and Quality in Marine Engineering",
            aboutDesc: "Strong business partners, experienced and talented staff who have worked in the field for many years and service that gives confidence. We specialize in consulting and engineering services for the installation of reliable alignment and conveyor systems, including laser-based geometric measurements.",
            
            feature1Title: "Professional Equipment",
            feature1Desc: "Use of professional equipment for thermal calculations and laser alignment operations",
            
            feature2Title: "Fast Work Turnaround", 
            feature2Desc: "Quick and safe delivery with efficient material planning and elimination of waiting processes",
            
            feature3Title: "Experienced Team",
            feature3Desc: "Expert technical team with years of experience in marine engineering field",
            
            aboutButton: "Contact Us",
            aboutEventsButton: "View Events",
            
            // Projects
            projectsTag: "Our Events",
            projectsTitle: "Successful Projects", 
            projectsSubtitle: "Customer satisfaction and technical excellence are our priority in the projects we implement.",
            
            project1Title: "Cargo Ship Propulsion System Alignment",
            project1Desc: "Main engine and propeller alignment operation on 3000 DWT cargo ship.",
            
            project2Title: "Yacht Rudder System Installation",
            project2Desc: "Rudder system installation and control system calibration on luxury yacht.",
            
            project3Title: "Fishing Vessel Engine Overhaul",
            project3Desc: "Alignment and testing operations after engine overhaul on fishing vessel.",
            
            // Contact
            contactTag: "Contact",
            contactTitle: "Find Us",
            contactSubtitle: "Visit our office in Kocaeli, Turkey for professional marine engineering consultations and to learn more about our services.",
            
            phoneLabel: "Phone",
            emailLabel: "Email", 
            addressLabel: "Address",
            websiteLabel: "Website",
            workingHoursLabel: "Working Hours",
            workingHours: "Monday - Friday: 10:00 AM - 8:00 PM<br>Saturday - Sunday: Closed",
            viewMap: "View on OpenStreetMap",
            
            callNow: "Call Now",
            sendEmail: "Send Email",
            viewMap: "View on Map",
            visitWebsite: "Visit Website",
            
            // Contact Form
            nameLabel: "Full Name *",
            emailFormLabel: "Email *",
            phoneFormLabel: "Phone",
            companyLabel: "Company",
            serviceLabel: "Service Type",
            messageLabel: "Message *",
            sendButton: "Send Message",
            
            selectService: "Select Service",
            laserAlignment: "Laser Alignment",
            propellerAlign: "Propeller Alignment", 
            rudderSystem: "Rudder System",
            thermalCalc: "Thermal Calculations",
            jackTest: "Jack Test",
            geometric: "Geometric Measurement",
            other: "Other",
            
            // Footer
            footerDesc: "Professional engineering services specialized in propulsion system alignment in the maritime sector.",
            quickLinks: "Quick Links",
            servicesFooter: "Services",
            contactFooter: "Contact",
            workingHours: "Monday-Friday: 10AM-8PM",
            copyright: "© 2025 SAFEALIGN. All rights reserved.",
            privacy: "Privacy Policy",
            terms: "Terms of Service"
        },
        tr: {
            // Navigation
            home: "Ana Sayfa",
            services: "Hizmetlerimiz",
            about: "Hakkımızda", 
            projects: "Projeler",
            location: "İletişim",
            
            // Hero
            heroTitle: "Her Adımda Güvenlik, Her Projede Mükemmellik!",
            heroSubtitle: "Hassas lazer hizalama teknolojisi ile profesyonel denizcilik mühendisliği çözümleri",
            heroButton: "Hizmetlerimiz",
            heroContact: "İletişime Geç",
            
            // Services
            servicesTag: "Hizmetlerimiz",
            servicesTitle: "Profesyonel Denizcilik Mühendisliği Hizmetleri",
            servicesSubtitle: "İleri teknoloji ve uzman ekibimizle özelleşmiş mühendislik çözümleri sunuyoruz.",
            
            service1Title: "Lazer Mil Hizalama",
            service1Desc: "Optimal performans için gelişmiş lazer teknolojisi kullanarak tahrik sistemlerinin hassas hizalaması.",
            service1Detail: "Gelişmiş lazer mil hizalama teknolojisi ile deniz motorlarınızın güvenilirliğini sağlamak için mikron seviyesinde hassasiyetle sıcak ve soğuk hizalama kontrolleri gerçekleştiriyoruz.",
            service1Benefits: "Avantajlar",
            service1Benefit1: "Lazer sistemlerle mikron seviyesinde hassasiyet",
            service1Benefit2: "Geleneksel yöntemlere göre daha hızlı hizalama ve ayarlama",
            service1Benefit3: "Uluslararası standartları karşılayan güvenilir ve tekrarlanabilir sonuçlar",
            
            service2Title: "Sıcak ve Soğuk Hizalama", 
            service2Desc: "Çeşitli çalışma koşulları ve sıcaklıklar için termal kompanzasyon hizalama hizmetleri.",
            service2Detail: "Uygun mil hizalaması, ana motorların güvenli ve verimli çalışması için gereklidir. Yanlış hizalama yatak aşınması, artan titreşim, enerji kaybı ve hatta ciddi arızalara neden olabilir. Bu riskleri önlemek için Soğuk Hizalama ve Sıcak Hizalama ölçümleri yapılır.",
            service2Cold: "Soğuk Hizalama",
            service2Cold1: "Motor soğukken ve çalışmadığında gerçekleştirilir",
            service2Cold2: "Yeni kurulum, büyük bakım veya kapsamlı onarım sonrasında mil hattının doğru hizalandığını sağlar",
            service2Cold3: "Motor çalışmaya başlamadan önce güvenli bir başlangıç kurulumu sağlar",
            service2Hot: "Sıcak Hizalama",
            service2Hot1: "Motor normal çalışma sıcaklığına ulaştığında gerçekleştirilir",
            service2Hot2: "Gerçek çalışma koşulları altında sistemi analiz etmek için termal genleşme ve yatak boşluklarını dikkate alır",
            service2Hot3: "Soğuk hizalamanın çalışma sırasında güvenli ve verimli kalıp kalmadığını doğrular",
            
            service3Title: "Kriko Test Hizmetleri",
            service3Desc: "Mil hizalaması ve yatak boşluklarını doğrulamak için kapsamlı kriko testleri.",
            service3Detail: "Kriko Testi, büyük deniz motorları ve mil hatları için kritik bir prosedürdür. Pervane mili ve yatakların uygun yük dağılımını ve hizalamasını doğrulamak için kullanılır. Mil hattı boyunca herhangi bir aşırı yüklenme, sapma veya yanlış hizalamayı tespit etmeye yardımcı olur.",
            service3What: "Kriko Testi Nedir?",
            service3Point1: "Mil hattı, yük dağılımını ölçmek için hidrolik krikolarla belirli noktalarda kaldırılır",
            service3Point2: "Ölçülen değerler üretici toleransları ve uluslararası standartlarla karşılaştırılır",
            service3Point3: "Anormal yatak yükleri veya yanlış hizalama sorunları tespit edilebilir",
            
            service4Title: "Pervane ve Dümen Montajı",
            service4Desc: "Pervane ve dümen sistemlerinin profesyonel montajı ve hizalanması.",
            service4Detail: "Pervane ve dümen montajı, gemi inşası ve bakımında en kritik aşamalardan biridir. Hatalı montaj artan titreşim, yakıt verimsizliği, kötü manevra kabiliyeti ve ekipman ömrünün kısalmasına yol açabilir.",
            service4PropTitle: "Pervane Montajı",
            service4Prop1: "Pervaneler mil hattına mikron seviyesinde hassasiyetle monte edilir",
            service4Prop2: "Mil hattı doğruluğunu doğrulamak için lazer mil hizalaması uygulanır",
            service4Prop3: "Koni yüzeyleri ve chaveta elemanları üretici standartlarına uygun şekilde yerleştirilir",
            service4Prop4: "Montaj sonrası balans ve titreşim testleri güvenilir performans sağlar",
            service4RudTitle: "Dümen Montajı",
            service4Rud1: "Dümen mili ve yatakları sıkı toleranslarla hizalanır ve yerleştirilir",
            service4Rud2: "Aşırı aşınmayı önlemek için yük dağılımı ve boşluk kontrol edilir",
            service4Rud3: "Güvenli manevra için hidrolik sistemler ve dümen dişlisi test edilir",
            
            service5Title: "Kıç Tüp Lazer Ayarı",
            service5Desc: "Optimal verimlilik için lazer ölçüm sistemleri kullanarak hassas kıç tüp hizalaması.",
            service5Detail: "Kıç tüp lazer ayarı, deniz motorları ve mil hatlarının güvenli, verimli ve uzun ömürlü çalışmasını sağlamak için kritik bir prosedürdür. Kıç tüp yataklarının yanlış hizalanması aşırı sürtünme, yağ kaçakları, yatak aşınması, mil hasarı ve yakıt verimliliğinin azalmasına neden olabilir.",
            service5What: "Kıç Tüp Lazer Ayarı Nedir?",
            service5Point1: "Gelişmiş lazer hizalama sistemleri kullanılarak mil hattı, kıç tüp yataklarına karşı uygun hizalamayı doğrulamak için kontrol edilir",
            service5Point2: "Montaj veya bakım sonrasında mil, sorunsuz çalışmayı sağlamak için yataklarla hizalanır",
            service5Point3: "Sapmalar tespit edilirse, erken aşınmayı önlemek ve yatak ömrünü uzatmak için ayarlamalar yapılır",
            
            service6Title: "Tahrik Sistemi Danışmanlığı",
            service6Desc: "Tahrik sistemi tasarımı ve optimizasyonu için uzman danışmanlık hizmetleri.",
            service6Detail: "Tahrik sistemi bir geminin en hayati bileşenlerinden biridir. Pervane, mil hattı, kıç tüp, yataklar ve dümenin uygun kurulumu yakıt verimliliği, güvenli manevra, azaltılmış bakım maliyetleri ve uzatılmış makine ömrü için gereklidir. Uluslararası denizcilik standartlarına uygun olarak gemi inşası ve bakım projelerini destekleyerek tahrik sistemi kurulumu için danışmanlık hizmetleri sunuyoruz.",
            
            // About
            aboutTag: "Hakkımızda",
            aboutTitle: "Denizcilik Mühendisliğinde Güvenilirlik ve Kalite",
            aboutDesc: "Güçlü iş ortakları, alanında uzun yıllar çalışmış deneyimli ve yetenekli personel ve güven veren hizmet. Lazer tabanlı geometrik ölçümler dahil olmak üzere güvenilir hizalama ve konveyör sistemlerinin kurulumu için danışmanlık ve mühendislik hizmetlerinde uzmanlaşmışız.",
            
            feature1Title: "Profesyonel Ekipman",
            feature1Desc: "Termal hesaplamalar ve lazer hizalama işlemleri için profesyonel ekipman kullanımı",
            
            feature2Title: "Hızlı İş Geri Dönüşü",
            feature2Desc: "Verimli malzeme planlaması ve bekleme süreçlerinin elimine edilmesi ile hızlı ve güvenli teslimat",
            
            feature3Title: "Deneyimli Ekip",
            feature3Desc: "Denizcilik mühendisliği alanında yılların deneyimine sahip uzman teknik ekip",
            
            aboutButton: "İletişime Geç",
            aboutEventsButton: "Projeleri Görüntüle",
            
            // Projects  
            projectsTag: "Projelerimiz",
            projectsTitle: "Başarılı Projeler",
            projectsSubtitle: "Gerçekleştirdiğimiz projelerde müşteri memnuniyeti ve teknik mükemmellik önceliğimizdir.",
            
            project1Title: "Kargo Gemisi Tahrik Sistemi Hizalama",
            project1Desc: "3000 DWT kargo gemisinde ana motor ve pervane hizalama işlemi.",
            
            project2Title: "Yat Dümen Sistemi Montajı",
            project2Desc: "Lüks yatta dümen sistemi montajı ve kontrol sistemi kalibrasyonu.",
            
            project3Title: "Balıkçı Teknesi Motor Revizyonu",
            project3Desc: "Balıkçı teknesinde motor revizyonu sonrası hizalama ve test işlemleri.",
            
            // Contact
            contactTag: "İletişim", 
            contactTitle: "Bizi Bulun",
            contactSubtitle: "Profesyonel denizcilik mühendisliği danışmanlığı için Kocaeli, Türkiye'deki ofisimizi ziyaret edin ve hizmetlerimiz hakkında daha fazla bilgi edinin.",
            
            phoneLabel: "Telefon",
            emailLabel: "E-posta",
            addressLabel: "Adres", 
            websiteLabel: "Website",
            workingHoursLabel: "Çalışma Saatleri",
            workingHours: "Pazartesi - Cuma: 10:00 - 20:00<br>Cumartesi - Pazar: Kapalı",
            viewMap: "OpenStreetMap'te Görüntüle",
            
            callNow: "Hemen Ara",
            sendEmail: "E-posta Gönder",
            viewMap: "Haritada Görüntüle",
            visitWebsite: "Siteyi Ziyaret Et",
            
            // Contact Form
            nameLabel: "Ad Soyad *",
            emailFormLabel: "E-posta *",
            phoneFormLabel: "Telefon",
            companyLabel: "Şirket",
            serviceLabel: "Hizmet Türü",
            messageLabel: "Mesaj *",
            sendButton: "Mesaj Gönder",
            
            selectService: "Seçiniz",
            laserAlignment: "Lazer Hizalama",
            propellerAlign: "Pervane Hizalama",
            rudderSystem: "Dümen Sistemi", 
            thermalCalc: "Termal Hesaplamalar",
            jackTest: "Kriko Test",
            geometric: "Geometrik Ölçüm",
            other: "Diğer",
            
            // Footer
            footerDesc: "Denizcilik sektöründe tahrik sistemleri hizalama konusunda uzmanlaşmış profesyonel mühendislik hizmetleri.",
            quickLinks: "Hızlı Linkler",
            servicesFooter: "Hizmetler",
            contactFooter: "İletişim",
            workingHours: "Pazartesi-Cuma: 10:00-20:00",
            copyright: "© 2025 SAFEALIGN. Tüm hakları saklıdır.",
            privacy: "Gizlilik Politikası",
            terms: "Kullanım Şartları"
        }
    };
    
    const currentTranslations = translations[lang];
    
    // Update page title and meta description
    const title = document.querySelector('title');
    const metaDesc = document.querySelector('meta[name="description"]');
    
    if (title) {
        title.textContent = title.getAttribute(`data-lang-${lang}`) || title.textContent;
    }
    
    if (metaDesc) {
        metaDesc.setAttribute('content', metaDesc.getAttribute(`data-lang-${lang}`) || metaDesc.getAttribute('content'));
    }
    
    // Update all translatable elements
    Object.keys(currentTranslations).forEach(key => {
        const elements = document.querySelectorAll(`[data-translate="${key}"]`);
        elements.forEach(element => {
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = currentTranslations[key];
            } else if (element.hasAttribute('placeholder')) {
                element.placeholder = currentTranslations[key];
            } else {
                element.textContent = currentTranslations[key];
            }
        });
    });
}

function updateNavigation(lang) {
    const navLinks = document.querySelectorAll('.nav-link');
    const translations = {
        en: ["Home", "Our Capabilities", "About Us", "Contact"],
        tr: ["Ana Sayfa", "Hizmetlerimiz", "Hakkımızda", "İletişim"]
    };
    
    navLinks.forEach((link, index) => {
        if (translations[lang] && translations[lang][index]) {
            link.textContent = translations[lang][index];
        }
    });
}

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeWebsite,
        validateForm,
        isValidEmail,
        debounce,
        throttle
    };
}
