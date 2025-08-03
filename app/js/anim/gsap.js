import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger.js";
import {ScrollToPlugin} from "gsap/ScrollToPlugin.js";
import {MotionPathPlugin} from "gsap/MotionPathPlugin.js";
import LocomotiveScroll from "locomotive-scroll";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, MotionPathPlugin);

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

    if (isLaptop) {
      window.locomotiveScroll = new LocomotiveScroll();
      window.hasLocomotiveScroll = true;

      if (document.querySelector(`.section-header`)) {
        ScrollTrigger.create({
          trigger: `.section-header`,
          start: `top top`,
          endTrigger: `.main`,
          end: `bottom top`,
          pin: true,
        });

        gsap.to(`.section-title b:first-child`, {
          transformOrigin: `right`,
          xPercent: -80,
          scale: 1.5,
          color: `#e9e7e5`,
          scrollTrigger: {
            trigger: `.section-title`,
            start: `top 30%`,
            endTrigger: `.section-header`,
            end: `bottom top`,
            scrub: true,
          },
        });

        gsap.to(`.section-title b:last-child`, {
          transformOrigin: `left`,
          xPercent: 80,
          scale: 1.5,
          color: `#e9e7e5`,
          scrollTrigger: {
            trigger: `.section-title`,
            start: `top 30%`,
            endTrigger: `.section-header`,
            end: `bottom top`,
            scrub: true,
          },
        });

        gsap.to(`.section-title span`, {
          opacity: 0.3,
          scrollTrigger: {
            trigger: `.section-title`,
            start: `top 30%`,
            end: `top top`,
            scrub: true,
          },
        });

        gsap.to(`.section-header-city, .section-header-date`, {
          opacity: 0,
          scrollTrigger: {
            trigger: `.section-title`,
            start: `top 30%`,
            end: `top top`,
            scrub: true,
          },
        });
      }
    }

    return () => {
      if (typeof setVH === `function`) {
        setVH();
      }

      ScrollTrigger.refresh(true);
    };
  });
};
