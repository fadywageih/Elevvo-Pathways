
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const themeIcon = themeToggle.querySelector('i');
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (savedTheme) {
    htmlElement.className = savedTheme;
    updateIcon(savedTheme);
} else if (systemPrefersDark) {
    htmlElement.className = 'dark';
    updateIcon('dark');
}
themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.className;
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.className = newTheme;
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
});
function updateIcon(theme) {
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
mobileMenuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.style.display = 'none';
        }
    });
});
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
    } else {
        navLinks.style.display = 'none';
    }
});