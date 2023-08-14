const $btnProfile = document.querySelector('.profile__btn')
const $profileContainer = document.querySelector('#profile')
$btnProfile.addEventListener('click', ()=> {
  $btnProfile.classList.toggle('closed')
  $profileContainer.classList.toggle('closed')
  document.body.classList.toggle('profile-closed')
})