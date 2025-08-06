document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeSelector = document.getElementById('theme-selector');
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme') || 'default';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Apply the saved theme
    applyTheme(savedTheme, prefersDark);
    themeSelector.value = savedTheme;
    
    // Toggle between dark and light (default) themes
    themeToggle.addEventListener('click', () => {
        const currentTheme = localStorage.getItem('theme') || 'default';
        const isDark = document.documentElement.classList.contains('dark');
        
        if (currentTheme === 'default') {
            // If default, switch to dark
            applyTheme('dark');
            localStorage.setItem('theme', 'dark');
        } else if (currentTheme === 'dark') {
            // If dark, switch to default
            applyTheme('default');
            localStorage.setItem('theme', 'default');
        } else {
            // For custom themes, just toggle dark class
            document.documentElement.classList.toggle('dark');
        }
        
        // Update selector
        themeSelector.value = document.documentElement.classList.contains('dark') ? 'dark' : 'default';
    });
    
    // Handle theme selector changes
    themeSelector.addEventListener('change', (e) => {
        applyTheme(e.target.value, prefersDark);
        localStorage.setItem('theme', e.target.value);
    });
    
    function applyTheme(theme, prefersDark = false) {
        // Remove all theme classes first
        document.documentElement.className = '';
        
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else if (theme === 'default') {
            // Let the prefers-color-scheme media query handle it
            if (prefersDark) {
                document.documentElement.classList.add('dark');
            }
        } else {
            document.documentElement.classList.add(`theme-${theme}`);
            // For nature theme, we might want dark text on light background
            if (theme === 'nature') {
                document.documentElement.classList.remove('dark');
            }
        }
    }
});