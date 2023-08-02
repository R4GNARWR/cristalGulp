const mainSliderContentText = document.querySelector('.main-slider__content .text');
const mainSliderContentBtnText = document.querySelector('.main-slider__content .btn');
const architectureSliderContentLabel = document.querySelector('.main-architecture__slider-content .label');
const architectureSliderContentText = document.querySelector('.main-architecture__slider-content .text');
const secontTypeSliders = document.querySelectorAll('.secondTypeSlider');

const mainSwiper = new Swiper('.main-swiper', {
  // Optional parameters
  loop: true,
  
  
  breakpoints:
  {
    0:
    {
      navigation: {
        nextEl: '.main-slider__navigation-next-mob',
        prevEl: '.main-slider__navigation-prev-mob',
      },
      pagination: {
        el: '.main-slider__pagination-mob',
      },
    },
    991:
    {
      navigation: {
        nextEl: '.main-slider__navigation-next',
        prevEl: '.main-slider__navigation-prev',
      },
      pagination: {
        el: '.main-slider__pagination',
      },
    }
  }
  
});

mainSwiper.on('slideChange', () => {
  
  const activeSlide = mainSwiper.slides[mainSwiper.activeIndex];
  const activeSlideText = activeSlide.dataset.text;
  const activeSlideBtnText = activeSlide.dataset.btnText;
  
  if (mainSliderContentText && activeSlideText)
  {
    mainSliderContentText.innerHTML = activeSlideText;
  }
  if (mainSliderContentBtnText && activeSlideBtnText)
  {
    mainSliderContentBtnText.text = activeSlideBtnText;
  }
  
})

secontTypeSliders.forEach(slider => {
  const sliderName = slider.getAttribute('id');
  
  const sliderContentLabel = document.querySelector('.'+ sliderName + '-content .label');
  const sliderContentText = document.querySelector('.'+ sliderName + '-content .text');
  const swiper = new Swiper(slider, {
    loop: true,
    effect: 'fade',
    pagination: {
      el: '.'+ sliderName + '-slider__pagination',
    },
    
    // Navigation arrows
    navigation: {
      nextEl: '.'+ sliderName +'-slider__navigation-next',
      prevEl: '.'+ sliderName +'-slider__navigation-prev',
    },
    
  });
  
  swiper.on('slideChange', () => {
    
    const activeSlide = swiper.slides[swiper.activeIndex];
    const activeSlideLabel = activeSlide.dataset.label;
    const activeSlideText = activeSlide.dataset.text;
    
    if (sliderContentLabel && activeSlideText)
    {
      sliderContentLabel.innerHTML = activeSlideLabel;
    }
    if (sliderContentText && activeSlideText)
    {
      sliderContentText.innerHTML = activeSlideText;
    }
    
  })
});



const architectureSwiper = new Swiper('.main-architecture__slider', {
  // Optional parameters
  loop: true,
  
  // If we need pagination
  pagination: {
    el: '.main-architecture__pagination',
  },
  
  // Navigation arrows
  navigation: {
    nextEl: '.main-architecture__navigation-next',
    prevEl: '.main-architecture__navigation-prev',
  },
  
});

architectureSwiper.on('slideChange', () => {
  
  const activeSlide = architectureSwiper.slides[architectureSwiper.activeIndex];
  const activeSlideLabel = activeSlide.dataset.text;
  const activeSlideText = activeSlide.dataset.btnText;
  
  if (architectureSliderContentLabel && activeSlideText)
  {
    architectureSliderContentLabel.innerHTML = activeSlideLabel;
  }
  if (architectureSliderContentText && activeSlideText)
  {
    architectureSliderContentText.innerHTML = activeSlideText;
  }
  
})

const panoSlider = new Swiper('.main-architecture__pano-slider', {
  // Optional parameters
  loop: true,
  
  
  // Navigation arrows
  navigation: {
    nextEl: '.architecture-pano__navigation-next',
    prevEl: '.architecture-pano__navigation-prev',
  },
  
});