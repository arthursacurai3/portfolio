import { camera, loadSocialCards, orbitControls } from "../canvas"

const $btnPlay = document.querySelector('.btn-play')
const $btnClose = document.querySelector('.btn-close')
const $timeLine = document.querySelector('.timeline')
const $main = document.querySelector('main')

$btnPlay.addEventListener('click', () => {
   document.body.classList.add('playing', 'profile-closed', 'timeline-closed')
   $btnPlay.classList.add('displayNone')
   setTimeout(() => {
      $main.classList.add('displayNone')
      $btnClose.classList.remove('displayNone')
   }, 1500)
})

$btnClose.addEventListener('click', () => {
   document.body.classList.remove('playing', 'profile-closed', 'timeline-closed')
   $btnClose.classList.add('displayNone')
   setTimeout(() => {
      orbitControls.enable = false
      camera.position.set(0, 5, 15)
      camera.lookAt(0, 6.5, 0)
      $main.classList.remove('displayNone')
      $btnPlay.classList.remove('displayNone')
   }, 1500)
})

// window.onload = () => {
//    document.body.classList.add('playing', 'profile-closed')
//    $btnPlay.classList.add('displayNone')
//    $main.classList.add('displayNone')
//    $btnClose.classList.remove('displayNone')
// }
