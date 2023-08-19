import { camera, loadSocialCards, orbitControls, resetWorld } from "../canvas"

const $btnPlay = document.querySelector('.btn-play')
const $btnClose = document.querySelector('.btn-close')
const $textUnderConstruction = document.querySelector('.text-under-construction')
const $timeLine = document.querySelector('.timeline')
const $main = document.querySelector('main')

$btnPlay.addEventListener('click', () => {
   document.body.classList.add('playing', 'profile-closed', 'timeline-closed')
   $btnPlay.classList.add('displayNone')
   setTimeout(() => {
      $main.classList.add('displayNone')
      $btnClose.classList.remove('displayNone')
      $textUnderConstruction.classList.remove('displayNone')
   }, 1500)
})

$btnClose.addEventListener('click', () => {
   document.body.classList.remove('playing', 'profile-closed', 'timeline-closed')
   $btnClose.classList.add('displayNone')
   $textUnderConstruction.classList.add('displayNone')
   setTimeout(() => {
     location.reload() 
   }, 1500)
})

// window.onload = () => {
//    document.body.classList.add('playing', 'profile-closed')
//    $btnPlay.classList.add('displayNone')
//    $main.classList.add('displayNone')
//    $btnClose.classList.remove('displayNone')
// }
