/******************************
 * main.js. – var.2.0
 ******************************/

/** ハンバーガーメニュー制御 **/

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
      button.setAttribute('aria-expanded', 'false');
      nav.removeAttribute('aria-hidden');
      lead?.setAttribute('aria-hidden', 'true');
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