/* eslint-disable no-underscore-dangle */
export default class Menu {
  constructor(element) {
    this.element = element;
    const closeButton = this.element.querySelector('.header__close');
    closeButton.addEventListener('click', this._close.bind(this));
  }

  open() {
    this.element.classList.add('header_mobile');
    this.element.querySelector('.header__menu').classList.add('header__menu_is-opened');
    this.element.querySelector('.header__close').classList.add('header__close_is-opened');
    this.element.querySelector('.header__main').classList.add('header__main_mobile');
    this.element.querySelector('.header__saved').classList.add('header__saved_mobile');
    this.element.querySelector('.button').classList.add('button_mobile');
    this.element.closest('div').querySelector('.search').style.marginTop = 0;
    this.element.closest('div').querySelector('.page__overlay').classList.add('page__overlay_is-activated');
  }

  _close() {
    this.element.classList.remove('header_mobile');
    this.element.querySelector('.header__menu').classList.remove('header__menu_is-opened');
    this.element.querySelector('.header__close').classList.remove('header__close_is-opened');
    this.element.querySelector('.header__main').classList.remove('header__main_mobile');
    this.element.querySelector('.header__saved').classList.remove('header__saved_mobile');
    this.element.querySelector('.button').classList.remove('button_mobile');
    this.element.closest('div').querySelector('.search').style.marginTop = '-57px';
    this.element.closest('div').querySelector('.page__overlay').classList.remove('page__overlay_is-activated');
  }
}
