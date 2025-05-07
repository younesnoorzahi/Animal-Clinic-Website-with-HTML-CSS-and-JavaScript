// Appointment JavaScript for Paws & Claws Animal Clinic

// DOM Elements
const appointmentProgress = document.getElementById('appointmentProgress');
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const confirmation = document.getElementById('confirmation');

const step1Next = document.getElementById('step1Next');
const step2Back = document.getElementById('step2Back');
const step2Next = document.getElementById('step2Next');
const step3Back = document.getElementById('step3Back');
const confirmAppointment = document.getElementById('confirmAppointment');

const timeSlots = document.getElementById('timeSlots');
const appointmentForm = document.getElementById('appointmentForm');

// Initialize appointment page
document.addEventListener('DOMContentLoaded', () => {
    // Disable step1Next button initially
    if (step1Next) {
        step1Next.disabled = true;
    }
    
    // Step 1 to Step 2
    if (step1Next) {
        step1Next.addEventListener('click', () => {
            // Get selected date and time
            const selectedDay = document.querySelector('.calendar-day.selected');
            const selectedTime = document.querySelector('.time-slot.selected');
            
            if (selectedDay && selectedTime) {
                // Hide step 1, show step 2
                step1.classList.remove('active');
                step2.classList.add('active');
                
                // Update progress
                updateProgress(2);
                
                // Update appointment date and time display
                updateAppointmentDateTime(selectedDay, selectedTime);
            }
        });
    }
    
    // Step 2 to Step 1
    if (step2Back) {
        step2Back.addEventListener('click', () => {
            // Hide step 2, show step 1
            step2.classList.remove('active');
            step1.classList.add('active');
            
            // Update progress
            updateProgress(1);
        });
    }
    
    // Step 2 to Step 3
    if (step2Next) {
        step2Next.addEventListener('click', () => {
            // Validate form
            if (appointmentForm.checkValidity()) {
                // Hide step 2, show step 3
                step2.classList.remove('active');
                step3.classList.add('active');
                
                // Update progress
                updateProgress(3);
                
                // Populate review information
                populateReviewInfo();
            } else {
                // Trigger form validation
                appointmentForm.reportValidity();
            }
        });
    }
    
    // Step 3 to Step 2
    if (step3Back) {
        step3Back.addEventListener('click', () => {
            // Hide step 3, show step 2
            step3.classList.remove('active');
            step2.classList.add('active');
            
            // Update progress
            updateProgress(2);
        });
    }
    
    // Confirm appointment
    if (confirmAppointment) {
        confirmAppointment.addEventListener('click', () => {
            // Hide step 3, show confirmation
            step3.classList.remove('active');
            confirmation.classList.add('active');
            
            // Update progress (all steps completed)
            updateProgress(4);
            
            // Show confirmation email
            const email = document.getElementById('email').value;
            document.getElementById('confirmationEmail').textContent = email;
            
            // Add animation to confirmation message
            const confirmationMessage = document.querySelector('.confirmation-message');
            confirmationMessage.style.animation = 'fadeIn 0.5s ease';
        });
    }
    
    // Time slot selection
    if (timeSlots) {
        const slots = timeSlots.querySelectorAll('.time-slot');
        
        slots.forEach(slot => {
            slot.addEventListener('click', () => {
                // Remove selected class from all slots
                slots.forEach(s => s.classList.remove('selected'));
                
                // Add selected class to clicked slot
                slot.classList.add('selected');
                
                // Enable next button
                if (step1Next) {
                    step1Next.disabled = false;
                }
            });
        });
    }
    
    // Add animations to form elements
    animateFormElements();
});

// Update progress indicator
function updateProgress(step) {
    if (!appointmentProgress) return;
    
    const progressSteps = appointmentProgress.querySelectorAll('.progress-step');
    
    // Reset all steps
    progressSteps.forEach((s, index) => {
        s.classList.remove('active', 'completed');
        
        // Mark previous steps as completed
        if (index < step - 1) {
            s.classList.add('completed');
        }
        
        // Mark current step as active
        if (index === step - 1) {
            s.classList.add('active');
        }
    });
}

// Update appointment date and time display
function updateAppointmentDateTime(day, time) {
    const appointmentDateTime = document.getElementById('appointmentDateTime');
    if (!appointmentDateTime) return;
    
    // Get current month and year
    const date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    
    // Get day number
    const dayNumber = day.textContent;
    
    // Get day of week
    const dayOfWeek = new Date(year, date.getMonth(), dayNumber).toLocaleString('default', { weekday: 'long' });
    
    // Format date and time
    const formattedDate = `${dayOfWeek}, ${month} ${dayNumber}, ${year}`;
    const formattedTime = time.textContent;
    
    // Update display
    appointmentDateTime.textContent = `${formattedDate} at ${formattedTime}`;
}

// Populate review information
function populateReviewInfo() {
    // Get form values
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const petName = document.getElementById('petName').value;
    const petType = document.getElementById('petType').value;
    const reason = document.getElementById('reason').value;
    
    // Get appointment date and time
    const appointmentDateTime = document.getElementById('appointmentDateTime').textContent;
    
    // Update review sections
    document.getElementById('reviewDateTime').textContent = appointmentDateTime;
    document.getElementById('reviewContact').innerHTML = `
        ${firstName} ${lastName}<br>
        ${email}<br>
        ${phone}
    `;
    document.getElementById('reviewPet').innerHTML = `
        Name: ${petName}<br>
        Type: ${petType.charAt(0).toUpperCase() + petType.slice(1)}
    `;
    document.getElementById('reviewReason').textContent = reason;
}

// Animate form elements
function animateFormElements() {
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
            group.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        }, 100 + (index * 50));
    });
    
    const stepButtons = document.querySelectorAll('.step-buttons');
    
    stepButtons.forEach((buttons) => {
        buttons.style.opacity = '0';
        buttons.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            buttons.style.opacity = '1';
            buttons.style.transform = 'translateY(0)';
            buttons.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        }, 100 + (formGroups.length * 50));
    });
}