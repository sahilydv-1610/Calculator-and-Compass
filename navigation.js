// Handle navigation between sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = {
        calculator: document.getElementById('calculator-section'),
        compass: document.getElementById('compass-section'),
        converter: document.getElementById('converter-section'),
        history: document.getElementById('history-section')
    };
    
    // Desktop navigation
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show corresponding section
            const target = button.dataset.target;
            Object.values(sections).forEach(section => section.classList.add('hidden'));
            sections[target].classList.remove('hidden');
            
            // Also update mobile navigation
            document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.target === target) {
                    btn.classList.add('active');
                }
            });
        });
    });
    
    // Mobile navigation
    const mobileNavButtons = document.querySelectorAll('.mobile-nav-btn');
    mobileNavButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            mobileNavButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show corresponding section
            const target = button.dataset.target;
            Object.values(sections).forEach(section => section.classList.add('hidden'));
            sections[target].classList.remove('hidden');
            
            // Also update desktop navigation
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.target === target) {
                    btn.classList.add('active');
                }
            });
        });
    });
    
    // Show history from calculator
    document.getElementById('show-history').addEventListener('click', () => {
        // Update active state
        navButtons.forEach(btn => btn.classList.remove('active'));
        document.getElementById('nav-history').classList.add('active');
        
        mobileNavButtons.forEach(btn => btn.classList.remove('active'));
        document.getElementById('mobile-history').classList.add('active');
        
        // Show history section
        Object.values(sections).forEach(section => section.classList.add('hidden'));
        sections.history.classList.remove('hidden');
    });
});