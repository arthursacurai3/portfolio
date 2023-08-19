import { setupPhysWorld } from "../canvas";

const elemToObserve = document.body;
export let playing = false
const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.attributeName == "class") {
      const currentClassState = mutation.target.classList.contains('playing');
      if (currentClassState) {
        playing = true
        setupPhysWorld()
      }
      else {
        playing = false
      }
    }
  });
});
observer.observe(elemToObserve, { attributes: true });