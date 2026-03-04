/*************************************************************************
 * contact-thanks.js  –  ver.1.0
 *************************************************************************/

document.addEventListener('DOMContentLoaded', () => {

/* ---------------------------------
/* 画面サイズの変更に応じて、親要素の高さを子要素の下端位置に合わせる
/* --------------------------------- */
  (() => {
  const parent = document.querySelector('.p-contact-thanks__inner');
  const child  = document.querySelector('.p-contact-thanks__message');

  const ro = new ResizeObserver(() => {
    const parentRect = parent.getBoundingClientRect();
    const childRect  = child.getBoundingClientRect();

    // 親の上端から見た child の「下端」位置
    const bottom = childRect.bottom - parentRect.top;

    parent.style.height = `${bottom + 60}px`;
  });

  ro.observe(child);

  })();

});