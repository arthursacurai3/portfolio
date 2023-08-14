import Typed from "typed.js"

const $btnProfile = document.querySelector('.profile__btn')
const $profileContainer = document.querySelector('#profile')
$btnProfile.addEventListener('click', () => {
  $btnProfile.classList.toggle('closed')
  $profileContainer.classList.toggle('closed')
  document.body.classList.toggle('profile-closed')
})

const fullText1 = 'Olá! Prazer me chamo Arthur!'
const fullText2 = 'Sou Desenvolvedor Front End'
const $text1 = document.querySelector('#text1')
const $text2 = document.querySelector('#text2')

function typingAnimation() {
  $text1.setAttribute('data-transparent', 'false')
  $text1.textContent = fullText1[0]

  typingInterval1()
}
let i = 1
function typingInterval1(){
  const thisInterval1 = setInterval(()=> {
    $text1.textContent = $text1.textContent + fullText1[i]
    $text1.setAttribute('data-typing', 'ongoing')
    i++
    if(i === fullText1.length){
      i = 1
      clearInterval(thisInterval1)
      $text1.setAttribute('data-typing', 'finished')
      setTimeout(typingInterval2,3000)
    }
  }, 150)
}

function typingInterval2(){
  $text2.setAttribute('data-transparent', 'false')
  $text1.setAttribute('data-typing', 'false')
  $text2.setAttribute('data-typing', 'ongoing')
  $text2.textContent = fullText2[0]
  const thisInterval2 = setInterval(()=> {
    $text2.textContent = $text2.textContent + fullText2[i]
    i++
    if(i === fullText2.length){
      i = 1
      clearInterval(thisInterval2)
      $text2.setAttribute('data-typing', 'finished')
      setTimeout(()=> {
        $text2.setAttribute('data-typing', 'false')
      }, 5000)
    }
  }, 80)
}

setTimeout(typingAnimation, 1000)
