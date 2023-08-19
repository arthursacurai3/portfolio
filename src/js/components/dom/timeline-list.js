const $scrollListItens = document.querySelectorAll('.scroll-list-item')
const $screenImgs = document.querySelectorAll('.screen')

$scrollListItens.forEach((item,idx)=> {
  item.addEventListener('mouseover', (e) => {
    if (!e.currentTarget.classList.contains('showing')) {
      
      document.querySelector('.screen.showing').classList.toggle('showing')
      document.querySelector('.scroll-list-item.showing').classList.toggle('showing')
      $screenImgs[idx].classList.toggle('showing')
      // document.querySelector(`.screnn[data-content="${e.currentTarget.getAttribute('data-content')}"]`).classList.toggle('showing')
      e.currentTarget.classList.toggle('showing')
    }
  })
})