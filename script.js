// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animate elements when they come into view
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all program cards
document.querySelectorAll('.program-card').forEach(card => {
    observer.observe(card);
});

// Add floating animation to decorative elements
function createFloatingElement() {
    const element = document.createElement('div');
    element.className = 'floating-element';
    element.style.left = Math.random() * 100 + 'vw';
    element.style.animationDuration = (Math.random() * 3 + 2) + 's';
    document.querySelector('.hero-section').appendChild(element);
    
    setTimeout(() => {
        element.remove();
    }, 5000);
}

// Create floating elements periodically
setInterval(createFloatingElement, 2000);

document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const modal = document.getElementById('enrollmentModal');
    const enrollBtn = document.getElementById('enrollButton');
    const closeBtn = document.querySelector('.close-modal');
    const cancelBtn = document.querySelector('.cancel-btn');
    const enrollmentForm = document.getElementById('enrollmentForm');

    // Open modal
    enrollBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    // Close modal functions
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }

    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Handle form submission
    enrollmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Here you would typically:
        // 1. Collect all form data
        // 2. Validate the data
        // 3. Send to server
        // 4. Show success message
        
        alert('Enrollment form submitted successfully!');
        closeModal();
    });

    // File upload preview (optional)
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            const fileName = e.target.files[0]?.name;
            if (fileName) {
                // Show file name or preview
                const label = input.previousElementSibling;
                label.textContent = `${label.textContent.split(':')[0]}: ${fileName}`;
            }
        });
    });
});

// Add interactive hover effects to program cards
document.querySelectorAll('.program-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        e.target.style.transform = 'scale(1.05) translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', (e) => {
        e.target.style.transform = 'scale(1) translateY(0)';
    });
});

// Simple form validation for contact form (if added)
function validateForm(event) {
    // Add your form validation logic here
} 