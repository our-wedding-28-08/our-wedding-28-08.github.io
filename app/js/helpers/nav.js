const ACTIVE_CLASS = `active`;
const CURRENT_CLASS = `current`;

function selectCategory() {
  const container = document.querySelector(`.nav-category`);
  const opener = document.querySelector(`.nav-category__opener`);
  const buttons = container.querySelectorAll(`.nav-category__btn`);

  buttons.forEach((button) => {
    button.addEventListener(`click`, function() {
      opener.querySelector(`span`).textContent = this.textContent.trim();

      if (container.querySelector(`.nav-category__btn.${ACTIVE_CLASS}`)) {
        container.querySelector(`.nav-category__btn.${ACTIVE_CLASS}`).classList.remove(ACTIVE_CLASS);
      }

      this.classList.add(ACTIVE_CLASS);
      opener.click();
    });
  });
}

function showCategoryNav() {
  function linkFocusHandler (e) {
    if (window.matchMedia(`(max-width: 1299px`).matches) {
      e.preventDefault();
    }

    if (container.querySelector(`[data-category-link].${CURRENT_CLASS}`)) {
      container.querySelector(`[data-category-link].${CURRENT_CLASS}`).classList.remove(CURRENT_CLASS);
      container.querySelector(`[data-category].${CURRENT_CLASS}`).classList.remove(CURRENT_CLASS);
    }

    this.classList.add(CURRENT_CLASS);
    container.querySelector(`[data-category="${this.dataset.categoryLink}"]`).classList.add(CURRENT_CLASS);
  }

  const container = document.querySelector(`.nav-catalog`);
  const links = container.querySelectorAll(`[data-category-link]`);

  links.forEach((link) => {
    link.addEventListener(`mouseenter`, linkFocusHandler);
    link.addEventListener(`focus`, linkFocusHandler);
    link.addEventListener(`click`, linkFocusHandler);
  });
}

export const Nav = () => {
  selectCategory();
  showCategoryNav();
};
