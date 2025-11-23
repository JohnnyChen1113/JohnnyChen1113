// ===== Navigation Functionality =====
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Run on page load

    // Navbar shadow on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // ===== Publication Filter Functionality =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const publications = document.querySelectorAll('.publication-item');
    const yearDividers = document.querySelectorAll('.year-divider');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                // Filter publications
                publications.forEach(pub => {
                    const tags = pub.getAttribute('data-tags') || '';
                    if (filter === 'all' || tags.includes(filter)) {
                        pub.classList.remove('hidden');
                    } else {
                        pub.classList.add('hidden');
                    }
                });

                // Update year dividers visibility
                updateYearDividers();
            });
        });
    }

    // Function to update year dividers based on visible publications
    function updateYearDividers() {
        yearDividers.forEach(divider => {
            const year = divider.getAttribute('data-year');
            // Find all publications in this year section
            let nextElement = divider.nextElementSibling;
            let hasVisiblePub = false;

            while (nextElement && !nextElement.classList.contains('year-divider')) {
                if (nextElement.classList.contains('publication-item') &&
                    !nextElement.classList.contains('hidden')) {
                    hasVisiblePub = true;
                    break;
                }
                nextElement = nextElement.nextElementSibling;
            }

            if (hasVisiblePub) {
                divider.classList.remove('hidden');
            } else {
                divider.classList.add('hidden');
            }
        });
    }
});
