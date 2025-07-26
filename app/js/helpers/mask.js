import IMask from "../vendors/imask";

const phone = document.querySelectorAll(`input[type="tel"]`);
const phoneMaskOptions = {
  mask: '+7 (000) 000 00 00',
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g,'');

    return dynamicMasked.compiledMasks.find(function (m) {
      return number.indexOf(m.startsWith) === 0;
    });
  }
};

export const Mask = () => {
  if (phone.length > 0) {
    phone.forEach((item) => {
      IMask(item, phoneMaskOptions);
    });
  }
};
