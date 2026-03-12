// 1. Initialize Icons (Essential for Lucide)
lucide.createIcons();

// 2. Preloader "Off-Switch"
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        // Short delay for a smoother visual transition
        setTimeout(() => {
            loader.classList.add('loader-hidden');
        }, 600);
    }
});

// 3. Cursor Glow Movement
const glow = document.getElementById('cursorGlow');
if (glow) {
    document.addEventListener('mousemove', (e) => {
        window.requestAnimationFrame(() => {
            glow.style.left = `${e.clientX}px`;
            glow.style.top = `${e.clientY}px`;
        });
    });
}

// 4. Navbar Dynamic Styling
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (nav) {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(5, 5, 5, 0.85)';
            nav.style.backdropFilter = 'blur(12px)';
            nav.style.padding = '0.8rem 0';
        } else {
            nav.style.background = 'transparent';
            nav.style.backdropFilter = 'none';
            nav.style.padding = '1.5rem 0';
        }
    }
});

// 5. Scroll-Reveal Animation (The Intersection Observer Method)
// This is much smoother and more efficient than the standard 'scroll' listener
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// 6. Contact Form Logic
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const submitBtn = document.getElementById('submitBtn');
    const toast = document.getElementById('toast');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Disable button to prevent double-clicks
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending...</span>`;
        
        // Simulate an API call
        setTimeout(() => {
            submitBtn.innerHTML = `<span>Sent!</span>`;
            toast.classList.remove('hidden');
            contactForm.reset();
            
            // Revert button after success
            setTimeout(() => {
                toast.classList.add('hidden');
                submitBtn.disabled = false;
                submitBtn.innerHTML = `<span>Send Message</span> <i data-lucide="send" size="18"></i>`;
                lucide.createIcons(); // Re-render the icon
            }, 4000);
        }, 1500);
    });
}

// 7. Footer Year (Added a check in case you remove it from some pages)
const yearSpan = document.getElementById('currentYear');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}