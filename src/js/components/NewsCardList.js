export default class NewsCardList {
  constructor(container) {
    this.container = container;
  }

  addCard(card) {
    this.container.appendChild(card);
  }

  contentDelete() {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
  }

  resultsActivate(div) {
    div.classList.add('results__found_exist');
  }

  resultsDisactivate(div) {
    div.classList.remove('results__found_exist');
  }

  renderErrorActivate(div) {
    div.classList.add('results__not-found_is-activated');
  }

  renderErrorDisactivate(div) {
    div.classList.remove('results__not-found_is-activated');
  }

  renderLoaderActivate(div) {
    div.classList.add('results__preloader-container_is-activated');
  }

  renderLoaderDisactivate(div) {
    div.classList.remove('results__preloader-container_is-activated');
  }

  renderResults(articlesArray) {
    const processedArray = [];
    for (let i = 0; i < 3; i++) {
      const data = {
        title: articlesArray[i].title,
        text: articlesArray[i].description,
        date: articlesArray[i].publishedAt.substring(0, 10),
        source: articlesArray[i].source.name,
        link: articlesArray[i].url,
        image: articlesArray[i].urlToImage,
      };
      processedArray.push(data);
    }
    return processedArray;
  }

  showMore(articlesArray, alreadyExist) {
    const processedArray = [];
    for (let i = alreadyExist.length; i < alreadyExist.length + 3; i++) {
      const data = {
        title: articlesArray[i].title,
        text: articlesArray[i].description,
        date: articlesArray[i].publishedAt.substring(0, 10),
        source: articlesArray[i].source.name,
        link: articlesArray[i].url,
        image: articlesArray[i].urlToImage,
      };
      processedArray.push(data);
      if (articlesArray[i + 1] === undefined) {
        return processedArray;
      }
    }
    return processedArray;
  }
}
