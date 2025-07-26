export const Util = {
  ESC_KEY: 27,
  ACTIVE_CLASS: `open`,
  body: document.querySelector(`body`),

  ready: (fn) => {
    if (document.readyState !== `loading`) {
      fn();
    } else {
      document.addEventListener(`DOMContentLoaded`, fn);
    }
  },

  addClass: (el, className) => {
    el.classList.add(className);
  },

  removeClass: (el, className) => {
    el.classList.remove(className);
  },

  hasClass: (el, className) => {
    return el.classList.contains(className);
  },

  throttle: (func, ms) => {
    let isThrottled = false;
    let savedArgs;
    let savedThis;

    function wrapper() {
      if (isThrottled) {
        savedArgs = arguments;
        savedThis = this;
        return;
      }

      func.apply(this, arguments);

      isThrottled = true;

      setTimeout(function() {
        isThrottled = false;
        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs);
          savedArgs = savedThis = null;
        }
      }, ms);
    }

    return wrapper;
  },

  isInViewport: (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },
};
