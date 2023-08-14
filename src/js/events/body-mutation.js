const elemToObserve = document.body;
export let profileClosed = false
const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.attributeName == "class") {
      const currentClassState = mutation.target.classList.contains('profile-closed');
      if (currentClassState)
        profileClosed = true
      else{
        profileClosed = false
      }
    }
  });
});
observer.observe(elemToObserve, { attributes: true });