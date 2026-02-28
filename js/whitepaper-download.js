/* =================================
  * 資料ダウンロードページ（送信前と送信後の高さ合わせ）
  * ================================= */

document.addEventListener('DOMContentLoaded', () => {
  const savedHeight = sessionStorage.getItem('whitepaperFormHeight');
  const formBox = document.querySelector('.p-whitepaper-contents__form');

  if (!savedHeight || !formBox) return;

  formBox.style.minHeight = savedHeight + 'px';

  sessionStorage.removeItem('whitepaperFormHeight');
});