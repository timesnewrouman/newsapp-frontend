function setDisabledSignup(form) {
  form.elements.email.setAttribute('disabled', true);
  form.elements.password.setAttribute('disabled', true);
  form.elements.name.setAttribute('disabled', true);
  form.querySelector('.button.button_popup').classList.remove('button_enabled');
}

function unsetDisabledSignup(form) {
  form.elements.email.removeAttribute('disabled');
  form.elements.password.removeAttribute('disabled');
  form.elements.name.removeAttribute('disabled');
}

function setDisabledLogin(form) {
  form.elements.email.setAttribute('disabled', true);
  form.elements.password.setAttribute('disabled', true);
  form.querySelector('.button.button_popup').classList.remove('button_enabled');
}

function unsetDisabledLogin(form) {
  form.elements.email.removeAttribute('disabled');
  form.elements.password.removeAttribute('disabled');
}

export {
  setDisabledSignup, unsetDisabledSignup, setDisabledLogin, unsetDisabledLogin,
};
