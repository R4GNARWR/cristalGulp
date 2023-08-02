const swiperAlike = new Swiper('.flats-detail__alike-swiper', {
  navigation: {
    nextEl: '.flats-detail__alike-swiper-next',
    prevEl: '.flats-detail__alike-swiper-prev',
  },

  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20
    },
    991: {
      slidesPerView: 4,
      spaceBetween: 30
    },
    1400: {
      slidesPerView: 5,
      spaceBetween: 57,
    }
  }
});

const swiperViews = new Swiper('.swiper-flat-views', {
  slidesPerView: 1,
  navigation: {
    nextEl: '.swiper-flat-views__next',
    prevEl: '.swiper-flat-views__prev',
  },
  pagination: {
    el: '.swiper-flat-views__pagination',
  },
});