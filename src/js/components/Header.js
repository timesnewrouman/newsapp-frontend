export default class Header {
  constructor(headerSaved, headerLogout, headerButtonText) {
    this.headerSaved = headerSaved;
    this.headerLogout = headerLogout;
    this.headerButtonText = headerButtonText;
  }

  render(name) {
    this.headerButtonText.textContent = name;
    this.headerLogout.classList.add('header__logout_logged-in');
    this.headerSaved.classList.add('header__saved_logged-in');
  }

  logout() {
    this.headerButtonText.textContent = 'Авторизоваться';
    this.headerLogout.classList.remove('header__logout_logged-in');
    this.headerSaved.classList.remove('header__saved_logged-in');
    window.location.href = 'https://newsapp.gq'; // stable вариант
  }
}
