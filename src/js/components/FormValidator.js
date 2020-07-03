/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-restricted-syntax */
import { ERROR_MESSAGES } from '../constants/constants';

export default class FormValidator {
  static _checkInputValidity(input, error) {
    for (const key in ERROR_MESSAGES) {
      if (input.validity[key]) {
        return error.textContent = ERROR_MESSAGES[key];
      }
    }
    error.textContent = '';
  }

  static _setSubmitButtonState(form, button) {
    button.disabled = !form.checkValidity();

    if (form.checkValidity()) {
      button.classList.add('button_enabled');
    }

    if (!form.checkValidity()) {
      button.classList.remove('button_enabled');
    }
  }

  setEventListeners(popup) {
    const form = popup.querySelector('form');
    const button = form.querySelector('.button.button_popup');

    function validate(event) {
      FormValidator._checkInputValidity(event.target, event.target.closest('div').querySelector('.form__field-error'));
      FormValidator._setSubmitButtonState(form, button);
    }

    form.addEventListener('input', validate);
  }
}
