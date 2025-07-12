import {Util} from "../util.js";
import LocomotiveScroll from "locomotive-scroll";

export class Modal {
  constructor(element) {
    this._element = element ? element : null;
    this._elementModal = null;
    this._elementOverlay = null;
    this._elementLastFocus = null;
    this._opened = false;
    this._id = null;
  }

  init() {
    this._element.addEventListener(`click`, this._clickOpenButtonHandler.bind(this));
    this._id = this._element.dataset.modalOpen;
  }

  openModal() {
    this._elementModal = document.querySelector(`[data-modal="${this._element.dataset.modalOpen}"]`);
    this._elementOverlay = this._elementModal.parentNode;
    this._elementLastFocus = document.activeElement;

    this._elementModal.setAttribute(`tabindex`, `0`);
    this._elementModal.setAttribute(`aria-hidden`, `false`);
    this._elementModal.focus();
    this._elementModal.querySelectorAll(`[tabindex="-1"]`)
      .forEach((element) => {
        element.setAttribute(`tabindex`, `0`);
      });

    modals.forEach((modal) => {
      if (this._id !== modal._id && modal._opened) {
        modal.closeModal();
      }
    });

    let timeout = 0;

    if (document.querySelector(`[data-opener].open`)) {
      document.querySelectorAll(`[data-opener].open`).forEach((elem) => {
        Util.removeClass(elem, Util.ACTIVE_CLASS);
        Util.removeClass(Util.body, `open-nav`);
      });

      timeout = 500;
    }

    setTimeout(() => {
      if (Util.hasClass(this._element, Util.ACTIVE_CLASS)) {
        this.closeModal();
        this._opened = false;
      } else {
        Util.addClass(Util.body, `modal-open`);

        if (Util.hasClass(this._elementModal, `modal--center`)) {
          Util.addClass(Util.body, `modal-center`);
        }

        Util.addClass(this._element, Util.ACTIVE_CLASS);
        Util.addClass(this._elementModal, Util.ACTIVE_CLASS);
        Util.addClass(this._elementOverlay, Util.ACTIVE_CLASS);

        this._opened = true;

        document.querySelectorAll(`[data-modal-close="${this._element.dataset.modalOpen}"]`)
          .forEach((element) => {
            element.addEventListener(`click`, this._clickCloseButtonHandler.bind(this));
          });

        document.addEventListener(`focus`, this._focusModalHandler.bind(this), true);
        document.addEventListener(`keydown`, this._pressKeydownHandler.bind(this));
        this._elementOverlay.addEventListener(`click`, this._clickOverlayHandler.bind(this));

        if (this._elementModal.querySelector(`input`) && window.matchMedia(`(min-width: 900px)`).matches) {
          this._elementModal.querySelector(`input`).focus();
        }

        if (window.hasLocomotiveScroll) {
          window.locomotiveScroll.destroy();
          window.locomotiveScroll = null;
        }
      }
    }, timeout);
  }

  closeModal() {
    this._elementModal.setAttribute(`tabindex`, `-1`);
    this._elementModal.setAttribute(`aria-hidden`, `true`);
    this._elementModal.querySelectorAll(`[tabindex="0"]`)
      .forEach((element) => {
        element.setAttribute(`tabindex`, `-1`);
      });

    Util.removeClass(Util.body, `modal-open`);

    if (Util.hasClass(this._elementModal, `modal--center`)) {
      Util.removeClass(Util.body, `modal-center`);
    }

    Util.removeClass(this._element, Util.ACTIVE_CLASS);
    Util.removeClass(this._elementModal, Util.ACTIVE_CLASS);
    Util.removeClass(this._elementOverlay, Util.ACTIVE_CLASS);

    this._opened = false;

    document.querySelectorAll(`[data-modal-close="${this._element.dataset.modalOpen}"]`)
      .forEach((element) => {
        element.removeEventListener(`click`, this._clickCloseButtonHandler.bind(this));
      });

    document.removeEventListener(`focus`, this._focusModalHandler.bind(this));
    document.removeEventListener(`keydown`, this._pressKeydownHandler.bind(this));
    this._elementOverlay.removeEventListener(`click`, this._clickOverlayHandler.bind(this));

    this._elementLastFocus.focus();

    if (window.hasLocomotiveScroll && !window.locomotiveScroll) {
      window.locomotiveScroll = new LocomotiveScroll();
    }
  }

  _clickOpenButtonHandler(e) {
    e.preventDefault();
    this.openModal();
  }

  _clickCloseButtonHandler() {
    this.closeModal();
  }

  _clickOverlayHandler(e) {
    if (e.target === this._elementModal.parentNode) {
      this.closeModal();
    }
  }

  _focusModalHandler(e) {
    if (Util.hasClass(this._elementModal, Util.ACTIVE_CLASS) && !this._elementModal.contains(e.target)) {
      e.stopPropagation();
      this._elementModal.focus();
    }
  }

  _pressKeydownHandler(e) {
    if (e.keyCode === Util.ESC_KEY) {
      this.closeModal();
    }
  }
}
