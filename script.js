// ===== Navigation Functionality =====
document.addEventListener('DOMContentLoaded', function () {
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
        anchor.addEventListener('click', function (e) {
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

    // ===== Publication Filtering =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const pubItems = document.querySelectorAll('.publication-item');
    const pubList = document.querySelector('.publications-list');

    if (filterBtns.length > 0 && pubItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                // Filter items
                pubItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.classList.remove('hidden');
                    } else {
                        const tags = item.getAttribute('data-tags');
                        if (tags) {
                            const tagList = tags.split(' ');
                            if (tagList.includes(filterValue)) {
                                item.classList.remove('hidden');
                            } else {
                                item.classList.add('hidden');
                            }
                        } else {
                            item.classList.add('hidden');
                        }
                    }
                });

                // Handle Year Dividers visibility
                updateYearDividers();
            });
        });
    }

    function updateYearDividers() {
        if (!pubList) return;

        const children = Array.from(pubList.children);
        let currentDivider = null;
        let visibleCount = 0;

        children.forEach((child, index) => {
            if (child.classList.contains('year-divider')) {
                // Process previous divider
                if (currentDivider) {
                    if (visibleCount === 0) {
                        currentDivider.classList.add('hidden');
                    } else {
                        currentDivider.classList.remove('hidden');
                    }
                }

                // Start new group
                currentDivider = child;
                visibleCount = 0;
            } else if (child.classList.contains('publication-item')) {
                if (!child.classList.contains('hidden')) {
                    visibleCount++;
                }
            }
        });

        // Process last divider
        if (currentDivider) {
            if (visibleCount === 0) {
                currentDivider.classList.add('hidden');
            } else {
                currentDivider.classList.remove('hidden');
            }
        }
    }
});
