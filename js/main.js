// Main JavaScript for Paws & Claws Animal Clinic

// DOM Elements
const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const currentYearElements = document.querySelectorAll('#currentYear');
const introAnimation = document.getElementById('introAnimation');

// Set current year in footer
currentYearElements.forEach(element => {
    element.textContent = new Date().getFullYear();
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
}

// Hide intro animation after 3 seconds
if (introAnimation) {
    setTimeout(() => {
        introAnimation.style.display = 'none';
    }, 3000);
}

// Scroll animation
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // Add animation when element is in viewport
        if (elementPosition < windowHeight - 50) {
            element.classList.add('visible');
            
            // Add delay if specified
            const delay = element.getAttribute('data-delay');
            if (delay) {
                element.style.transitionDelay = `${delay}ms`;
            }
        }
    });
};

// Initialize animations
window.addEventListener('load', () => {
    animateOnScroll();
    
    // Continue checking for elements to animate as user scrolls
    window.addEventListener('scroll', animateOnScroll);
});

// Service cards data
const services = [
    {
        id: 'wellness',
        title: 'Wellness Exams',
        description: 'Comprehensive check-ups to keep your pet healthy and catch issues early.',
        icon: 'fa-stethoscope'
    },
    {
        id: 'vaccinations',
        title: 'Vaccinations',
        description: 'Protect your pet from common and serious diseases with our vaccination programs.',
        icon: 'fa-syringe'
    },
    {
        id: 'surgery',
        title: 'Surgery',
        description: 'From routine spay/neuter to complex procedures in our state-of-the-art surgical suite.',
        icon: 'fa-scissors'
    },
    {
        id: 'dental',
        title: 'Dental Care',
        description: 'Complete dental services including cleanings, extractions, and oral health education.',
        icon: 'fa-tooth'
    },
    {
        id: 'emergency',
        title: 'Emergency Care',
        description: 'Urgent care for your pet when they need it most, with 24/7 emergency services.',
        icon: 'fa-heartbeat'
    },
    {
        id: 'laboratory',
        title: 'Laboratory Services',
        description: 'In-house diagnostics for quick results and accurate diagnoses.',
        icon: 'fa-microscope'
    }
];

// Populate service cards on homepage
const serviceCardsContainer = document.getElementById('serviceCards');
if (serviceCardsContainer) {
    // Only show first 3 services on homepage
    services.slice(0, 3).forEach((service, index) => {
        const card = createServiceCard(service, index);
        serviceCardsContainer.appendChild(card);
    });
}

// Create service card element
function createServiceCard(service, index) {
    const card = document.createElement('div');
    card.className = 'service-card animate-on-scroll fade-up';
    card.id = service.id;
    card.setAttribute('data-delay', index * 100);
    
    card.innerHTML = `
        <div class="service-content">
            <i class="fas ${service.icon} service-icon"></i>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        </div>
    `;
    
    return card;
}

// Testimonial slider
const testimonialSlider = document.getElementById('testimonialSlider');
if (testimonialSlider) {
    const slides = testimonialSlider.querySelectorAll('.testimonial-slide');
    const dots = testimonialSlider.querySelectorAll('.dot');
    const prevBtn = testimonialSlider.querySelector('.testimonial-prev');
    const nextBtn = testimonialSlider.querySelector('.testimonial-next');
    
    let currentSlide = 0;
    let autoplayInterval;
    
    // Show slide by index
    const showSlide = (index) => {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    };
    
    // Next slide
    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    };
    
    // Previous slide
    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    };
    
    // Start autoplay
    const startAutoplay = () => {
        autoplayInterval = setInterval(nextSlide, 5000);
    };
    
    // Stop autoplay
    const stopAutoplay = () => {
        clearInterval(autoplayInterval);
    };
    
    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoplay();
        startAutoplay();
    });
    
    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoplay();
        startAutoplay();
    });
    
    // Dot navigation
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            currentSlide = index;
            showSlide(currentSlide);
            stopAutoplay();
            startAutoplay();
        });
    });
    
    // Start autoplay on page load
    startAutoplay();
}