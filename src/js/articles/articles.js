/* eslint-disable import/named */
import '../../articles.css';
import MainApi from '../api/MainApi';
import NewsCard from '../components/NewsCard';
import Menu from '../components/Menu';
import NewsCardList from '../components/NewsCardList';
import Header from '../components/Header';
import { serverUrl } from '../constants/config';
import {
  menuButton, headerButtonText, headerSaved, headerLogout, headerBlock, cardContainer,
  resultsNotFound, resultsFound, exitSavedButton, resultsHeader, resultsTags,
} from '../constants/constants';

const api = new MainApi(serverUrl);
const newsCardList = new NewsCardList(cardContainer);
const header = new Header(headerSaved, headerLogout, headerButtonText);
const menu = new Menu(headerBlock);

function loginCheck() {
  api.getUserData()
    .then((data) => {
      header.render(data.name);
    })
    .catch(() => {
      // window.location.href = '/'; // local вариант
      window.location.href = 'https://timesnewrouman.github.io/newsapp-frontend'; // stable вариант
      alert('Нужно авторизироваться');
    });
}

function resultsHeaderReview(array) {
  if (array.length === 1) {
    resultsHeader.textContent = `${headerButtonText.textContent}, у вас ${array.length} сохранённая статья`;
    return resultsHeader.textContent;
  }
  if (array.length === 2 || array.length === 3 || array.length === 4) {
    resultsHeader.textContent = `${headerButtonText.textContent}, у вас ${array.length} сохранённые статьи`;
    return resultsHeader.textContent;
  }
  resultsHeader.textContent = `${headerButtonText.textContent}, у вас ${array.length} сохранённых статей`;
  return resultsHeader.textContent;
}

function resultsHeaderTagsReview() {
  api.getArticles()
    .then((savedArticlesArray) => {
      const processedResult = [];
      let i = savedArticlesArray.length - 1;
      while (i > 0) {
        if (savedArticlesArray[i].keyword === savedArticlesArray[i - 1].keyword) {
          savedArticlesArray.pop();
        } else if (savedArticlesArray[i].keyword !== savedArticlesArray[i - 1].keyword) {
          processedResult.push(savedArticlesArray[i]);
          savedArticlesArray.pop();
        }
        if (i === 1) {
          processedResult.push(savedArticlesArray[0]);
          savedArticlesArray.pop();
        }
        i--;
      }
      if (processedResult.length === 1) {
        resultsTags.textContent = `По ключевому слову ${processedResult[0].keyword[0].toUpperCase()
          + processedResult[0].keyword.slice(1)}`;
        return resultsTags;
      }
      if (processedResult.length === 2) {
        resultsTags.textContent = `По ключевым словам ${processedResult[0].keyword[0].toUpperCase()
          + processedResult[0].keyword.slice(1)} и
        ${processedResult[1].keyword[0].toUpperCase() + processedResult[1].keyword.slice(1)}`;
        return resultsTags;
      }
      if (processedResult.length === 3) {
        resultsTags.textContent = `По ключевым словам ${processedResult[0].keyword[0].toUpperCase()
          + processedResult[0].keyword.slice(1)},
        ${processedResult[1].keyword[0].toUpperCase() + processedResult[1].keyword.slice(1)} и
        ${processedResult[2].keyword[0].toUpperCase() + processedResult[2].keyword.slice(1)}`;
        return resultsTags;
      }
      resultsTags.textContent = `По ключевым словам ${processedResult[0].keyword[0].toUpperCase()
        + processedResult[0].keyword.slice(1)}, ${processedResult[1].keyword[0].toUpperCase()
        + processedResult[1].keyword.slice(1)} и ${processedResult.length - 2} другим`;
      return resultsTags;
    })
    .catch(() => {
      alert('Произошла ошибка обработки ключевых слов');
    });
}

function getSavedArticles() {
  api.getArticles()
    .then((savedArticlesArray) => {
      if (savedArticlesArray.length === 0) {
        newsCardList.resultsDisactivate(resultsFound);
        return newsCardList.renderErrorActivate(resultsNotFound);
      }
      for (let i = 0; i < savedArticlesArray.length; i++) {
        const newsCard = new NewsCard(savedArticlesArray[i]);
        newsCard.getSaved();
        const card = newsCard.getSaved();
        card.setAttribute('cardId', savedArticlesArray[i]._id);
        newsCardList.addCard(card);
      }
      resultsHeaderReview(savedArticlesArray);
      return resultsHeaderTagsReview();
    })
    .catch(() => {
      alert('Произошла ошибка загрузки сохранённых статей');
    });
}

function cardOperationsHandler(event) {
  const card = event.target.parentElement;
  if (event.target.classList.contains('card__delete')) {
    api.removeArticle(card.getAttribute('cardId'))
      .then(() => {
        card.parentElement.removeChild(card);
        if (cardContainer.childNodes.length - 1 === 0) {
          newsCardList.resultsDisactivate(resultsFound);
          newsCardList.renderErrorActivate(resultsNotFound);
        }
        resultsHeaderReview(cardContainer.children);
        resultsHeaderTagsReview();
      })
      .catch(() => {
        alert('Произошла ошибка удаления');
      });
  }
}

cardContainer.addEventListener('click', cardOperationsHandler);

exitSavedButton.addEventListener('click', () => {
  api.removeCookie()
    .then(() => {
      // window.location.href = '/'; // local вариант
      window.location.href = 'https://timesnewrouman.github.io/newsapp-frontend'; // stable вариант
    })
    .catch((err) => alert(err));
});

menuButton.addEventListener('click', () => { // нажатие на кнопку меню
  menu.open();
});

loginCheck();
getSavedArticles();
