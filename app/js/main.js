import {Modal} from "./helpers/modal.js";
import {Util} from "./util.js";

const init = async () => {
  // animate
  if (!document.querySelector(`.main`).classList.contains(`main--map`)) {
    const {Animate} = await import(/* webpackChunkName: "anim" */ "./anim/gsap.js");
    await Animate();
  }
};

init().then(async () => {
  window.scrollTo(0, 0);
  Util.addClass(Util.body, `load`);
});
