// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Helper function to update scroll margins based on header height
    function updateScrollMargins() {
        const headerHeight = document.querySelector('header').offsetHeight;
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            // Use larger margin on mobile
            if (window.innerWidth <= 768) {
                section.style.scrollMarginTop = (headerHeight + 10) + 'px';
            } else {
                section.style.scrollMarginTop = (headerHeight + 10) + 'px';
            }
        });
    }
    
    // Update on resize
    window.addEventListener('resize', function() {
        updateScrollMargins();
    });
    
    // Initial update
    updateScrollMargins();
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply to links that start with #
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Get the height of the header
                    const headerHeight = document.querySelector('header').offsetHeight;
                    
                    // Add a small offset to ensure the section title is visible
                    // Use a larger offset for mobile due to the header height with the long name
                    const offset = window.innerWidth <= 768 ? 15 : 20;
                    
                    // Scroll to the target element
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight - offset,
                        behavior: 'smooth'
                    });
                }
                
                // Close the mobile menu after clicking a link
                if (window.innerWidth <= 768) {
                    const mobileNav = document.getElementById('mobileNav');
                    const menuToggle = document.getElementById('menuToggle');
                    
                    if (mobileNav && menuToggle) {
                        mobileNav.classList.remove('active');
                        menuToggle.classList.remove('active');
                    }
                }
            }
        });
    });
    
    // Mobile navigation toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    
    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });
    }
    
    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (name && email && subject && message) {
                // In a real implementation, you'd send this data to a server
                // For now, we'll just show a success message
                alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
                contactForm.reset();
            } else {
                alert('Por favor completa todos los campos del formulario.');
            }
        });
    }
    
    // Auto-update copyright year
    const yearSpan = document.querySelector('.footer-bottom');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.innerHTML = `<p>&copy; ${currentYear} Comunidad Compostera Urbana. Todos los derechos reservados.</p>`;
    }
});