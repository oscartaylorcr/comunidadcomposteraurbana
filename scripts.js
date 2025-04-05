// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Handle window resize for correct header height calculation
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Update scroll-margin-top based on current header height
            const headerHeight = document.querySelector('header').offsetHeight;
            document.querySelectorAll('section').forEach(section => {
                section.style.scrollMarginTop = (headerHeight + 20) + 'px';
            });
        }, 250);
    });
    
    // Set initial scroll-margin-top based on header height
    const headerHeight = document.querySelector('header').offsetHeight;
    document.querySelectorAll('section').forEach(section => {
        section.style.scrollMarginTop = (headerHeight + 20) + 'px';
    });
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
                    // Offset for fixed header
                    const headerHeight = document.querySelector('header').offsetHeight;
                    
                    // Add additional padding to ensure the section title is clearly visible
                    const additionalOffset = 20; // 20px additional padding
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight - additionalOffset,
                        behavior: 'smooth'
                    });
                }
                
                // Close the mobile menu after clicking a link
                if (window.innerWidth <= 768) {
                    mobileNav.classList.remove('active');
                    menuToggle.classList.remove('active');
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
    
    // Animate elements when they come into view (for future enhancement)
    
    // Handle data table sorting (for future enhancement)
    
    // Auto-update copyright year
    const yearSpan = document.querySelector('.footer-bottom');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.innerHTML = `<p>&copy; ${currentYear} Comunidad Compostera Urbana. Todos los derechos reservados.</p>`;
    }
});