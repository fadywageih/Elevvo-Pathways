document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggleBtn');
    const mobileToggleBtn = document.getElementById('mobileToggleBtn');
    const mainContent = document.getElementById('mainContent');
    const navLinks = document.querySelectorAll('.nav-link');
    function initSidebar() {
        const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
        const isMobile = window.innerWidth <= 992;
        if (isMobile) {
            sidebar.classList.remove('collapsed', 'open');
            mainContent.style.marginLeft = '0';
        } else {
            if (isCollapsed) {
                sidebar.classList.add('collapsed');
                mainContent.style.marginLeft = `${getComputedStyle(document.documentElement)
                    .getPropertyValue('--sidebar-collapsed-width')}`;
            } else {
                sidebar.classList.remove('collapsed');
                mainContent.style.marginLeft = `${getComputedStyle(document.documentElement)
                    .getPropertyValue('--sidebar-width')}`;
            }
            sidebar.setAttribute('aria-expanded', !isCollapsed);
        }
    }
    function toggleSidebar() {
        const isCollapsed = sidebar.classList.toggle('collapsed');

        if (isCollapsed) {
            mainContent.style.marginLeft = `${getComputedStyle(document.documentElement)
                .getPropertyValue('--sidebar-collapsed-width')}`;
            localStorage.setItem('sidebarCollapsed', 'true');
        } else {
            mainContent.style.marginLeft = `${getComputedStyle(document.documentElement)
                .getPropertyValue('--sidebar-width')}`;
            localStorage.setItem('sidebarCollapsed', 'false');
        }

        sidebar.setAttribute('aria-expanded', !isCollapsed);
        toggleBtn.setAttribute('aria-label',
            isCollapsed ? 'Expand sidebar' : 'Collapse sidebar');
    }
    function toggleMobileSidebar() {
        sidebar.classList.toggle('open');
        const isOpen = sidebar.classList.contains('open');
        if (isOpen) {
            sidebar.setAttribute('aria-expanded', 'true');
            trapFocus(sidebar);
        } else {
            sidebar.setAttribute('aria-expanded', 'false');
            mobileToggleBtn.focus();
        }
    }
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        if (firstFocusable) firstFocusable.focus();
        element.addEventListener('keydown', function (e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        lastFocusable.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        firstFocusable.focus();
                        e.preventDefault();
                    }
                }
            }
            if (e.key === 'Escape') {
                toggleMobileSidebar();
            }
        });
    }
    function handleResize() {
        const isMobile = window.innerWidth <= 992;
        if (isMobile) {
            sidebar.classList.remove('collapsed', 'open');
            mainContent.style.marginLeft = '0';
        } else {
            const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
            if (isCollapsed) {
                sidebar.classList.add('collapsed');
                mainContent.style.marginLeft = `${getComputedStyle(document.documentElement)
                    .getPropertyValue('--sidebar-collapsed-width')}`;
            } else {
                sidebar.classList.remove('collapsed');
                mainContent.style.marginLeft = `${getComputedStyle(document.documentElement)
                    .getPropertyValue('--sidebar-width')}`;
            }
            sidebar.classList.remove('open');
        }
    }
    document.addEventListener('click', function (event) {
        const isMobile = window.innerWidth <= 992;
        const isSidebarOpen = sidebar.classList.contains('open');
        if (isMobile && isSidebarOpen &&
            !sidebar.contains(event.target) &&
            event.target !== mobileToggleBtn) {
            toggleMobileSidebar();
        }
    });
    initSidebar();
    toggleBtn.addEventListener('click', toggleSidebar);
    mobileToggleBtn.addEventListener('click', toggleMobileSidebar);
    window.addEventListener('resize', handleResize);
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navLinks.forEach(l => l.removeAttribute('aria-current'));
            this.setAttribute('aria-current', 'page');
            if (window.innerWidth <= 992) {
                toggleMobileSidebar();
            }
        });
    });
});