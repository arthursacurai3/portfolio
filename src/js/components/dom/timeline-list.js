const $scrollListItens = document.querySelectorAll('.scroll-list-item')
const $screenImgs = document.querySelectorAll('.screen')

$scrollListItens.forEach((item,idx)=> {
  item.addEventListener('mouseover', (e) => {
    if (!e.currentTarget.classList.contains('showing')) {
      document.querySelectorAll('.screen.showing').forEach(screen => {
        screen.classList.toggle('showing')
      })
      document.querySelector('.scroll-list-item.showing').classList.toggle('showing')
      document.querySelectorAll(`.screen[data-content="${e.currentTarget.getAttribute('data-content')}"]`).forEach(item => {
        item.classList.toggle('showing')
      })
      e.currentTarget.classList.toggle('showing')
    }
  })
})