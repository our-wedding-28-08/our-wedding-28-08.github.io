import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger.js";
import {ScrollToPlugin} from "gsap/ScrollToPlugin.js";
import LocomotiveScroll from "locomotive-scroll";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

window.locomotiveScroll = null;
window.hasLocomotiveScroll = false;

window.refreshScroll = function () {
  ScrollTrigger.refresh();

  window.locomotiveScroll.destroy();
  window.locomotiveScroll = new LocomotiveScroll();
  window.hasLocomotiveScroll = true;
};

export const Animate = async () => {
  const matchMedia = gsap.matchMedia();
  const breakPointDesktop = 1300;
  const breakPoint = 1000;

  matchMedia.add({
    isDesktop: `(min-width: ${breakPointDesktop}px) and (prefers-reduced-motion: no-preference)`,
    isLaptop: `(min-width: ${breakPoint}px) and (prefers-reduced-motion: no-preference)`,
    isMobile: `(max-width: ${breakPoint - 1}px)`,
  }, async (context) => {
    let {isDesktop, isLaptop, isMobile} = context.conditions;

    return () => {
      if (typeof setVH === `function`) {
        setVH();
      }

      ScrollTrigger.refresh(true);
    };
  });
};
