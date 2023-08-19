const $scrollListItens = document.querySelectorAll('.scroll-list-item')
const $screenImgs = document.querySelectorAll('.screen')
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

$scrollListItens.forEach((item,idx)=> {
  item.addEventListener('mouseover', (e) => {
    if (!e.currentTarget.classList.contains('showing')) {
      document.querySelectorAll('.screen.showing').forEach(screen => {
        screen.classList.toggle('showing')
      })
      const attr = e.currentTarget.getAttribute('data-content')
      document.querySelector('.scroll-list-item.showing').classList.toggle('showing')
      document.querySelectorAll(`.screen[data-content="${attr}"]`).forEach(item => {
        item.classList.toggle('showing')
      })
      e.currentTarget.classList.toggle('showing')
      document.querySelector('.screen-title').textContent = texts[attr].title
      if(texts[attr].description){
        document.querySelector('.screen-description').textContent = texts[attr].description
      }
    }
  })
})