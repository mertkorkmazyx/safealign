// ===== ANIMATIONS.JS - ADVANCED ANIMATION SYSTEM =====

// ===== ANIMATION CONTROLLER =====
class AnimationController {
    constructor() {
        this.observers = new Map();
        this.animationQueue = [];
        this.isAnimating = false;
        this.performanceMode = this.detectPerformanceMode();
        
        this.init();
    }
    
    init() {
        this.createIntersectionObserver();
        this.bindEvents();
        this.initializeCustomAnimations();
    }
    
    detectPerformanceMode() {
        // Detect device performance capabilities
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isLowEnd = isMobile && (
            connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') ||
            navigator.hardwareConcurrency <= 2
        );
        
        return {
            reduceMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            lowEnd: isLowEnd,
            mobile: isMobile
        };
    }
    
    createIntersectionObserver() {
        const options = {
            threshold: this.performanceMode.lowEnd ? 0.2 : 0.1,
            rootMargin: this.performanceMode.mobile ? '50px' : '100px'
        };
        
        this.observers.set('default', new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerAnimation(entry.target);
                } else if (entry.target.dataset.animateOut) {
                    this.reverseAnimation(entry.target);
                }
            });
        }, options));
    }
    
    bindEvents() {
        // Performance-aware scroll listener
        let scrollTicking = false;
        window.addEventListener('scroll', () => {
            if (!scrollTicking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    scrollTicking = false;
                });
                scrollTicking = true;
            }
        }, { passive: true });
        
        // Resize listener for responsive animations
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));
        
        // Visibility change for performance
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });
    }
    
    triggerAnimation(element) {
        if (this.performanceMode.reduceMotion) {
            element.style.opacity = '1';
            element.style.transform = 'none';
            return;
        }
        
        const animationType = element.dataset.animate || 'fadeInUp';
        const delay = parseInt(element.dataset.delay) || 0;
        const duration = parseInt(element.dataset.duration) || 800;
        
        setTimeout(() => {
            this.executeAnimation(element, animationType, duration);
        }, delay);
    }
    
    executeAnimation(element, type, duration) {
        element.style.opacity = '1';
        element.style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        
        switch (type) {
            case 'fadeInUp':
                element.style.transform = 'translateY(0)';
                break;
            case 'fadeInDown':
                element.style.transform = 'translateY(0)';
                break;
            case 'fadeInLeft':
                element.style.transform = 'translateX(0)';
                break;
            case 'fadeInRight':
                element.style.transform = 'translateX(0)';
                break;
            case 'zoomIn':
                element.style.transform = 'scale(1)';
                break;
            case 'rotateIn':
                element.style.transform = 'rotate(0deg)';
                break;
            default:
                element.style.transform = 'translateY(0)';
        }
        
        element.classList.add('animated');
    }
    
    reverseAnimation(element) {
        if (this.performanceMode.reduceMotion) return;
        
        element.style.opacity = '0';
        element.style.transform = this.getInitialTransform(element.dataset.animate);
        element.classList.remove('animated');
    }
    
    getInitialTransform(animationType) {
        switch (animationType) {
            case 'fadeInUp': return 'translateY(50px)';
            case 'fadeInDown': return 'translateY(-50px)';
            case 'fadeInLeft': return 'translateX(-50px)';
            case 'fadeInRight': return 'translateX(50px)';
            case 'zoomIn': return 'scale(0.8)';
            case 'rotateIn': return 'rotate(-180deg)';
            default: return 'translateY(50px)';
        }
    }
    
    handleScroll() {
        // Update parallax elements
        this.updateParallax();
        
        // Update progress indicators
        this.updateScrollProgress();
        
        // Trigger scroll-based animations
        this.checkScrollTriggers();
    }
    
    updateParallax() {
        if (this.performanceMode.lowEnd) return;
        
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.parallax) || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    }
    
    updateScrollProgress() {
        const progressBars = document.querySelectorAll('.scroll-progress');
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        
        progressBars.forEach(bar => {
            bar.style.width = `${scrollPercent}%`;
        });
    }
    
    checkScrollTriggers() {
        const triggers = document.querySelectorAll('[data-scroll-trigger]');
        
        triggers.forEach(trigger => {
            const rect = trigger.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !trigger.classList.contains('triggered')) {
                trigger.classList.add('triggered');
                this.executeTriggerAction(trigger);
            }
        });
    }
    
    executeTriggerAction(element) {
        const action = element.dataset.scrollTrigger;
        
        switch (action) {
            case 'counter':
                this.animateCounter(element);
                break;
            case 'progressBar':
                this.animateProgressBar(element);
                break;
            case 'typewriter':
                this.animateTypewriter(element);
                break;
            default:
                this.triggerAnimation(element);
        }
    }
    
    animateCounter(element) {
        const target = parseInt(element.dataset.target);
        const duration = parseInt(element.dataset.duration) || 2000;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentValue = Math.floor(this.easeOutCubic(progress) * target);
            element.textContent = currentValue.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = target.toLocaleString();
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    animateProgressBar(element) {
        const progress = parseInt(element.dataset.progress) || 100;
        const duration = parseInt(element.dataset.duration) || 1500;
        
        element.style.transition = `width ${duration}ms ease-out`;
        element.style.width = `${progress}%`;
    }
    
    animateTypewriter(element) {
        const text = element.dataset.text || element.textContent;
        const speed = parseInt(element.dataset.speed) || 50;
        
        element.textContent = '';
        let charIndex = 0;
        
        const typeInterval = setInterval(() => {
            element.textContent += text[charIndex];
            charIndex++;
            
            if (charIndex >= text.length) {
                clearInterval(typeInterval);
            }
        }, speed);
    }
    
    handleResize() {
        // Recalculate animation positions and timings
        this.performanceMode = this.detectPerformanceMode();
        this.resetAnimations();
    }
    
    resetAnimations() {
        const animatedElements = document.querySelectorAll('.animated');
        animatedElements.forEach(element => {
            element.classList.remove('animated');
            element.style.opacity = '0';
            element.style.transform = this.getInitialTransform(element.dataset.animate);
        });
    }
    
    pauseAnimations() {
        document.querySelectorAll('*').forEach(element => {
            element.style.animationPlayState = 'paused';
        });
    }
    
    resumeAnimations() {
        document.querySelectorAll('*').forEach(element => {
            element.style.animationPlayState = 'running';
        });
    }
    
    // Easing functions
    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
    
    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    // Utility function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// ===== MARITIME ANIMATION EFFECTS =====
class MaritimeAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.createWaveEffects();
        this.createFloatingElements();
        this.createCompassAnimation();
        this.createShipAnimation();
        this.createLighthouseEffect();
    }
    
    createWaveEffects() {
        const waveContainers = document.querySelectorAll('.wave-container, .ocean-waves');
        
        waveContainers.forEach(container => {
            this.generateWaves(container);
        });
    }
    
    generateWaves(container) {
        const waveCount = 3;
        
        for (let i = 0; i < waveCount; i++) {
            const wave = document.createElement('div');
            wave.className = `wave wave-${i + 1}`;
            wave.style.cssText = `
                position: absolute;
                bottom: 0;
                left: 0;
                width: 200%;
                height: 100px;
                background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 100'%3E%3Cpath d='M0,50 Q250,0 500,50 T1000,50 V100 H0 Z' fill='rgba(255,255,255,${0.1 + i * 0.1})'/%3E%3C/svg%3E");
                background-size: 1000px 100px;
                animation: waveMove ${15 - i * 2}s linear infinite;
                opacity: ${0.3 + i * 0.2};
            `;
            
            container.appendChild(wave);
        }
    }
    
    createFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating-ship, .floating-compass, .floating-anchor');
        
        floatingElements.forEach((element, index) => {
            this.applyFloatingAnimation(element, index);
        });
    }
    
    applyFloatingAnimation(element, index) {
        const floatDuration = 3 + index * 0.5;
        const floatDistance = 20 + index * 5;
        
        element.style.cssText += `
            animation: floating ${floatDuration}s ease-in-out infinite;
            animation-delay: ${index * 0.5}s;
        `;
        
        // Add custom floating keyframes
        if (!document.querySelector('#floating-keyframes')) {
            const style = document.createElement('style');
            style.id = 'floating-keyframes';
            style.textContent = `
                @keyframes floating {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    25% { transform: translateY(-${floatDistance}px) rotate(2deg); }
                    50% { transform: translateY(-${floatDistance/2}px) rotate(-1deg); }
                    75% { transform: translateY(-${floatDistance * 0.75}px) rotate(1deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    createCompassAnimation() {
        const compasses = document.querySelectorAll('.floating-compass i');
        
        compasses.forEach(compass => {
            compass.style.animation = 'compassSpin 10s linear infinite';
        });
        
        // Add compass spinning keyframes
        this.addKeyframes('compassSpin', `
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        `);
    }
    
    createShipAnimation() {
        const ships = document.querySelectorAll('.floating-ship');
        
        ships.forEach(ship => {
            ship.addEventListener('mouseenter', () => {
                ship.style.animation = 'shipSail 2s ease-in-out';
            });
            
            ship.addEventListener('animationend', () => {
                ship.style.animation = 'floating 3s ease-in-out infinite';
            });
        });
        
        this.addKeyframes('shipSail', `
            0% { transform: translateX(0) rotateY(0deg); }
            50% { transform: translateX(20px) rotateY(10deg); }
            100% { transform: translateX(0) rotateY(0deg); }
        `);
    }
    
    createLighthouseEffect() {
        const lighthouses = document.querySelectorAll('.lighthouse, .service-icon');
        
        lighthouses.forEach(lighthouse => {
            lighthouse.addEventListener('mouseenter', () => {
                this.createLightBeam(lighthouse);
            });
        });
    }
    
    createLightBeam(element) {
        const beam = document.createElement('div');
        beam.className = 'light-beam';
        beam.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 200px;
            height: 2px;
            background: linear-gradient(90deg, transparent, rgba(241, 143, 1, 0.8), transparent);
            transform-origin: left center;
            animation: lightSweep 2s ease-in-out;
            pointer-events: none;
            z-index: 10;
        `;
        
        element.style.position = 'relative';
        element.appendChild(beam);
        
        setTimeout(() => {
            beam.remove();
        }, 2000);
        
        this.addKeyframes('lightSweep', `
            0% { transform: translate(-50%, -50%) rotate(0deg) scaleX(0); opacity: 0; }
            20% { opacity: 1; scaleX: 1; }
            80% { opacity: 1; scaleX: 1; }
            100% { transform: translate(-50%, -50%) rotate(180deg) scaleX(0); opacity: 0; }
        `);
    }
    
    addKeyframes(name, keyframes) {
        if (!document.querySelector(`#keyframes-${name}`)) {
            const style = document.createElement('style');
            style.id = `keyframes-${name}`;
            style.textContent = `@keyframes ${name} { ${keyframes} }`;
            document.head.appendChild(style);
        }
    }
}

// ===== PARTICLE SYSTEM =====
class ParticleSystem {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            particleCount: options.particleCount || 50,
            particleColor: options.particleColor || 'rgba(255, 255, 255, 0.3)',
            particleSize: options.particleSize || 2,
            animationSpeed: options.animationSpeed || 20,
            ...options
        };
        
        this.particles = [];
        this.init();
    }
    
    init() {
        this.createParticles();
        this.animate();
    }
    
    createParticles() {
        for (let i = 0; i < this.options.particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${this.options.particleSize}px;
                height: ${this.options.particleSize}px;
                background: ${this.options.particleColor};
                border-radius: 50%;
                pointer-events: none;
                opacity: ${Math.random() * 0.5 + 0.2};
            `;
            
            this.resetParticle(particle);
            this.container.appendChild(particle);
            this.particles.push(particle);
        }
    }
    
    resetParticle(particle) {
        particle.style.left = Math.random() * this.container.offsetWidth + 'px';
        particle.style.top = Math.random() * this.container.offsetHeight + 'px';
        particle.dataset.speedX = (Math.random() - 0.5) * 2;
        particle.dataset.speedY = (Math.random() - 0.5) * 2;
    }
    
    animate() {
        this.particles.forEach(particle => {
            const currentX = parseFloat(particle.style.left);
            const currentY = parseFloat(particle.style.top);
            const speedX = parseFloat(particle.dataset.speedX);
            const speedY = parseFloat(particle.dataset.speedY);
            
            let newX = currentX + speedX;
            let newY = currentY + speedY;
            
            // Boundary checking
            if (newX < 0 || newX > this.container.offsetWidth) {
                particle.dataset.speedX = -speedX;
                newX = Math.max(0, Math.min(newX, this.container.offsetWidth));
            }
            
            if (newY < 0 || newY > this.container.offsetHeight) {
                particle.dataset.speedY = -speedY;
                newY = Math.max(0, Math.min(newY, this.container.offsetHeight));
            }
            
            particle.style.left = newX + 'px';
            particle.style.top = newY + 'px';
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// ===== GSAP INTEGRATION (IF AVAILABLE) =====
class GSAPAnimations {
    constructor() {
        this.isGSAPAvailable = typeof gsap !== 'undefined';
        
        if (this.isGSAPAvailable) {
            this.init();
        }
    }
    
    init() {
        this.createTimelines();
        this.registerScrollTriggers();
    }
    
    createTimelines() {
        // Hero section timeline
        const heroTl = gsap.timeline();
        heroTl.from('.hero-title .title-line', {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
        })
        .from('.hero-subtitle', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.5')
        .from('.hero-buttons .btn', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        }, '-=0.3');
        
        // Service cards animation
        gsap.set('.service-card', { y: 50, opacity: 0 });
        
        const serviceCards = gsap.utils.toArray('.service-card');
        serviceCards.forEach((card, index) => {
            gsap.to(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'power2.out'
            });
        });
    }
    
    registerScrollTriggers() {
        // Parallax effects
        gsap.utils.toArray('[data-parallax]').forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            gsap.to(element, {
                y: () => window.innerHeight * speed,
                ease: 'none',
                scrollTrigger: {
                    trigger: element,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        });
        
        // Counter animations
        gsap.utils.toArray('[data-counter]').forEach(counter => {
            const target = parseInt(counter.dataset.counter);
            gsap.to(counter, {
                textContent: target,
                duration: 2,
                ease: 'power2.out',
                snap: { textContent: 1 },
                scrollTrigger: {
                    trigger: counter,
                    start: 'top 80%'
                }
            });
        });
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animation controller
    const animationController = new AnimationController();
    
    // Initialize maritime animations
    const maritimeAnimations = new MaritimeAnimations();
    
    // Initialize particle systems for specific containers
    const particleContainers = document.querySelectorAll('.particle-container, .hero-background');
    particleContainers.forEach(container => {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            new ParticleSystem(container, {
                particleCount: 30,
                particleColor: 'rgba(255, 255, 255, 0.2)',
                particleSize: 1,
                animationSpeed: 15
            });
        }
    });
    
    // Initialize GSAP animations if available
    const gsapAnimations = new GSAPAnimations();
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = animationController.getInitialTransform(element.dataset.animate);
        animationController.observers.get('default').observe(element);
    });
});

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AnimationController,
        MaritimeAnimations,
        ParticleSystem,
        GSAPAnimations
    };
}
