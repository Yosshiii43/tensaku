/******************************
 * Swiper
 ******************************/

const swiper = new Swiper('.swiper', {
  // Optional parameters
  loop: true,
  loopAdditionalSlides: 1,
  slidesPerView: 'auto',
  spaceBetween: 26,
  speed: 1000,

  autoplay: { // 自動再生させる
    delay: 4000, // 次のスライドに切り替わるまでの時間（ミリ秒）
    disableOnInteraction: false, // ユーザーが操作しても自動再生を止めない
  },

  grabCursor: true, // PCでマウスカーソルを「掴む」マークにする
  watchSlidesProgress: true, // スライドの進行状況を監視する
  centeredSlides: true, //アクティブなスライドが中央に来るようにする

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true, // クリックによるスライド切り替えを有効にする
    type: 'bullets'
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});