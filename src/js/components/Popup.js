export default class Popup {
  constructor(element) {
    this.element = element;
    const closeButton = this.element.querySelector('.popup__close');
    this.close = this.close.bind(this);
    closeButton.addEventListener('click', this.close);
  }

  open() {
    this.element.parentElement.classList.add('popup_is-opened');
    this.element.classList.add('popup_is-opened');
  }

  close() {
    this.element.parentElement.classList.remove('popup_is-opened');
    this.element.classList.remove('popup_is-opened');
  }

  transfer(event) {
    event.target.parentElement.parentElement.parentElement.classList.remove('popup_is-opened');
    this.element.classList.add('popup_is-opened');
  }

  success() {
    this.element.parentElement.querySelector('.popup__signup').classList.remove('popup_is-opened');
    this.element.classList.add('popup_is-opened');
  }
}
