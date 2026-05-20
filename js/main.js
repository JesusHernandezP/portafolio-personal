document.addEventListener('DOMContentLoaded', function () {
  var year = document.getElementById('year');
  var nav = document.querySelector('.nav');
  var scrollContainer = document.querySelector('.scroll-container');
  var menuButton = document.querySelector('[data-menu-toggle]');
  var menu = document.querySelector('[data-nav-menu]');
  var menuLinks = document.querySelectorAll('[data-nav-link]');
  var anchorLinks = document.querySelectorAll('a[href^="#"]');

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

  function getHeaderOffset() {
    var header = document.querySelector('.site-header');
    return header ? Math.ceil(header.getBoundingClientRect().height + 12) : 0;
  }

  function scrollToHash(hash, smooth) {
    if (!hash || hash === '#') {
      return;
    }

    var target = document.querySelector(hash);
    if (!target) {
      return;
    }

    var targetTop = window.scrollY + target.getBoundingClientRect().top - getHeaderOffset();
    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: smooth ? 'smooth' : 'auto'
    });
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

  anchorLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      var href = link.getAttribute('href');
      if (!href || href.charAt(0) !== '#') {
        return;
      }

      var target = document.querySelector(href);
      if (!target) {
        return;
      }

      event.preventDefault();
      setExpanded(false);
      history.replaceState(null, '', href);
      scrollToHash(href, true);
    });
  });

  getScrollTarget().addEventListener('scroll', updateNavScrollState, { passive: true });
  updateNavScrollState();

  if (window.location.hash) {
    window.requestAnimationFrame(function () {
      scrollToHash(window.location.hash, false);
    });
  }
});
