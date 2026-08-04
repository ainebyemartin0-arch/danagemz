document.addEventListener('DOMContentLoaded', () => {

    // 1. NAVBAR SHRINK & MOBILE MENU
    const navbar = document.getElementById('mainNavbar');
    if (navbar) {
        const handleScroll = () => {
            if (window.scrollY > 50) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // 2. SCROLL REVEAL ANIMATIONS
    const revealElements = document.querySelectorAll('[data-reveal]');
    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('is-visible');
                    }, index * 50); 
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        revealElements.forEach(el => observer.observe(el));
    }

    // 3. 3D TILT EFFECT ON PRODUCT CARDS
    const tiltCards = document.querySelectorAll('.product-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // 4. MATERIAL RIPPLE EFFECT ON BUTTONS
    const rippleButtons = document.querySelectorAll('.btn-primary, .btn-whatsapp, .nav-cta');
    rippleButtons.forEach(btn => {
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

    // 5. TOAST NOTIFICATION SYSTEM
    if (!document.getElementById('toastContainer')) {
        const toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }

    window.showToast = function(message) {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerText = message;
        container.appendChild(toast);
        void toast.offsetWidth; 
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    };
});
