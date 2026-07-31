document.addEventListener('DOMContentLoaded', () => {
    
    // 1. NAVBAR SHRINK ON SCROLL
    const navbar = document.getElementById('mainNavbar');
    if (navbar) {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // 2. MOBILE MENU TOGGLE
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // 3. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
    const revealElements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    
    revealElements.forEach(el => observer.observe(el));
});
