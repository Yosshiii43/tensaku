/********************************************************************************
 * swiper
 ********************************************************************************/

const mySwiper = new Swiper(".swiper", {
  slidesPerView: "auto", 
  spaceBetween: 24,
  loop: true, 
  loopAdditionalSlides: 6, // 無限ループさせる場合に複製するスライド数
  speed: 8000, 
  allowTouchMove: false,
  autoplay: {
    delay: 0, 
    disableOnInteraction: false,
  },

  breakpoints: {
    1024: {
      spaceBetween: 44,
    }
  },
});

/*
// スライドを複製して追加
const slides = document.querySelectorAll('.swiper-slide');

for ( let i = 0; i <= 1; i++){// 2回繰り返す
  slides.forEach((slide) => {
    const clone = slide.cloneNode(true);
    //複製分のaltを削除
    const cloneImage = clone.querySelector('img');
    cloneImage.removeAttribute('alt');
    // 複製したスライドをSwiperのコンテナに追加
    mySwiper.appendSlide(clone);
  });
}
*/
// Swiperを更新して新しいスライドを認識させる
//mySwiper.update();