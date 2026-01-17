/******************************
 * main.js. – var.2.0
 ******************************/

//--------------------------------------------------------------------------
// ハンバーガーメニューとドロワー
//--------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('js-header');
  const button = document.getElementById('js-hamburger');
  const nav = document.getElementById('js-global-menu');
  const lead = nav.querySelector('.c-nav-menu__lead');

  const mq = window.matchMedia('(min-width: 1024px)');

  /**
   * メニューを開く
   */
  const openMenu = () => {
    header.classList.add('is-menu-open');
    button.setAttribute('aria-expanded', 'true');
    nav.removeAttribute('aria-hidden');
  };

  /**
   * メニューを閉じる
   */
  const closeMenu = () => {
    header.classList.remove('is-menu-open');
    button.setAttribute('aria-expanded', 'false');
    nav.setAttribute('aria-hidden', 'true');
  };

  /**
   * トグル
   */
  const toggleMenu = () => {
    const isOpen = header.classList.contains('is-menu-open');
    isOpen ? closeMenu() : openMenu();
  };

  /**
   * SP用：ボタンクリック
   */
  button.addEventListener('click', () => {
    if (mq.matches) return; // PCでは何もしない
    toggleMenu();
  });

  /**
   * PC/SP 切り替え時のリセット
   */
  const handleBreakpointChange = () => {
    if (mq.matches) {
      // PC：常時表示
      header.classList.remove('is-menu-open');
      button.removeAttribute('aria-expanded');
      nav.removeAttribute('aria-hidden');
    } else {
      // SP：初期は閉じる
      closeMenu();
    }
  };

  // 初期実行
  handleBreakpointChange();

  // ブレイクポイント変更監視
  mq.addEventListener('change', handleBreakpointChange);
});


//--------------------------------------------------------------------------
// スムーススクロール
//--------------------------------------------------------------------------

// ヘッダー情報
const header = document.querySelector(".p-header");
const headerHeight = header ? header.offsetHeight + 20: 0;

// ページ内のスムーススクロール
for (const link of document.querySelectorAll('a[href*="#"]')) {
  link.addEventListener('click', (e) => {
    const hash = e.currentTarget.hash;
    const target = document.getElementById(hash.slice(1));

    // ページトップへ("#"と"#top"）
    if (!hash || hash === '#top') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

    // アンカーへ
    } else if (target) {
      e.preventDefault();
      const position = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({
        top: position,
        behavior: "smooth",
      });

      // URLにハッシュを含める
      history.pushState(null, '', hash);
    }
  });
};

// 別ページ遷移後にスムーススクロール
const urlHash = window.location.hash;
if (urlHash) {
  const target = document.getElementById(urlHash.slice(1));
  if (target) {
    // ページトップから開始（ブラウザ差異を考慮して併用）
    history.replaceState(null, '', window.location.pathname);
    window.scrollTo(0, 0);

    window.addEventListener("load", () => {
      const position = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({
        top: position,
        behavior: "smooth",
      });

      // ハッシュを再設定
      history.replaceState(null, '', window.location.pathname + urlHash);
    });
  }
}


//--------------------------------------------------------------------------
// ご利用の流れ
//--------------------------------------------------------------------------
function setTriangleSize() {
  const items = document.querySelectorAll('.c-flow-list__item');

  items.forEach(item => {
    const halfTriangleHeight = item.offsetHeight / 2;
    const halfTriangleWidth = item.offsetWidth / 2;
    item.style.setProperty('--pc-triangle-height', `${halfTriangleHeight}px`);
    item.style.setProperty('--sp-triangle-half', `${halfTriangleWidth}px`);
  });
}

document.addEventListener('DOMContentLoaded', setTriangleSize);
window.addEventListener('resize', setTriangleSize);
