/*************************************************************************
 * home.js  –  ver.1.0
 *************************************************************************/

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------
   * 追従ヘッダー
   * --------------------------------- */
  (() => {
    const header = document.querySelector('.p-header');
    const hero = document.querySelector('.p-hero');
    if (!header || !hero) return;

   const io = new IntersectionObserver(([entry]) => {
      header.classList.toggle(
        'p-header--sticky',
        !entry.isIntersecting
      );
    });

    io.observe(hero);
  })();


  /* ---------------------------------
   * LP 半分でポップアップ
   * --------------------------------- */
  (() => {
    const popup = document.querySelector('.p-popup');
    const closeBtn = document.querySelector('.js-popupClose');
    if (!popup || localStorage.getItem('popupClosed') === 'true') return;

    const triggerHeight = document.documentElement.scrollHeight / 2;

    const onScroll = () => {
      if (window.scrollY >= triggerHeight) {
        popup.classList.add('is-active');
        window.removeEventListener('scroll', onScroll);
      }
    };

    window.addEventListener('scroll', onScroll);

    closeBtn?.addEventListener('click', () => {
      popup.classList.remove('is-active');
      localStorage.setItem('popupClosed', 'true');
    });
  })();


  /* ---------------------------------
   * ご利用の流れ（三角形サイズ）
   * --------------------------------- */
  (() => {
    const setTriangleSize = () => {
      document.querySelectorAll('.c-flow-list__item').forEach(item => {
        item.style.setProperty('--pc-triangle-height', `${item.offsetHeight / 2}px`);
        item.style.setProperty('--sp-triangle-half', `${item.offsetWidth / 2}px`);
      });
    };

    setTriangleSize();
    window.addEventListener('resize', setTriangleSize);
  })();

  
  /* ---------------------------------
   * FAQ タブ
   * --------------------------------- */
  (() => {
    const tabMenus = document.querySelectorAll('.js-tabMenu');
    const tabContents = document.querySelectorAll('.js-tabContent');
    if (!tabMenus.length) return;

    tabMenus.forEach(menu => {
      menu.addEventListener('click', e => {
        const targetId = e.currentTarget.getAttribute('aria-controls');
        const targetContent = document.getElementById(targetId);

        tabMenus.forEach(btn => {
          const active = btn === e.currentTarget;
          btn.classList.toggle('is-active', active);
          btn.setAttribute('aria-selected', active);
        });

        tabContents.forEach(panel => {
          const active = panel === targetContent;
          panel.classList.toggle('is-active', active);
          panel.hidden = !active;

          if (!active) {
            panel.querySelectorAll('details[open]')
              .forEach(d => d.removeAttribute('open'));
          }
        });
      });
    });
  })();


  /* ---------------------------------
   * トップへ戻るボタン
   * --------------------------------- */
  (() => {
    const topButton = document.getElementById('js-scrollPageTop');
    const hero = document.querySelector('.p-hero');
    if (!topButton || !hero) return;

    const toggle = show => {
      topButton.classList.toggle('is-fadein', show);
      topButton.tabIndex = show ? 0 : -1;
      topButton.setAttribute('aria-hidden', String(!show));
    };

    toggle(false);

    const io = new IntersectionObserver(([entry]) => {
      toggle(!entry.isIntersecting);
    });

    io.observe(hero);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    topButton.addEventListener('click', scrollToTop);
    topButton.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        scrollToTop();
      }
    });
  })();


});