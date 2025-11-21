// ===== Tab Functionality =====
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to clicked button and corresponding panel
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

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
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Animation on scroll (simple fade-in effect)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.project-card, .publication-item, .tool-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
});

// ===== Utility Functions =====

// Function to add new publication (for future use)
function addPublication(year, title, authors, venue, links) {
    const publicationsList = document.querySelector('.publications-list');
    const pubItem = document.createElement('div');
    pubItem.className = 'publication-item';

    let linksHtml = '';
    if (links) {
        if (links.pdf) linksHtml += `<a href="${links.pdf}" class="pub-link"><i class="fas fa-file-pdf"></i> PDF</a>`;
        if (links.doi) linksHtml += `<a href="${links.doi}" class="pub-link"><i class="fas fa-link"></i> DOI</a>`;
        if (links.code) linksHtml += `<a href="${links.code}" class="pub-link"><i class="fab fa-github"></i> Code</a>`;
    }

    pubItem.innerHTML = `
        <div class="pub-year">${year}</div>
        <div class="pub-content">
            <h4 class="pub-title">${title}</h4>
            <p class="pub-authors">${authors}</p>
            <p class="pub-venue">${venue}</p>
            <div class="pub-links">${linksHtml}</div>
        </div>
    `;

    // Remove placeholder note if exists
    const placeholder = publicationsList.querySelector('.placeholder-note');
    if (placeholder) placeholder.remove();

    publicationsList.appendChild(pubItem);
}

// Function to add new project (for future use)
function addProject(icon, title, description, tags, links) {
    const projectsGrid = document.querySelector('.projects-grid');
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';

    const tagsHtml = tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    let linksHtml = '';
    if (links) {
        if (links.github) linksHtml += `<a href="${links.github}" class="project-link"><i class="fab fa-github"></i></a>`;
        if (links.demo) linksHtml += `<a href="${links.demo}" class="project-link"><i class="fas fa-external-link-alt"></i></a>`;
    }

    projectCard.innerHTML = `
        <div class="project-icon">
            <i class="${icon}"></i>
        </div>
        <h4 class="project-title">${title}</h4>
        <p class="project-desc">${description}</p>
        <div class="project-tags">${tagsHtml}</div>
        <div class="project-links">${linksHtml}</div>
    `;

    // Remove placeholder note if exists
    const placeholder = projectsGrid.querySelector('.placeholder-note');
    if (placeholder) placeholder.remove();

    projectsGrid.appendChild(projectCard);
}

// Console welcome message
console.log('%cWelcome to Johnny Chen\'s Portfolio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cFeel free to explore the code.', 'color: #94a3b8; font-size: 14px;');
