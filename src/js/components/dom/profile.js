const $btnProfile = document.querySelector('.profile__btn')
const $profileContainer = document.querySelector('#profile')
$btnProfile.addEventListener('click', () => {
  $btnProfile.classList.toggle('closed')
  $profileContainer.classList.toggle('closed')
  document.body.classList.toggle('profile-closed')
})

const fullText1 = 'Olá! Prazer me chamo Arthur!'
const fulltext2 = 'Desenvolvedor Front End'
const $text1 = document.querySelector('#text1')
const $text2 = document.querySelector('#text2')
let onGoingText1 = ''
function typingAnimation() {
  $text1.setAttribute('data-transparent', 'false')
  $text1.textContent = ''
  fullText1.length
  onGoingText1 += fullText1[i]
  let i = 0
  const text1Timer = setInterval(() => {
    console.log(onGoingText1)
    $text1.textContent = $text1.textContent + fullText1[i]
    i++
    if(i === fullText1.length){
      clearInterval(text1Timer)
    }
  }, 300)
}

setTimeout(typingAnimation, 1000)
