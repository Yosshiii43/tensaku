/* =================================
  * 資料ダウンロードページ（送信前と送信後の高さ合わせ）
  * ================================= */

document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.p-whitepaper-form__button');
  const formBox = document.querySelector('.p-whitepaper-contents__form');

  if (!button || !formBox) return;

  button.addEventListener('click', () => {
    const height = formBox.offsetHeight;
    sessionStorage.setItem('whitepaperFormHeight', height);
  });
});