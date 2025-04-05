// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Gallery load more functionality
    const loadMoreButton = document.getElementById('loadMoreGallery');
    if (loadMoreButton) {
        // Initial set of additional gallery items (hidden by default)
        const additionalItems = [
            {
                src: 'images/gallery/gallery9.jpg',
                alt: 'Taller de agricultura regenerativa',
                caption: 'Taller de agricultura regenerativa'
            },
            {
                src: 'images/gallery/gallery10.jpg',
                alt: 'Voluntarios trabajando en la finca',
                caption: 'Voluntarios trabajando en la finca'
            },
            {
                src: 'images/gallery/gallery11.jpg',
                alt: 'Visita escolar a la compostera',
                caption: 'Visita escolar a la compostera'
            },
            {
                src: 'images/gallery/gallery12.jpg',
                alt: 'Producción de semillas criollas',
                caption: 'Producción de semillas criollas'
            }
        ];
        
        // Create elements but keep them hidden initially
        let itemsAdded = false;
        
        loadMoreButton.addEventListener('click', function() {
            if (!itemsAdded) {
                const galleryGrid = document.querySelector('.gallery-grid');
                
                additionalItems.forEach(item => {
                    const galleryItem = document.createElement('div');
                    galleryItem.className = 'gallery-item';
                    galleryItem.style.opacity = '0';
                    galleryItem.style.transform = 'translateY(20px)';
                    galleryItem.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    
                    const img = document.createElement('img');
                    img.src = item.src;
                    img.alt = item.alt;
                    
                    const caption = document.createElement('div');
                    caption.className = 'gallery-caption';
                    caption.textContent = item.caption;
                    
                    galleryItem.appendChild(img);
                    galleryItem.appendChild(caption);
                    galleryGrid.appendChild(galleryItem);
                    
                    // Trigger reflow for animation
                    setTimeout(() => {
                        galleryItem.style.opacity = '1';
                        galleryItem.style.transform = 'translateY(0)';
                    }, 50);
                });
                
                // Change button text
                this.textContent = 'Ver menos';
                itemsAdded = true;
            } else {
                // Remove the additional items if shown
                const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item');
                const itemsToRemove = Array.from(galleryItems).slice(-additionalItems.length);
                
                itemsToRemove.forEach(item => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    // Remove after animation completes
                    setTimeout(() => {
                        item.remove();
                    }, 500);
                });
                
                // Change button text back
                this.textContent = 'Ver más fotos';
                itemsAdded = false;
            }
        });
    }
    // Add scroll to top functionality when clicking the site name
    const siteName = document.querySelector('header h1');
    if (siteName) {
        siteName.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Add pointer cursor to indicate it's clickable
        siteName.style.cursor = 'pointer';
    }
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
                    // Use a simpler approach relying on the browser's native scrolling behavior
                    // along with CSS's margin-top for sections
                    
                    // Scroll to the element with a small adjustment
                    window.scrollTo({
                        // Just use the element's position without complex calculations
                        top: targetElement.offsetTop - 5,
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