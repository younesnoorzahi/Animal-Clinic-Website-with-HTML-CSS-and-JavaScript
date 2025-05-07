// Calendar JavaScript for Paws & Claws Animal Clinic

// Generate calendar for preview on homepage
const calendarPreview = document.getElementById('calendarPreview');
const calendarBody = document.getElementById('calendarBody');

if (calendarBody) {
    generateCalendar(calendarBody);
}

// Generate calendar for appointment page
const appointmentCalendar = document.getElementById('appointmentCalendar');
if (appointmentCalendar) {
    generateFullCalendar(appointmentCalendar);
}

// Generate simple calendar preview
function generateCalendar(container) {
    // Clear container
    container.innerHTML = '';
    
    // Get current date
    const date = new Date();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    
    // Get days in month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Get first day of month
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    
    // Day names
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Add day names
    dayNames.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day day-name';
        dayElement.textContent = day;
        container.appendChild(dayElement);
    });
    
    // Add empty cells for days before first day of month
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day';
        container.appendChild(emptyDay);
    }
    
    // Add days
    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = i;
        
        // Disable past days and Sundays
        const dayDate = new Date(currentYear, currentMonth, i);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (dayDate < today || dayDate.getDay() === 0) {
            dayElement.classList.add('disabled');
        } else {
            // Add click event for selectable days
            dayElement.addEventListener('click', () => {
                // Remove selected class from all days
                document.querySelectorAll('.calendar-day').forEach(day => {
                    day.classList.remove('selected');
                });
                
                // Add selected class to clicked day
                dayElement.classList.add('selected');
            });
        }
        
        container.appendChild(dayElement);
    }
}

// Generate full calendar for appointment page
function generateFullCalendar(container) {
    // Clear container
    container.innerHTML = '';
    
    // Get current date
    const date = new Date();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    
    // Create month selector
    const monthSelector = document.createElement('div');
    monthSelector.className = 'month-selector';
    
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    monthSelector.innerHTML = `
        <div class="month-nav">
            <button class="month-prev"><i class="fas fa-chevron-left"></i></button>
            <h3>${monthNames[currentMonth]} ${currentYear}</h3>
            <button class="month-next"><i class="fas fa-chevron-right"></i></button>
        </div>
    `;
    
    container.appendChild(monthSelector);
    
    // Create calendar grid
    const calendarGrid = document.createElement('div');
    calendarGrid.className = 'calendar-grid';
    
    // Day names
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Add day names
    dayNames.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day day-name';
        dayElement.textContent = day;
        calendarGrid.appendChild(dayElement);
    });
    
    // Get days in month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Get first day of month
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    
    // Add empty cells for days before first day of month
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day';
        calendarGrid.appendChild(emptyDay);
    }
    
    // Add days
    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = i;
        
        // Disable past days and Sundays
        const dayDate = new Date(currentYear, currentMonth, i);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (dayDate < today || dayDate.getDay() === 0) {
            dayElement.classList.add('disabled');
        } else {
            // Add click event for selectable days
            dayElement.addEventListener('click', () => {
                // Remove selected class from all days
                document.querySelectorAll('.calendar-day').forEach(day => {
                    day.classList.remove('selected');
                });
                
                // Add selected class to clicked day
                dayElement.classList.add('selected');
                
                // Enable time slots
                enableTimeSlots();
                
                // Update appointment date
                updateAppointmentDate(dayDate);
            });
        }
        
        calendarGrid.appendChild(dayElement);
    }
    
    container.appendChild(calendarGrid);
    
    // Month navigation
    const prevMonthBtn = container.querySelector('.month-prev');
    const nextMonthBtn = container.querySelector('.month-next');
    
    prevMonthBtn.addEventListener('click', () => {
        // Implement previous month navigation
        // This would update the calendar to show the previous month
        alert('Previous month navigation would be implemented here');
    });
    
    nextMonthBtn.addEventListener('click', () => {
        // Implement next month navigation
        // This would update the calendar to show the next month
        alert('Next month navigation would be implemented here');
    });
}

// Enable time slots after date selection
function enableTimeSlots() {
    const timeSlots = document.querySelectorAll('.time-slot');
    timeSlots.forEach(slot => {
        slot.disabled = false;
        
        slot.addEventListener('click', () => {
            // Remove selected class from all time slots
            timeSlots.forEach(s => {
                s.classList.remove('selected');
            });
            
            // Add selected class to clicked time slot
            slot.classList.add('selected');
            
            // Enable continue button
            const continueBtn = document.getElementById('step1Next');
            if (continueBtn) {
                continueBtn.disabled = false;
            }
            
            // Update appointment time
            updateAppointmentTime(slot.textContent);
        });
    });
}

// Update appointment date display
function updateAppointmentDate(date) {
    const appointmentDateTime = document.getElementById('appointmentDateTime');
    if (appointmentDateTime) {
        const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        });
        
        // Store date in data attribute
        appointmentDateTime.setAttribute('data-date', formattedDate);
        
        // Update display if time is already selected
        const timeSlot = document.querySelector('.time-slot.selected');
        if (timeSlot) {
            appointmentDateTime.textContent = `${formattedDate} at ${timeSlot.textContent}`;
        } else {
            appointmentDateTime.textContent = formattedDate;
        }
    }
}

// Update appointment time display
function updateAppointmentTime(time) {
    const appointmentDateTime = document.getElementById('appointmentDateTime');
    if (appointmentDateTime) {
        const date = appointmentDateTime.getAttribute('data-date');
        appointmentDateTime.textContent = `${date} at ${time}`;
    }
}

// Appointment booking process
document.addEventListener('DOMContentLoaded', () => {
    // Step navigation
    const step1Next = document.getElementById('step1Next');
    const step2Back = document.getElementById('step2Back');
    const step2Next = document.getElementById('step2Next');
    const step3Back = document.getElementById('step3Back');
    const confirmAppointment = document.getElementById('confirmAppointment');
    
    // Steps
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    const confirmation = document.getElementById('confirmation');
    
    // Progress steps
    const progressSteps = document.querySelectorAll('.progress-step');
    
    if (step1Next) {
        step1Next.addEventListener('click', () => {
            // Hide step 1, show step 2
            step1.classList.remove('active');
            step2.classList.add('active');
            
            // Update progress
            progressSteps[0].classList.add('completed');
            progressSteps[1].classList.add('active');
        });
    }
    
    if (step2Back) {
        step2Back.addEventListener('click', () => {
            // Hide step 2, show step 1
            step2.classList.remove('active');
            step1.classList.add('active');
            
            // Update progress
            progressSteps[1].classList.remove('active');
        });
    }
    
    if (step2Next) {
        step2Next.addEventListener('click', () => {
            // Validate form
            const form = document.getElementById('appointmentForm');
            if (form.checkValidity()) {
                // Hide step 2, show step 3
                step2.classList.remove('active');
                step3.classList.add('active');
                
                // Update progress
                progressSteps[1].classList.add('completed');
                progressSteps[2].classList.add('active');
                
                // Populate review information
                populateReviewInfo();
            } else {
                form.reportValidity();
            }
        });
    }
    
    if (step3Back) {
        step3Back.addEventListener('click', () => {
            // Hide step 3, show step 2
            step3.classList.remove('active');
            step2.classList.add('active');
            
            // Update progress
            progressSteps[2].classList.remove('active');
        });
    }
    
    if (confirmAppointment) {
        confirmAppointment.addEventListener('click', () => {
            // Hide step 3, show confirmation
            step3.classList.remove('active');
            confirmation.classList.add('active');
            
            // Update progress
            progressSteps[2].classList.add('completed');
            
            // Show confirmation email
            const email = document.getElementById('email').value;
            document.getElementById('confirmationEmail').textContent = email;
        });
    }
});

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