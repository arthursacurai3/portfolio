const $scrollList = document.querySelector('.scroll-list')
const $screen = document.querySelector('div.screen')

$scrollList.addEventListener('mouseover', (e)=> {
  console.log({target: e.target, currentTarget: e.currentTarget})
  if(e.target.className === 'scroll-list-item' ){
    console.log('here')
    const img = e.target.getAttribute('data-img')
    $screen.setAttribute('src', `./assets/${img}.png`)
  }
})