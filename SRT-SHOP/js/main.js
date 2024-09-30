document.addEventListener('DOMContentLoaded', () => {
    // Apparition fluide des textes et sections
    const fadeInText = document.querySelectorAll('.fade-text, .slide-text, .dynamic-text');
    const observerOptions = { threshold: 0.1 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    fadeInText.forEach(text => observer.observe(text));

    // Gestion de la navigation sticky
    const navbar = document.getElementById('navbar');
    const searchBar = document.getElementById('search-bar');
    let searchBarAdded = false;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Ajouter la barre de recherche dans la navigation
        if (window.scrollY > searchBar.offsetTop + searchBar.offsetHeight) {
            if (!searchBarAdded) {
                const clonedSearchBar = searchBar.cloneNode(true);
                clonedSearchBar.id = "navbar-search-bar";
                navbar.querySelector('.nav-links').insertAdjacentElement('beforebegin', clonedSearchBar);
                searchBarAdded = true;
            }
        } else {
            const navbarSearchBar = document.getElementById('navbar-search-bar');
            if (navbarSearchBar) {
                navbarSearchBar.remove();
                searchBarAdded = false;
            }
        }
    });

    // Menu déroulant
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', () => {
            const menu = dropdown.querySelector('.dropdown-menu');
            menu.style.display = 'flex';
            setTimeout(() => menu.style.opacity = '1', 50); // Animation de fondu en entrée
        });

        dropdown.addEventListener('mouseleave', () => {
            const menu = dropdown.querySelector('.dropdown-menu');
            menu.style.opacity = '0';
            setTimeout(() => menu.style.display = 'none', 200); // Animation de fondu en sortie
        });
    });

    // Gestion du carrousel automatique
    const carouselItems = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;

    function showSlide(index) {
        carouselItems.forEach((item, i) => {
            item.style.transform = `translateX(${100 * (i - index)}%)`;
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Carousel Auto-scroll
    function autoScroll() {
        setInterval(() => {
            currentIndex = (currentIndex + 1) % carouselItems.length;
            showSlide(currentIndex);
        }, 4000);
    }

    // Initial slide display
    showSlide(currentIndex);
    autoScroll();

    // Témoignages: apparition fluide
    const testimonials = document.querySelectorAll('.testimonial');
    testimonials.forEach((testimonial, index) => {
        setTimeout(() => {
            testimonial.classList.add('visible');
        }, index * 200);
    });

    // Ajout de transitions pour la recherche
    const searchInputs = document.querySelectorAll('.search-bar input');
    searchInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.transition = 'width 0.5s ease';
        });
    });
});
