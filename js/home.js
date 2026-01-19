/*************************************************************************
 * home.js  –  ver.1.0
 *************************************************************************/
//--------------------------------------------------------------------------
// heroより下までスクロールするとアニメーション付きで追従ヘッダーを出すコード
//--------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.p-header');
  const hero = document.querySelector('.p-hero');
  if (!header || !hero) return;

  // IntersectionObserverでhero監視
  const io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      header.classList.remove('p-header--sticky');
    } else {
      header.classList.add('p-header--sticky');
    }
  }, { root: null, threshold: 0 }); //画面(viewport)を基準にし、1pxでも見えていたら
  io.observe(hero);
});

//--------------------------------------------------------------------------
// LPの半分まで来た段階でポップアップを出すコード
//--------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const popup = document.querySelector('.p-popup');
  const closeBtn = document.querySelector('.js-popupClose');

  // popupがない or すでに閉じた記録がある場合は何もしない
  if (!popup || localStorage.getItem('popupClosed') === 'true'){
    return;
  }

  const documentHeight = document.documentElement.scrollHeight;
  const triggerHeight = documentHeight / 2;

  const onScroll = () => {
    const scrollY = window.pageYOffset;

    if (scrollY >= triggerHeight) {
      popup.classList.add('is-active');
      //一度表示したらスクロール監視を解除
      window.removeEventListener('scroll', onScroll);
    }
  };

  window.addEventListener('scroll', onScroll);
    
  // 閉じるボタン
  closeBtn.addEventListener('click', () => {
    popup.classList.remove('is-active');
    localStorage.setItem('popupClosed', 'true');
  });
});