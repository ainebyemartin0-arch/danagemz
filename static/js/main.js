document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // 1. NAVBAR SHRINK ON SCROLL
    // =========================================
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

    // =========================================
    // 2. MOBILE MENU TOGGLE
    // =========================================
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            const isExpanded = mobileMenu.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
            document.body.classList.toggle('no-scroll', isExpanded);
        });
    }

    // =========================================
    // 3. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
    // =========================================
    const revealElements = document.querySelectorAll('[data-reveal]');
    if (revealElements.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Stop observing once visible
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        revealElements.forEach(el => observer.observe(el));
    }

    // =========================================
    // 4. ELITE BUTTON MICRO-INTERACTION (Ripple)
    // =========================================
    const rippleButtons = document.querySelectorAll('.btn-primary, .btn-whatsapp, .form-submit-btn, .nav-cta');
    rippleButtons.forEach(btn => {
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';

        btn.addEventListener('click', function(e) {
            const circle = document.createElement('span');
            const diameter = Math.max(this.clientWidth, this.clientHeight);
            const radius = diameter / 2;

            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - this.getBoundingClientRect().left - radius}px`;
            circle.style.top = `${e.clientY - this.getBoundingClientRect().top - radius}px`;
            circle.classList.add('ripple-effect');

            const existingRipple = this.getElementsByClassName('ripple-effect')[0];
            if (existingRipple) existingRipple.remove();

            this.appendChild(circle);
        });
    });

});
