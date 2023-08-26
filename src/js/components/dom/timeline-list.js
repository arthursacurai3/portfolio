// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const texts = {
  'maria-filo-concept-card': {
    title: 'Maria Filó - Componente da Home',
    description: 'Um dos novos componentes da nova identidade visual do site -  desktop e mobile'
  },
  'under-control': {
    title: 'Under Control',
    description: 'Aplicativo que criei para estudo de react'
  },
  'cris-barros-galeria-pdp': {
    title: 'Galeria de fotos na página de produto',
    description: 'Otimização da responsividade da galeria'
  }
}

console.log(window.screen.availWidth)

if(window.screen.availWidth > 767){
  const swiperDesk = new Swiper('.timeline__scroll-list-container .swiper', {
    modules: [Navigation],
    direction: 'vertical',
    slidesPerView: 6,
    spaceBetween: 0,
    centeredSlides: true,
    loop: true,
    loopedSlides: 5,
    grabCursor: true,
    mousewheelControl: false,
    mousewheel: false,
    scrollbar: {
      el: '. swiper-scrollbar',
    },
    parallax: true,
  })
  
  window.addEventListener('wheel', function (e) {
    console.log(e)
    if(!e.target.classList.contains('swiper-slide')) return;
    if (e.deltaY > 0) {
      // down
      swiperDesk.slideNext()
    } else {
      // UP
      swiperDesk.slidePrev()
    }
  })
  
  swiperDesk.on('transitionEnd',()=> {
    const activeContent = document.querySelector('.swiper-slide-active').getAttribute('data-content')
    document.querySelectorAll('.screen-container.showing').forEach(img => {
      img.classList.remove('showing')
    })
    document.querySelectorAll(`.screen-container[data-content="${activeContent}"]`).forEach(img => {
      img.classList.add('showing')
    })
    document.querySelector('.screen-title').textContent = texts[activeContent].title
    if(texts[activeContent].description){
      document.querySelector('.screen-description').textContent = texts[activeContent].description
    }
  })
} else {
  initSwiperMob()

  const swiperMob = new Swiper('.timeline__screens-container.swiper', {
    modules: [Navigation],
    direction: 'horizontal',
    slidesPerView: 1,
    loop: true,
  })

  swiperMob.on('transitionEnd',()=> {
    document.querySelectorAll('.screen-container.showing').forEach(img => {
      img.classList.remove('showing')
    })
    const activeContent = document.querySelector('.swiper-slide-active').getAttribute('data-content')
    document.querySelector(`.screen-container[data-content="${activeContent}"]`).classList.add('showing')
    document.querySelector('.screen-title').textContent = texts[activeContent].title
    if(texts[activeContent].description){
      document.querySelector('.screen-description').textContent = texts[activeContent].description
    }
  })
}

function initSwiperMob(){
  document.querySelector('.timeline__screens-container').classList.add('swiper')
  document.querySelector('.screens-wrapper').classList.add('swiper-wrapper')
  document.querySelectorAll('.screen-container').forEach(screen => {
    screen.classList.add('swiper-slide')
  })
}

const $imgContainer = document.querySelector('.screens-wrapper')
const $imgZoomContainer = document.querySelector('.zoom-full')
const $btnCloseZoom = $imgZoomContainer.querySelector('.btn-close')

$imgContainer.addEventListener('click', (e) => {
  console.log(e)
  if(e.target.classList.contains('screen')){
    const src = e.target.currentSrc.split('/')
    $imgZoomContainer.setAttribute('style', `background: url('/assets/${src[src.length - 1]}'), rgba(0,0,0,0.9); background-repeat: no-repeat; background-size: contain; background-position: center;`)
    $imgZoomContainer.classList.remove('displayNone')
  }
})

$btnCloseZoom.addEventListener('click', () => {
  $imgZoomContainer.classList.add('displayNone')
})
