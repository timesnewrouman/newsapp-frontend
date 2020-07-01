/* eslint-disable consistent-return */
import '../index.css';
import Popup from './components/Popup';
import Menu from './components/Menu';
import FormValidator from './components/FormValidator';
import MainApi from './api/MainApi';
import NewsApi from './api/NewsApi';
import NewsCard from './components/NewsCard';
import NewsCardList from './components/NewsCardList';
import Header from './components/Header';
import DateHandler from './utils/DateHandler';
import { serverUrl, url, apiKey } from './constants/config';
import {
  loginButton, transferToLoginButton, transferToSignupButton, successfulSignup,
  signupSubmit, loginSubmit, searchButton, showMoreButton, menuButton, headerButtonText,
  headerSaved, headerLogout, popupSignup, popupLogin, popupSuccess, headerBlock, cardContainer,
  resultsNotFound, resultsPreloader, resultsFound, searchInput, formLogin, formSignup,
} from './constants/constants';

const api = new MainApi(serverUrl);
const newsApi = new NewsApi(url, apiKey);
const newsCardList = new NewsCardList(cardContainer);

function loginCheck() {
  api.getUserData()
    .then((data) => {
      const header = new Header(headerSaved, headerLogout, headerButtonText);
      header.render(data.name);
    });
}

function closePopupEscape() {
  const popupLoginEscape = new Popup(popupLogin);
  const popupSignupEscape = new Popup(popupSignup);
  const popupSuccessEscape = new Popup(popupSuccess);
  popupLoginEscape.close();
  popupSignupEscape.close();
  popupSuccessEscape.close();
}

loginButton.addEventListener('click', () => { // нажатие на кнопку в header
  if (headerLogout.classList.contains('header__logout_logged-in')) {
    api.removeCookie();
    const header = new Header(headerSaved, headerLogout, headerButtonText);
    return header.logout();
  }
  formLogin.reset();
  const popup = new Popup(popupLogin);
  popup.open();
  const formValidator = new FormValidator();
  return formValidator.setEventListeners(popupLogin);
});

transferToSignupButton.addEventListener('click', (event) => { // нажатие на кнопку перехода из попапа входа
  formSignup.reset();
  const popup = new Popup(popupSignup);
  popup.transfer(event);
  const formValidator = new FormValidator();
  formValidator.setEventListeners(popupSignup);
});

transferToLoginButton.addEventListener('click', (event) => { // нажатие на кнопку перехода из попапа регистрации
  formLogin.reset();
  const popup = new Popup(popupLogin);
  popup.transfer(event);
});

successfulSignup.addEventListener('click', (event) => { // нажатие на кнопку перехода из попапа успешной регистрации
  formLogin.reset();
  const popup = new Popup(popupLogin);
  popup.transfer(event);
});

menuButton.addEventListener('click', () => { // нажатие на кнопку меню
  const menu = new Menu(headerBlock);
  menu.open();
});

signupSubmit.addEventListener('click', () => { // нажатие на кнопку подтверждения регистрации
  const data = {
    email: formSignup.elements.email.value,
    password: formSignup.elements.password.value,
    name: formSignup.elements.name.value,
  };
  api.signup(data.email, data.password, data.name)
    .then(() => {
      formSignup.querySelector('.form__field-error.form__field-error_button').textContent = '';
      const popup = new Popup(popupSuccess);
      popup.success();
    })
    .catch(() => {
      formSignup.querySelector('.form__field-error.form__field-error_button').textContent = 'Адрес электронной почты уже используется';
    });
});

loginSubmit.addEventListener('click', () => { // нажатие на кнопку подтверждения входа
  const data = {
    email: formLogin.elements.email.value,
    password: formLogin.elements.password.value,
  };
  api.signin(data.email, data.password)
    .then((user) => {
      formLogin.querySelector('.form__field-error.form__field-error_button').textContent = '';
      const popup = new Popup(popupSuccess);
      popup.close();
      const header = new Header(headerSaved, headerLogout, headerButtonText);
      header.render(user.data);
    })
    .catch(() => {
      formLogin.querySelector('.form__field-error.form__field-error_button').textContent = 'Неправильные почта или пароль';
    });
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closePopupEscape();
  }
});

searchButton.addEventListener('click', () => { // нажатие на кнопку поиска статей
  const dateHandler = new DateHandler();
  const dateNow = dateHandler.dateNow();
  const dateWeekAgo = dateHandler.dateWeekAgo();
  if (searchInput.value === '') {
    return newsCardList.renderErrorActivate(resultsNotFound);
  }
  newsCardList.resultsDisactivate(resultsFound);
  newsCardList.renderErrorDisactivate(resultsNotFound);
  newsCardList.contentDelete();
  newsCardList.renderLoaderActivate(resultsPreloader);
  newsApi.getNews(searchInput.value, dateWeekAgo, dateNow, 100)
    .then((result) => {
      if (result.length === 0) {
        newsCardList.renderLoaderDisactivate(resultsPreloader);
        newsCardList.resultsDisactivate(resultsFound);
        return newsCardList.renderErrorActivate(resultsNotFound);
      }
      const data = newsCardList.renderResults(result);
      for (let i = 0; i < data.length; i++) {
        const newsCard = new NewsCard(data[i]);
        newsCard.create();
        newsCardList.addCard(newsCard.create());
        api.getArticles()
          .then((res) => {
            for (let j = 0; j < res.length; j++) {
              if ((res[j].title === data[i].title) && (res[j].text === data[i].text)
                && (res[j].source === data[i].source) && (res[j].link === data[i].link)
                && (res[j].date === data[i].date) && (res[j].image === data[i].image)) {
                cardContainer.childNodes[i].querySelector('.card__anchor').classList.add('card__anchor_marked');
                cardContainer.childNodes[i].setAttribute('cardId', res[j]._id);
              }
            }
          });
      }
      newsCardList.resultsActivate(resultsFound);
      return newsCardList.renderLoaderDisactivate(resultsPreloader);
    });
});

showMoreButton.addEventListener('click', () => {
  const dateHandler = new DateHandler();
  const dateNow = dateHandler.dateNow();
  const dateWeekAgo = dateHandler.dateWeekAgo();
  newsApi.getNews(searchInput.value, dateWeekAgo, dateNow, 100)
    .then((result) => {
      if (result.length <= cardContainer.childNodes.length + 3) {
        showMoreButton.style.display = 'none';
      }
      const data = newsCardList.showMore(result, cardContainer.childNodes);
      for (let i = 0; i < data.length; i++) {
        const newsCard = new NewsCard(data[i]);
        newsCard.create();
        newsCardList.addCard(newsCard.create());
        api.getArticles()
          .then((res) => {
            for (let j = 0; j < res.length; j++) {
              if ((res[j].title === data[i].title) && (res[j].text === data[i].text)
                && (res[j].source === data[i].source) && (res[j].link === data[i].link)
                && (res[j].date === data[i].date) && (res[j].image === data[i].image)) {
                cardContainer.childNodes[cardContainer.childNodes.length - 3 + i].querySelector('.card__anchor').classList.add('card__anchor_marked');
                cardContainer.childNodes[i].setAttribute('cardId', res[j]._id);
              }
            }
          });
      }
      if ((data.length === 1) || (data.length === 2)) {
        showMoreButton.style.display = 'none';
      }
    });
});

cardContainer.addEventListener('click', (event) => {
  const card = event.target.parentElement;
  const alertDelete = cardContainer.querySelectorAll('.card__alert');
  for (let i = 0; i < alertDelete.length; i++) {
    alertDelete[i].classList.remove('card__alert_is-activated');
  }
  if (!headerSaved.classList.contains('header__saved_logged-in')) {
    return card.querySelector('.card__alert').classList.add('card__alert_is-activated');
  }
  if (event.target.classList.contains('card__anchor_marked')) {
    event.target.classList.remove('card__anchor_marked');
    return api.removeArticle(card.getAttribute('cardId'));
  }
  event.target.classList.add('card__anchor_marked');
  const data = {
    keyword: searchInput.value,
    title: card.querySelector('.card__name').textContent,
    text: card.querySelector('.card__text').textContent,
    date: card.querySelector('.card__date').textContent,
    source: card.querySelector('.card__source').textContent,
    link: card.querySelector('.card.card_link').href,
    image: card.querySelector('.card__image').src,
  };
  return api.createArticle(data.keyword, data.title,
    data.text, data.date, data.source, data.link, data.image)
    .then((cardId) => {
      card.setAttribute('cardId', cardId);
    });
});

loginCheck(); // проверка логина
