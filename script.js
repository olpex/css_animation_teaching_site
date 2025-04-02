// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('nav-active');
            
            // Animate hamburger to X
            const bars = document.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.toggle('active'));
            
            if (navLinks.classList.contains('nav-active')) {
                // Add animation to each nav item
                const navItems = document.querySelectorAll('.nav-links li');
                navItems.forEach((item, index) => {
                    // Reset any existing animation
                    item.style.animation = '';
                    
                    // Add fade-in animation with staggered delay
                    setTimeout(() => {
                        item.style.animation = `navItemFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                    }, 10);
                });
            }
        });
    }
    
    // Tab Functionality for Examples Section
    const tabBtns = document.querySelectorAll('.tab-btn');
    const exampleTabs = document.querySelectorAll('.example-tab');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and tabs
            tabBtns.forEach(btn => btn.classList.remove('active'));
            exampleTabs.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Intersection Observer for Animation on Scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .tutorial-card, .resource-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };
    
    animateOnScroll();
    
    // Interactive Code Examples
    // This adds the ability to edit the code and see the changes in real-time
    const setupCodeEditor = function() {
        const codeContainers = document.querySelectorAll('.code-container pre code');
        const resultContainers = document.querySelectorAll('.result-container');
        
        codeContainers.forEach((codeElement, index) => {
            if (resultContainers[index]) {
                // Make code editable
                codeElement.setAttribute('contenteditable', 'true');
                codeElement.addEventListener('input', function() {
                    // Get the code
                    const code = this.textContent;
                    
                    // Create a style element
                    let styleElement = document.getElementById(`dynamic-style-${index}`);
                    if (!styleElement) {
                        styleElement = document.createElement('style');
                        styleElement.id = `dynamic-style-${index}`;
                        document.head.appendChild(styleElement);
                    }
                    
                    // Update the style
                    styleElement.textContent = code;
                });
                
                // Add instruction tooltip
                const tooltip = document.createElement('div');
                tooltip.className = 'edit-tooltip';
                tooltip.textContent = 'Edit this code to see changes in real-time!';
                codeElement.parentNode.appendChild(tooltip);
                
                // Show tooltip on hover
                codeElement.addEventListener('mouseenter', () => {
                    tooltip.style.opacity = '1';
                });
                
                codeElement.addEventListener('mouseleave', () => {
                    tooltip.style.opacity = '0';
                });
            }
        });
    };
    
    // Call this function after a short delay to ensure all elements are rendered
    setTimeout(setupCodeEditor, 1000);
    
    // Smooth scrolling for navigation links
    const smoothScroll = function() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close mobile menu if open
                    if (navLinks.classList.contains('nav-active')) {
                        navLinks.classList.remove('nav-active');
                        const bars = document.querySelectorAll('.bar');
                        bars.forEach(bar => bar.classList.toggle('active'));
                    }
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Adjust for header height
                        behavior: 'smooth'
                    });
                }
            });
        });
    };
    
    smoothScroll();
    
    // Add animation classes to buttons
    const animateButtons = function() {
        const buttons = document.querySelectorAll('.primary-btn, .secondary-btn, .cta-button, .get-started-btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.classList.add('pulse');
            });
            
            button.addEventListener('mouseleave', function() {
                // Remove the class after animation completes
                setTimeout(() => {
                    this.classList.remove('pulse');
                }, 300);
            });
        });
    };
    
    animateButtons();
    
    // Add CSS animation demos to the tutorial preview sections
    const initAnimationDemos = function() {
        // Already handled by CSS, but could add more complex demos here
    };
    
    initAnimationDemos();
});

// Add keyframe animation for button pulse effect
const addKeyframeStyles = function() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes navItemFade {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
            100% {
                transform: scale(1);
            }
        }
        
        .pulse {
            animation: pulse 0.3s ease-in-out;
        }
        
        .bar.active:nth-child(1) {
            transform: rotate(45deg) translate(5px, 6px);
        }
        
        .bar.active:nth-child(2) {
            opacity: 0;
        }
        
        .bar.active:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -6px);
        }
        
        .edit-tooltip {
            position: absolute;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 12px;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            white-space: nowrap;
        }
        
        .animate {
            animation: fade-up 0.6s ease forwards;
        }
        
        @keyframes fade-up {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
};

addKeyframeStyles();
