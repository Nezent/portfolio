// Sirajum Munir Portfolio - Interactive JavaScript

class PortfolioAnimations {
    constructor() {
        this.init();
        this.createNebulas();  // Add this line in constructor
    }

    init() {
        this.createStars();
        this.createPlanets();
        this.setupCursorGlow();
        this.setupScrollAnimations();
        this.setupShootingStars();
        this.setupParticleSystem();
        this.setupSmoothScrolling();
        this.setupIntersectionObserver();
        // this.setupTypingEffect();
        this.setupMouseFollower();
    }

    // Create animated stars background
    createStars() {
        const starsContainer = document.getElementById('animation-boundary');
        // Responsive star count based on screen width
        const starCount = window.innerWidth < 768 ? 40 : 100;  // 50 stars on mobile, 100 on desktop

        // Clear existing stars if any
        starsContainer.innerHTML = '';

        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Random position
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            
            // Random size (made slightly smaller)
            const size = Math.random() * 2 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            // Random animation delay
            star.style.animationDelay = `${Math.random() * 3}s`;
            
            starsContainer.appendChild(star);
        }

        // Update stars on window resize
        window.addEventListener('resize', () => {
            const newStarCount = window.innerWidth < 768 ? 50 : 100;
            if (starCount !== newStarCount) {
                this.createStars();
            }
        });
    }

    // Create orbiting planets
    createPlanets() {
        const planetsContainer = document.getElementById('planets-container');
        
        const planets = [
            { 
                class: 'planet-1', 
                size: 60, 
                gradient: 'radial-gradient(circle, #ff6b6b 0%, #a52a2a 50%, #8b0000 100%)',
                shadow: '0 0 50px rgba(255, 107, 107, 0.4)',
                animation: '20s'
            }, // Mars
            // { 
            //     class: 'planet-2', 
            //     size: 80, 
            //     gradient: 'radial-gradient(circle, #ffa07a 0%, #cd853f 30%, #8b4513 60%, #654321 100%)',
            //     shadow: '0 0 60px rgba(205, 133, 63, 0.4)',
            //     animation: '30s'
            // }  // Jupiter
        ];

        planets.forEach((planetData, index) => {
            const planet = document.createElement('div');
            planet.className = `planet ${planetData.class}`;
            planet.style.cssText = `
                width: ${planetData.size}px;
                height: ${planetData.size}px;
                background: ${planetData.gradient};
                box-shadow: ${planetData.shadow};
                border-radius: 50%;
                position: absolute;
                animation: orbit ${planetData.animation} linear infinite;
            `;
            planetsContainer.appendChild(planet);
        });
    }

    // Setup cursor glow effect
    setupCursorGlow() {
        const cursorGlow = document.getElementById('cursor-glow');
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const updateCursor = () => {
            currentX += (mouseX - currentX) * 0.1;
            currentY += (mouseY - currentY) * 0.1;
            
            cursorGlow.style.left = currentX - 10 + 'px';
            cursorGlow.style.top = currentY - 10 + 'px';
            
            requestAnimationFrame(updateCursor);
        };
        
        updateCursor();

        // Enhanced cursor effects on hover
        const interactiveElements = document.querySelectorAll('a, button, .platform-card, .project-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorGlow.style.transform = 'scale(2)';
                cursorGlow.style.opacity = '0.8';
            });
            
            element.addEventListener('mouseleave', () => {
                cursorGlow.style.transform = 'scale(1)';
                cursorGlow.style.opacity = '1';
            });
        });
    }

    // Setup shooting stars
    setupShootingStars() {
        const shootingStarsContainer = document.getElementById('shooting-stars');
        
        const createShootingStar = () => {
            const star = document.createElement('div');
            star.className = 'shooting-star';
            
            // Random starting position
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 50 + '%';
            
            shootingStarsContainer.appendChild(star);
            
            // Remove after animation
            setTimeout(() => {
                star.remove();
            }, 1500);
        };

        // Create shooting stars at random intervals
        setInterval(createShootingStar, 3000 + Math.random() * 2000);
    }

    // Setup particle system
    setupParticleSystem() {
        const boundaryContainer = document.getElementById('animation-boundary');
        
        // Responsive particle count
        const getParticleInterval = () => {
            return window.innerWidth < 768 ? 1000 : 500; // Less frequent on mobile
        };
        
        const createParticle = () => {
            // Responsive particle count
            const maxParticles = window.innerWidth < 768 ? 10 : 20; // Fewer particles on mobile
            const currentParticles = boundaryContainer.getElementsByClassName('particle').length;
            
            if (currentParticles >= maxParticles) return;
            
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random size (smaller than before)
            const size = Math.random() * 3 + 1; // Reduced max size from 4 to 3
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Constrain position to viewport
            particle.style.left = Math.random() * (window.innerWidth - size) + 'px';
            particle.style.top = Math.random() * (window.innerHeight - size) + 'px';
            
            boundaryContainer.appendChild(particle);
            
            // Remove after shorter duration
            setTimeout(() => particle.remove(), 3000); // Reduced from 5000 to 3000
        };

        let intervalId = setInterval(createParticle, getParticleInterval());

        // Update interval on resize
        window.addEventListener('resize', () => {
            clearInterval(intervalId);
            intervalId = setInterval(createParticle, getParticleInterval());
        });
    }

    // Setup scroll animations
    setupScrollAnimations() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
            section.style.transition = 'all 0.8s ease-out';
        });

        // Parallax effect for background elements
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // Setup intersection observer for animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Add staggered animation to children
                    const children = entry.target.querySelectorAll('.glass-card, .platform-card, .project-card');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });

        // Observe individual cards
        document.querySelectorAll('.glass-card, .platform-card, .project-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease-out';
            observer.observe(card);
        });
    }

    // Setup smooth scrolling for navigation
    setupSmoothScrolling() {
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
    }

    // Setup typing effect for hero section
    setupTypingEffect() {
        const tagline = document.querySelector('section p:nth-of-type(2)');
        if (tagline) {
            const text = '"Aka Nezent"';
            tagline.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    tagline.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            
            setTimeout(typeWriter, 2000);
        }
    }

    // Setup mouse follower effect
    setupMouseFollower() {
        let mouseFollower = document.createElement('div');
        mouseFollower.style.cssText = `
            position: fixed;
            width: 40px;
            height: 40px;
            background: radial-gradient(circle, rgba(8, 145, 178, 0.2) 0%, transparent 70%);
            border: 2px solid rgba(8, 145, 178, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transition: transform 0.3s ease;
            mix-blend-mode: screen;
        `;
        document.body.appendChild(mouseFollower);

        document.addEventListener('mousemove', (e) => {
            mouseFollower.style.left = e.clientX - 20 + 'px';
            mouseFollower.style.top = e.clientY - 20 + 'px';
        });

        // Add hover effect for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .platform-card, .project-card');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                mouseFollower.style.transform = 'scale(1)';
                mouseFollower.style.border = '2px solid rgba(8, 145, 178, 0.0)';
                mouseFollower.style.background = 'radial-gradient(circle, rgba(8, 145, 178, 0.3) 0%, transparent 70%)';
            });
            
            element.addEventListener('mouseleave', () => {
                mouseFollower.style.transform = 'scale(1)';
                mouseFollower.style.border = '2px solid rgba(8, 145, 178, 0.6)';
                mouseFollower.style.background = 'radial-gradient(circle, rgba(8, 145, 178, 0.2) 0%, transparent 70%)';
            });
        });
    }

    // Add this new method
    createNebulas() {
        const container = document.getElementById('animation-boundary');
        
        // First Nebula (Purple-Blue)
        const nebula1 = document.createElement('div');
        nebula1.className = 'nebula nebula-1';
        nebula1.style.cssText = `
            position: fixed;
            width: 600px;
            height: 600px;
            top: 16%;
            left: 8%;
            background: radial-gradient(circle at center,
                rgba(147, 51, 234, 0.2) 0%,
                rgba(79, 70, 229, 0.1) 45%,
                transparent 70%
            );
            filter: blur(60px);
            animation: nebulaPulse 15s ease-in-out infinite;
            z-index: 1;
        `;
        
        // Second Nebula (Cyan-Green)
        const nebula2 = document.createElement('div');
        nebula2.className = 'nebula nebula-2';
        nebula2.style.cssText = `
            position: fixed;
            width: 500px;
            height: 500px;
            top: 60%;
            right: 8%;
            background: radial-gradient(circle at center,
                rgba(6, 182, 212, 0.2) 0%,
                rgba(16, 185, 129, 0.1) 45%,
                transparent 70%
            );
            filter: blur(50px);
            animation: nebulaPulse 12s ease-in-out infinite alternate;
            z-index: 1;
        `;

        container.appendChild(nebula1);
        container.appendChild(nebula2);
    }
}

// Enhanced Interactive Features
class InteractiveFeatures {
    constructor() {
        this.setupProjectCardHovers();
        this.setupFormValidation();
        this.setupDynamicContent();
        this.setupPerformanceOptimizations();
    }

    setupProjectCardHovers() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                // Add dynamic glow effect
                this.style.boxShadow = '0 20px 40px rgba(8, 145, 178, 0.3)';
                
                // Animate tags
                const tags = this.querySelectorAll('.tag');
                tags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.style.transform = 'scale(1.1)';
                        tag.style.background = 'rgba(8, 145, 178, 0.4)';
                    }, index * 50);
                });
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.boxShadow = '';
                
                const tags = this.querySelectorAll('.tag');
                tags.forEach(tag => {
                    tag.style.transform = 'scale(1)';
                    tag.style.background = 'rgba(8, 145, 178, 0.2)';
                });
            });
        });
    }

    setupFormValidation() {
        const form = document.querySelector('form');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Simple form validation
                const inputs = this.querySelectorAll('input, textarea');
                let isValid = true;
                
                inputs.forEach(input => {
                    if (!input.value.trim()) {
                        input.style.borderColor = '#ef4444';
                        isValid = false;
                    } else {
                        input.style.borderColor = '#0891b2';
                    }
                });
                
                if (isValid) {
                    // Simulate form submission
                    const button = this.querySelector('button');
                    const originalText = button.innerHTML;
                    
                    button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
                    button.disabled = true;
                    
                    setTimeout(() => {
                        button.innerHTML = '<i class="fas fa-check mr-2"></i>Sent!';
                        setTimeout(() => {
                            button.innerHTML = originalText;
                            button.disabled = false;
                            this.reset();
                        }, 2000);
                    }, 2000);
                }
            });
        }
    }

    setupDynamicContent() {
        // Animate numbers
        const animateNumbers = () => {
            const numberElements = document.querySelectorAll('[data-number]');
            
            numberElements.forEach(element => {
                const target = parseInt(element.dataset.number);
                const increment = target / 100;
                let current = 0;
                
                const updateNumber = () => {
                    current += increment;
                    if (current < target) {
                        element.textContent = Math.floor(current) + '+';
                        requestAnimationFrame(updateNumber);
                    } else {
                        element.textContent = target + '+';
                    }
                };
                
                updateNumber();
            });
        };

        // Trigger number animation when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    observer.unobserve(entry.target);
                }
            });
        });

        const statsSection = document.querySelector('.glass-card');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }

    setupPerformanceOptimizations() {
        // Lazy loading for images
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }

        // Debounce scroll events
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(() => {
                // Scroll-based animations
                this.updateScrollProgress();
            }, 16);
        });
    }

    updateScrollProgress() {
        const scrollProgress = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
        document.documentElement.style.setProperty('--scroll-progress', scrollProgress);
    }
}

// Advanced Animation System
class AdvancedAnimations {
    constructor() {
        this.setupMorphingShapes();
        this.setupFloatingElements();
        this.setupInteractiveBackground();
    }

    setupMorphingShapes() {
        // Create morphing background shapes
        const shapes = ['circle', 'square', 'triangle'];
        
        setInterval(() => {
            const shape = document.createElement('div');
            shape.className = 'morphing-shape';
            shape.style.cssText = `
                position: fixed;
                width: 100px;
                height: 100px;
                background: radial-gradient(circle, rgba(8, 145, 178, 0.1) 0%, transparent 70%);
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                z-index: 1;
                animation: morphShape 8s ease-in-out infinite;
            `;
            
            document.body.appendChild(shape);
            
            setTimeout(() => {
                shape.remove();
            }, 8000);
        }, 4000);
    }

    setupFloatingElements() {
        const floatingElements = document.querySelectorAll('.glass-card');
        
        floatingElements.forEach((element, index) => {
            element.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
            element.style.animationDelay = `${index * 0.2}s`;
        });
    }

    setupInteractiveBackground() {
        const canvas = document.createElement('canvas');
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            opacity: 0.3;
        `;
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 50;

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                radius: Math.random() * 2 + 1
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
                
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(8, 145, 178, 0.5)';
                ctx.fill();
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();

        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioAnimations();
    new InteractiveFeatures();
    new AdvancedAnimations();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes morphShape {
        0%, 100% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(1.2) rotate(90deg); }
        50% { transform: scale(0.8) rotate(180deg); }
        75% { transform: scale(1.1) rotate(270deg); }
    }
`;
document.head.appendChild(style);