// Toggle functionality for the day cards
function toggleDay(dayNumber) {
    const card = document.querySelector(`.day-card[data-day="${dayNumber}"]`);
    const content = document.getElementById(`day-${dayNumber}-content`);
    if (!card || !content) return; // Exit if elements don't exist (e.g., on sub-pages)

    const chevron = card.querySelector('.chevron');

    // Toggle active class on card
    card.classList.toggle('active');

    if (card.classList.contains('active')) {
        // Expand
        content.style.maxHeight = content.scrollHeight + "px";
        if (chevron) chevron.style.transform = "rotate(180deg)";

        // After transition, set to none to allow dynamic resizing
        setTimeout(() => {
            if (card.classList.contains('active')) {
                content.style.maxHeight = "none";
            }
        }, 300);
    } else {
        // Collapse
        content.style.maxHeight = content.scrollHeight + "px"; // Briefly set to hard pixel value
        // Force reflow
        void content.offsetWidth;
        content.style.maxHeight = "0";
        if (chevron) chevron.style.transform = "rotate(0deg)";
    }
}

// Toggle functionality for checking off tasks
function toggleTask(element) {
    if (!element) return;
    element.classList.toggle('completed');

    // If we are inside an active card, we might need to adjust height
    const parentContent = element.closest('.day-content');
    if (parentContent && parentContent.style.maxHeight !== "0px" && parentContent.style.maxHeight !== "none") {
        parentContent.style.maxHeight = "none";
    }
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Add subtle entrance animations based on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in, .slide-up').forEach((el) => {
        observer.observe(el);
    });

    // Dashboard-specific initialization
    const isDashboard = document.querySelector('.itinerary');
    if (isDashboard) {
        // Open Day 1 and Day 2 by default
        toggleDay(1);

        setTimeout(() => {
            toggleDay(2);
        }, 100);
    }
});
