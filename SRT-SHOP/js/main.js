document.addEventListener('DOMContentLoaded', () => {
    // Apparition fluide des textes
    const fadeInText = document.querySelectorAll('.fade-text, .slide-text');
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    fadeInText.forEach(text => {
        observer.observe(text);
    });

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
                clonedSearchBar.querySelector('input').style.width = "30%"; // Redimensionnement
                navbar.insertBefore(clonedSearchBar, document.querySelector('.nav-links'));
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

    // Menu Overlay
    const menuToggle = document.querySelector('.menu-toggle');
    const menuOverlay = document.getElementById('menu-overlay');

    menuToggle.addEventListener('click', () => {
        menuOverlay.classList.toggle('open');
    });

    menuOverlay.addEventListener('click', (event) => {
        if (event.target === menuOverlay) {
            menuOverlay.classList.remove('open');
        }
    });

    // Animation des sous-menus
    const categoryLinks = document.querySelectorAll('.category');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const category = event.target.getAttribute('data-category');
            const submenu = document.getElementById(`brands-${category}`);

            if (submenu) {
                submenu.classList.toggle('visible');
            }
        });
    });

    // Carrousel automatique et manuel
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    let isManualScrolling = false;
    let autoScrollTimeout;

    function showSlide(index) {
        carouselItems.forEach((item, i) => {
            item.style.transform = `translateX(${100 * (i - index)}%)`;
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function autoScroll() {
        autoScrollTimeout = setInterval(() => {
            if (!isManualScrolling) {
                currentIndex = (currentIndex + 1) % carouselItems.length;
                showSlide(currentIndex);
            }
        }, 3000);
    }

    function stopAutoScroll() {
        clearInterval(autoScrollTimeout);
        isManualScrolling = true;
    }

    function startAutoScroll() {
        isManualScrolling = false;
        autoScroll();
    }

    document.querySelector('.carousel-control.prev').addEventListener('click', () => {
        stopAutoScroll();
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        showSlide(currentIndex);
        setTimeout(startAutoScroll, 5000); // Reprendre l'auto-scroll après 5 secondes
    });

    document.querySelector('.carousel-control.next').addEventListener('click', () => {
        stopAutoScroll();
        currentIndex = (currentIndex + 1) % carouselItems.length;
        showSlide(currentIndex);
        setTimeout(startAutoScroll, 5000); // Reprendre l'auto-scroll après 5 secondes
    });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            stopAutoScroll();
            currentIndex = i;
            showSlide(currentIndex);
            setTimeout(startAutoScroll, 5000); // Reprendre l'auto-scroll après 5 secondes
        });
    });

    autoScroll();

});