// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Helper function to force a layout recalculation
    function forceReflow() {
        // Force a reflow by accessing offsetHeight
        document.body.offsetHeight;
        
        // Update scroll margins with extreme values for mobile
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            if (window.innerWidth <= 768) {
                section.style.scrollMarginTop = '160px';
                section.style.paddingTop = '90px';
            } else {
                section.style.scrollMarginTop = `${document.querySelector('header').offsetHeight + 20}px`;
                section.style.paddingTop = '';
            }
        });
    }
    
    // Run on page load
    window.addEventListener('load', forceReflow);
    
    // Run on resize
    window.addEventListener('resize', forceReflow);
    
    // Run after a short delay to ensure everything is rendered
    setTimeout(forceReflow, 500);
    
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
                    // Get current scroll position
                    const currentScroll = window.scrollY;
                    
                    // Handle scrolling based on device size
                    if (window.innerWidth <= 768) {
                        // On mobile, use fixed position values for better control
                        // This bypasses the dynamic calculation that might be causing issues
                        const sectionTop = targetElement.getBoundingClientRect().top + window.scrollY;
                        const fixedOffset = 160; // Fixed large offset for mobile
                        
                        window.scrollTo({
                            top: sectionTop - fixedOffset,
                            behavior: 'smooth'
                        });
                    } else {
                        // Desktop behavior remains the same
                        const headerHeight = document.querySelector('header').offsetHeight;
                        const additionalOffset = 20;
                        
                        window.scrollTo({
                            top: targetElement.offsetTop - headerHeight - additionalOffset,
                            behavior: 'smooth'
                        });
                    }
                }
                
                // Close the mobile menu after clicking a link
                if (window.innerWidth <= 768) {
                    mobileNav.classList.remove('active');
                    menuToggle.classList.remove('active');
                    
                    // Force recalculation after menu closes, with a delay to ensure animation completes
                    setTimeout(() => {
                        forceReflow();
                        
                        // Scroll again after a short delay to ensure correct position
                        setTimeout(() => {
                            if (window.innerWidth <= 768) {
                                const sectionTop = targetElement.getBoundingClientRect().top + window.scrollY;
                                window.scrollTo({
                                    top: sectionTop - 160,
                                    behavior: 'smooth'
                                });
                            }
                        }, 100);
                    }, 150);
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
            
            // Force reflow when menu is toggled to ensure proper positioning
            setTimeout(forceReflow, 50);
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