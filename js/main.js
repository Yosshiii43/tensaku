/******************************
 * main.js – var.3.0
 ******************************/

document.addEventListener('DOMContentLoaded', () => {

  /* =================================
   * ハンバーガー & ドロワー
   * ================================= */
  const header = document.getElementById('js-header');
  const button = document.getElementById('js-hamburger');
  const nav = document.getElementById('js-global-menu');
  const mq = window.matchMedia('(min-width: 1024px)');

  const focusableSelector =
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

  const getFocusableElements = () =>
    Array.from(nav.querySelectorAll(focusableSelector));

  const openMenu = () => {
    header.classList.add('is-menu-open');
    button.setAttribute('aria-expanded', 'true');
    nav.removeAttribute('aria-hidden');
    nav.removeAttribute('inert');

    getFocusableElements()[0]?.focus();
  };

  const closeMenu = ({ returnFocus = false } = {}) => {
    header.classList.remove('is-menu-open');
    button.setAttribute('aria-expanded', 'false');
    nav.setAttribute('aria-hidden', 'true');
    nav.setAttribute('inert', '');

    if (returnFocus) button.focus();
  };

  const isMenuOpen = () =>
    button.getAttribute('aria-expanded') === 'true';

  /* --- ハンバーガー操作 --- */
  button.addEventListener('click', () => {
    if (mq.matches) return;
    isMenuOpen() ? closeMenu({ returnFocus: true }) : openMenu();
  });

  /* --- Escで閉じる --- */
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (mq.matches) return;
    if (!isMenuOpen()) return;

    e.preventDefault();
    closeMenu({ returnFocus: true });
  });

  /* --- フォーカストラップ --- */
  nav.addEventListener('keydown', e => {
    if (mq.matches || e.key !== 'Tab') return;

    const focusables = getFocusableElements();
    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables.at(-1);

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  /* --- SP：リンククリックで閉じる --- */
  nav.addEventListener('click', e => {
    if (mq.matches) return;
    if (!e.target.closest('a')) return;
    closeMenu();
  });

  /* --- PC/SP切替 --- */
  const handleBreakpointChange = () => {
    if (mq.matches) {
      header.classList.remove('is-menu-open');
      button.setAttribute('aria-expanded', 'false');
      nav.removeAttribute('aria-hidden');
      nav.removeAttribute('inert');
    } else {
      closeMenu();
    }
  };

  handleBreakpointChange();
  mq.addEventListener('change', handleBreakpointChange);

  /* =================================
   * スムーススクロール
   * ================================= */
  const siteHeader = document.querySelector('.p-header');
  const headerHeight = siteHeader ? siteHeader.offsetHeight + 20 : 0;

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const hash = link.hash;
      const target = document.getElementById(hash.slice(1));

      if (!hash || hash === '#top') {
        e.preventDefault();
        if (!mq.matches) closeMenu();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (!target) return;

      e.preventDefault();
      if (!mq.matches) closeMenu();

      const y =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;

      window.scrollTo({ top: y, behavior: 'smooth' });
      history.pushState(null, '', hash);

      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

  /* --- 別ページ遷移時 --- */
  const urlHash = window.location.hash;
  if (urlHash) {
    const target = document.getElementById(urlHash.slice(1));
    if (!target) return;

    history.replaceState(null, '', location.pathname);
    window.scrollTo(0, 0);

    window.addEventListener('load', () => {
      const y =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;

      window.scrollTo({ top: y, behavior: 'smooth' });
      history.replaceState(null, '', location.pathname + urlHash);

      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  }
});