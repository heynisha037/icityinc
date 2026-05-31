(function () {
    var header = document.querySelector('.site-header');
    if (!header) return;

    document.body.classList.add('site-has-nav');

    var toggle = header.querySelector('.site-nav__toggle');
    var panel = header.querySelector('.site-nav__panel');
    var panelLinks = header.querySelectorAll('.site-nav__link--panel');
    var desktopLinks = header.querySelectorAll('.site-nav__links .site-nav__link');
    var allLinks = header.querySelectorAll('.site-nav__link');

    var currentPage = window.location.pathname.split('/').pop() || 'overview.html';
    if (currentPage === '' || currentPage === 'index.html') {
        currentPage = 'overview.html';
    }

    allLinks.forEach(function (link) {
        var href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('is-active');
        }
    });

    function closeMenu() {
        if (!toggle || !panel) return;
        toggle.setAttribute('aria-expanded', 'false');
        panel.classList.remove('is-open');
        document.body.classList.remove('site-nav-open');
    }

    function openMenu() {
        if (!toggle || !panel) return;
        toggle.setAttribute('aria-expanded', 'true');
        panel.classList.add('is-open');
        document.body.classList.add('site-nav-open');
    }

    if (toggle && panel) {
        toggle.addEventListener('click', function () {
            var expanded = toggle.getAttribute('aria-expanded') === 'true';
            if (expanded) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        panelLinks.forEach(function (link) {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                closeMenu();
            }
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth >= 768) {
                closeMenu();
            }
        });
    }
})();
