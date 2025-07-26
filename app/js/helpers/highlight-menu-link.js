import {Util} from "../util.js";

const CURRENT_CLASS = `current`;

const highlightCurrentLink = (id) => {
  if (Util.body.querySelector(`[data-section]`).dataset.section === id) {
    if (Util.body.querySelector(`[data-section-link].${CURRENT_CLASS}`)) {
      Util.removeClass(Util.body.querySelector(`[data-section-link].${CURRENT_CLASS}`), CURRENT_CLASS);
    }

    document.querySelectorAll(`[data-section-link="${Util.body.querySelector(`[data-section]`).dataset.section}"]`).forEach((link) => {
      Util.addClass(link, CURRENT_CLASS);
    });
  }
};

export const HighlightMenu = () => {
  const links = [];
  document.querySelectorAll(`[data-section-link]`).forEach((link) => {
    links.push(link.dataset.sectionLink);
  });

  links.forEach((id) => {
    highlightCurrentLink(id);
  });
};
