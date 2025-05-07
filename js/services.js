// Services JavaScript for Paws & Claws Animal Clinic

// DOM Elements
const expandedServiceCards = document.getElementById('expandedServiceCards');

// Services data (imported from main.js)
const expandedServices = [
    {
        id: 'wellness',
        title: 'Wellness Exams',
        description: 'Comprehensive check-ups to keep your pet healthy and catch issues early. Our wellness exams include a thorough physical examination, vaccinations as needed, parasite screening, and nutritional counseling. Regular wellness exams help us detect and treat potential health issues before they become serious problems.',
        icon: 'fa-stethoscope'
    },
    {
        id: 'vaccinations',
        title: 'Vaccinations',
        description: 'Protect your pet from common and serious diseases with our vaccination programs. We offer core and non-core vaccines for dogs, cats, and other pets. Our veterinarians will work with you to create a vaccination schedule that meets your pet\'s specific needs based on their age, lifestyle, and risk factors.',
        icon: 'fa-syringe'
    },
    {
        id: 'surgery',
        title: 'Surgery',
        description: 'From routine spay/neuter to complex procedures in our state-of-the-art surgical suite. Our experienced veterinary surgeons use the latest techniques and equipment to ensure your pet receives the highest quality surgical care. We prioritize pain management and careful monitoring during and after all surgical procedures.',
        icon: 'fa-scissors'
    },
    {
        id: 'dental',
        title: 'Dental Care',
        description: 'Complete dental services including cleanings, extractions, and oral health education. Dental disease is one of the most common health issues in pets, and regular dental care is essential for their overall health. Our dental services include digital dental X-rays, ultrasonic scaling, polishing, and extractions when necessary.',
        icon: 'fa-tooth'
    },
    {
        id: 'emergency',
        title: 'Emergency Care',
        description: 'Urgent care for your pet when they need it most, with 24/7 emergency services. Our emergency team is equipped to handle a wide range of critical conditions, from trauma and poisoning to sudden illness. We have advanced diagnostic equipment and treatment options available to provide immediate care for your pet in emergency situations.',
        icon: 'fa-heartbeat'
    },
    {
        id: 'laboratory',
        title: 'Laboratory Services',
        description: 'In-house diagnostics for quick results and accurate diagnoses. Our laboratory is equipped with advanced technology to perform blood tests, urinalysis, fecal examinations, cytology, and more. Having these capabilities in-house allows us to get results quickly, often while you wait, so we can begin treatment promptly.',
        icon: 'fa-microscope'
    }
];

// Populate expanded service cards on services page
if (expandedServiceCards) {
    expandedServices.forEach((service, index) => {
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
        
        expandedServiceCards.appendChild(card);
    });
}

// Initialize animations
window.addEventListener('load', () => {
    // Animate service cards on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {.forEach(element => {
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
    
    // Run animation check on load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});

// Service card hover animations
document.addEventListener('DOMContentLoaded', () => {
    // Add hover animations to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.service-icon');
            icon.style.animation = 'bounce 1s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.service-icon');
            icon.style.animation = '';
        });
    });
});