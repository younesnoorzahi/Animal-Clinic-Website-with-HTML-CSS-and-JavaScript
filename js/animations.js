// Animations JavaScript for Paws & Claws Animal Clinic

// Check if browser supports Intersection Observer
if ('IntersectionObserver' in window) {
    // Create observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add delay if specified
                const delay = entry.target.getAttribute('data-delay');
                if (delay) {
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
                
                // Unobserve after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });
    
    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
} else {
    // Fallback for browsers that don't support Intersection Observer
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        element.classList.add('visible');
    });
}

// Logo animation on hover
const logoElements = document.querySelectorAll('.logo i');
logoElements.forEach(logo => {
    logo.addEventListener('mouseenter', () => {
        logo.style.animation = 'bounce 1s ease';
    });
    
    logo.addEventListener('animationend', () => {
        logo.style.animation = '';
    });
});

// Service icon animations
document.querySelectorAll('.service-icon').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.animation = 'bounce 1s ease';
    });
    
    icon.addEventListener('animationend', () => {
        icon.style.animation = '';
    });
});

// Button hover animations
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', () => {
        if (button.classList.contains('primary-btn')) {
            button.style.transform = 'translateY(-3px)';
            button.style.boxShadow = '0 5px 15px rgba(76, 175, 80, 0.4)';
        }
    });
    
    button.addEventListener('mouseleave', () => {
        if (button.classList.contains('primary-btn')) {
            button.style.transform = '';
            button.style.boxShadow = '';
        }
    });
});

// Text button arrow animation
document.querySelectorAll('.text-btn').forEach(button => {
    button.addEventListener('mouseenter', () => {
        const arrow = button.querySelector('i');
        if (arrow) {
            arrow.style.transform = 'translateX(5px)';
        }
    });
    
    button.addEventListener('mouseleave', () => {
        const arrow = button.querySelector('i');
        if (arrow) {
            arrow.style.transform = '';
        }
    });
});

// Card hover animations
document.querySelectorAll('.card, .service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
    });
});

// Intro animation
const introAnimation = document.getElementById('introAnimation');
if (introAnimation) {
    // Logo animation
    const logoContainer = introAnimation.querySelector('.logo-container i');
    logoContainer.style.opacity = '0';
    logoContainer.style.transform = 'scale(0.5)';
    
    setTimeout(() => {
        logoContainer.style.opacity = '1';
        logoContainer.style.transform = 'scale(1)';
        logoContainer.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    }, 100);
    
    // Text animations with delay
    const clinicName = introAnimation.querySelector('.clinic-name');
    const clinicTagline = introAnimation.querySelector('.clinic-tagline');
    
    clinicName.style.opacity = '0';
    clinicName.style.transform = 'translateY(20px)';
    
    clinicTagline.style.opacity = '0';
    clinicTagline.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        clinicName.style.opacity = '1';
        clinicName.style.transform = 'translateY(0)';
        clinicName.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    }, 300);
    
    setTimeout(() => {
        clinicTagline.style.opacity = '1';
        clinicTagline.style.transform = 'translateY(0)';
        clinicTagline.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    }, 600);
    
    // Hide intro animation after delay
    setTimeout(() => {
        introAnimation.style.opacity = '0';
        introAnimation.style.transition = 'opacity 0.5s ease';
        
        // Remove from DOM after fade out
        setTimeout(() => {
            introAnimation.style.display = 'none';
        }, 500);
    }, 2500);
}

// Animate navigation menu items with delay
document.querySelectorAll('.nav-menu li').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    }, 100 + (index * 100));
});

// Mobile menu animation
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) {
            // Animate menu items out
            document.querySelectorAll('.mobile-menu li').forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(-10px)';
                item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                item.style.transitionDelay = `${(document.querySelectorAll('.mobile-menu li').length - index - 1) * 50}ms`;
            });
            
            // Delay hiding the menu until items are animated out
            setTimeout(() => {
                mobileMenu.classList.remove('active');
            }, 300);
        } else {
            mobileMenu.classList.add('active');
            
            // Animate menu items in
            document.querySelectorAll('.mobile-menu li').forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(-10px)';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                }, 100 + (index * 100));
            });
        }
    });
}