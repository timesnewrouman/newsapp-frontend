/* eslint-disable no-loop-func */
/* eslint-disable max-len */
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
import * as date from './utils/date';
import * as input from './utils/input';
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
const header = new Header(headerSaved, headerLogout, headerButtonText);
const formValidator = new FormValidator();
const menu = new Menu(headerBlock);
const loginPopupVariable = new Popup(popupLogin);
const signupPopupVariable = new Popup(popupSignup);
const successPopupVariable = new Popup(popupSuccess);

let articlesArray = [];

function loginCheck() {
  api.getUserData()
    .then((data) => {
      header.render(data.name);
    })
    .catch((err) => {
      err.text().then((error) => {
        console.log(JSON.parse(error).message);
      });
    });
}

function closePopupEscape() {
  loginPopupVariable.close();
  signupPopupVariable.close();
  successPopupVariable.close();
}

function articlesSearch(event) {
  event.preventDefault();
  if (searchInput.value === '') {
    return newsCardList.renderErrorActivate(resultsNotFound);
  }
  newsCardList.resultsDisactivate(resultsFound);
  newsCardList.renderErrorDisactivate(resultsNotFound);
  newsCardList.contentDelete();
  newsCardList.renderLoaderActivate(resultsPreloader);
  newsApi.getNews(searchInput.value, date.dateWeekAgoHandler(), date.dateNowHandler(), 100)
    .then((result) => {
      if (result.length === 0) {
        newsCardList.renderLoaderDisactivate(resultsPreloader);
        newsCardList.resultsDisactivate(resultsFound);
        return newsCardList.renderErrorActivate(resultsNotFound);
      }
      if ((result.length > 0) && (result.length <= 3)) {
        newsCardList.resultsActivate(resultsFound);
        newsCardList.renderLoaderDisactivate(resultsPreloader);
        showMoreButton.style.display = 'none';
        articlesArray = newsCardList.renderResults(result);
        for (let i = 0; i < articlesArray.length; i++) {
          const newsCard = new NewsCard(articlesArray[i]);
          newsCard.create();
          newsCardList.addCard(newsCard.create());
          api.getArticles()
            .then((savedCardsArray) => { // проверка на уже сохраненные статьи
              for (let j = 0; j < savedCardsArray.length; j++) {
                if ((savedCardsArray[j].title === articlesArray[i].title)
                  && (savedCardsArray[j].text === articlesArray[i].text)
                  && (savedCardsArray[j].source === articlesArray[i].source)
                  && (savedCardsArray[j].link === articlesArray[i].link)
                  && (savedCardsArray[j].date === articlesArray[i].date)
                  && (savedCardsArray[j].image === articlesArray[i].image)) {
                  cardContainer.childNodes[i].querySelector('.card__anchor').classList.add('card__anchor_marked');
                  cardContainer.childNodes[i].setAttribute('cardId', savedCardsArray[j]._id);
                }
              }
            });
        }
        return;
      }
      if (result.length > 3) {
        newsCardList.resultsActivate(resultsFound);
        newsCardList.renderLoaderDisactivate(resultsPreloader);
        showMoreButton.style.display = 'flex';
        articlesArray = newsCardList.renderResults(result);
        const cardsInRow = 3;
        for (let i = 0; i < cardsInRow; i++) {
          const newsCard = new NewsCard(articlesArray[i]);
          newsCard.create();
          newsCardList.addCard(newsCard.create());
          api.getArticles()
            .then((savedCardsArray) => { // проверка на уже сохраненные статьи
              for (let j = 0; j < savedCardsArray.length; j++) {
                if ((savedCardsArray[j].title === articlesArray[i].title)
                  && (savedCardsArray[j].text === articlesArray[i].text)
                  && (savedCardsArray[j].source === articlesArray[i].source)
                  && (savedCardsArray[j].link === articlesArray[i].link)
                  && (savedCardsArray[j].date === articlesArray[i].date)
                  && (savedCardsArray[j].image === articlesArray[i].image)) {
                  cardContainer.childNodes[i].querySelector('.card__anchor').classList.add('card__anchor_marked');
                  cardContainer.childNodes[i].setAttribute('cardId', savedCardsArray[j]._id);
                }
              }
            });
        }
      }
    })
    .catch(() => {
      alert('Произошла ошибка обработки статей');
    });
}

function showMore() {
  articlesArray.splice(0, 3);
  const newsCardsArray = newsCardList.showMore(articlesArray);
  for (let i = 0; i < newsCardsArray.length; i++) {
    const newsCard = new NewsCard(newsCardsArray[i]);
    newsCard.create();
    newsCardList.addCard(newsCard.create());
    api.getArticles()
      .then((savedCardsArray) => {
        for (let j = 0; j < savedCardsArray.length; j++) {
          if ((savedCardsArray[j].title === newsCardsArray[i].title)
            && (savedCardsArray[j].text === newsCardsArray[i].text)
            && (savedCardsArray[j].source === newsCardsArray[i].source)
            && (savedCardsArray[j].link === newsCardsArray[i].link)
            && (savedCardsArray[j].date === newsCardsArray[i].date)
            && (savedCardsArray[j].image === newsCardsArray[i].image)) {
            cardContainer.childNodes[cardContainer.childNodes.length - 3 + i].querySelector('.card__anchor').classList.add('card__anchor_marked');
            cardContainer.childNodes[i].setAttribute('cardId', savedCardsArray[j]._id);
          }
        }
      })
      .catch(() => {
        alert('Произошла ошибка обработки статей');
      });
  }
  if (articlesArray.length <= 3) {
    showMoreButton.style.display = 'none';
  }
}

function login(event) {
  event.preventDefault();
  const data = {
    email: formLogin.elements.email.value,
    password: formLogin.elements.password.value,
  };
  input.setDisabledLogin(formLogin);
  api.signin(data.email, data.password)
    .then((user) => {
      input.unsetDisabledLogin(formLogin);
      formLogin.querySelector('.form__field-error.form__field-error_button').textContent = '';
      successPopupVariable.close();
      header.render(user.data);
    })
    .catch((error) => {
      input.unsetDisabledLogin(formLogin);
      if (error.status === 401) {
        formLogin.querySelector('.form__field-error.form__field-error_button').textContent = 'Неправильные почта или пароль';
      }
      if (error.status !== 401) {
        formLogin.querySelector('.form__field-error.form__field-error_button').textContent = 'Произошла ошибка';
      }
    });
}

function signup(event) {
  event.preventDefault();
  const data = {
    email: formSignup.elements.email.value,
    password: formSignup.elements.password.value,
    name: formSignup.elements.name.value,
  };
  input.setDisabledSignup(formSignup);
  api.signup(data.email, data.password, data.name)
    .then(() => {
      input.unsetDisabledSignup(formSignup);
      formSignup.querySelector('.form__field-error.form__field-error_button').textContent = '';
      successPopupVariable.success();
    })
    .catch((error) => {
      input.unsetDisabledSignup(formSignup);
      if (error.status === 409) {
        formSignup.querySelector('.form__field-error.form__field-error_button').textContent = 'Адрес электронной почты уже используется';
      }
      if (error.status !== 409) {
        formSignup.querySelector('.form__field-error.form__field-error_button').textContent = 'Произошла ошибка';
      }
    });
}

function cardOperationsHandler(event) {
  event.preventDefault();
  const card = event.target.parentElement;
  const alertsArray = cardContainer.querySelectorAll('.card__alert');
  for (let i = 0; i < alertsArray.length; i++) {
    alertsArray[i].classList.remove('card__alert_is-activated');
  }
  if (!headerSaved.classList.contains('header__saved_logged-in')) {
    return card.querySelector('.card__alert').classList.add('card__alert_is-activated');
  }
  if (event.target.classList.contains('card__anchor_marked')) {
    return api.removeArticle(card.getAttribute('cardId'))
      .then(() => {
        event.target.classList.remove('card__anchor_marked');
      })
      .catch(() => {
        alert('Удаление не удалось');
        Promise.reject(new Error('Произошла ошибка'));
      });
  }
  const data = {
    keyword: searchInput.value,
    title: card.querySelector('.card__name').textContent,
    text: card.querySelector('.card__text').textContent,
    date: card.querySelector('.card__date').textContent,
    source: card.querySelector('.card__source').textContent,
    link: card.querySelector('.card.card_link').href,
    image: card.querySelector('.card__image').src,
  };
  api.createArticle(data.keyword, data.title, data.text,
    data.date, data.source, data.link, data.image)
    .then((cardId) => {
      event.target.classList.add('card__anchor_marked');
      card.setAttribute('cardId', cardId);
    })
    .catch(() => {
      alert('Сохранение не удалось');
      Promise.reject(new Error('Произошла ошибка'));
    });
}

loginButton.addEventListener('click', () => { // нажатие на кнопку в header
  if (headerLogout.classList.contains('header__logout_logged-in')) {
    return api.removeCookie()
      .then(() => header.logout())
      .catch(() => alert('Не удалось выполнить выход'));
  }
  formLogin.reset();
  loginPopupVariable.open();
  return formValidator.setEventListeners(popupLogin);
});

transferToSignupButton.addEventListener('click', (event) => { // нажатие на кнопку перехода из попапа входа
  formSignup.reset();
  signupPopupVariable.transfer(event);
  formValidator.setEventListeners(popupSignup);
});

transferToLoginButton.addEventListener('click', (event) => { // нажатие на кнопку перехода из попапа регистрации
  formLogin.reset();
  loginPopupVariable.transfer(event);
});

successfulSignup.addEventListener('click', (event) => { // нажатие на кнопку перехода из попапа успешной регистрации
  formLogin.reset();
  loginPopupVariable.transfer(event);
});

menuButton.addEventListener('click', () => { // нажатие на кнопку меню
  menu.open();
});

signupSubmit.addEventListener('click', signup);

loginSubmit.addEventListener('click', login);

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closePopupEscape();
  }
});

searchButton.addEventListener('click', articlesSearch);

showMoreButton.addEventListener('click', showMore);

cardContainer.addEventListener('click', cardOperationsHandler);

loginCheck(); // проверка логина
