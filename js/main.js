document.addEventListener('DOMContentLoaded', function () {
  var year = document.getElementById('year');
  var nav = document.querySelector('.nav');
  var scrollContainer = document.querySelector('.scroll-container');
  var menuButton = document.querySelector('[data-menu-toggle]');
  var menu = document.querySelector('[data-nav-menu]');
  var menuLinks = document.querySelectorAll('[data-nav-link]');

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  function setExpanded(open) {
    if (!menuButton || !menu) {
      return;
    }

    menu.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
  }

  function getScrollTarget() {
    if (scrollContainer && scrollContainer.scrollHeight > scrollContainer.clientHeight) {
      return scrollContainer;
    }

    return window;
  }

  function updateNavScrollState() {
    var scrollTarget = getScrollTarget();
    var scrollY = scrollTarget === window ? window.scrollY : scrollTarget.scrollTop;
    if (nav) {
      nav.dataset.scrolled = scrollY > 16 ? 'true' : 'false';
    }
  }

  if (menuButton && menu) {
    menuButton.addEventListener('click', function () {
      setExpanded(!menu.classList.contains('open'));
    });

    menuLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        setExpanded(false);
      });
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768) {
        setExpanded(false);
      }
    });
  }

  getScrollTarget().addEventListener('scroll', updateNavScrollState, { passive: true });
  updateNavScrollState();
});
