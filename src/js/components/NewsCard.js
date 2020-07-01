export default class NewsCard {
  constructor(data) {
    this.data = data;
  }

  create() {
    const card = document.createElement('div');
    card.classList.add('card');
    card.insertAdjacentHTML('beforeend', `
      <button class="card__anchor" type="button"></button>
      <span class="card__alert">Войдите, чтобы сохранять статьи</span>
      <a class="card card_link" href="" target="_blank">
        <img class="card__image" src="" alt="">
        <span class="card__date"></span>
        <h4 class="card__name"></h4>
        <p class="card__text"></p>
        <span class="card__source"></span>
      </a>`);
    card.querySelector('.card.card_link').href = this.data.link;
    card.querySelector('.card__image').src = this.data.image;
    card.querySelector('.card__date').textContent = this.data.date;
    card.querySelector('.card__name').textContent = this.data.title;
    card.querySelector('.card__text').textContent = this.data.text;
    card.querySelector('.card__source').textContent = this.data.source;
    return card;
  }

  getSaved() {
    const card = document.createElement('div');
    card.classList.add('card');
    card.insertAdjacentHTML('beforeend', `
    <button class="card__delete" type="button"></button>
    <span class="card__alert">Убрать из сохранённых</span>
    <span class="card__tag"></span>
    <a class="card card_link" href="" target="_blank">
      <img class="card__image" src="" alt="">
      <span class="card__date"></span>
      <h4 class="card__name"></h4>
      <p class="card__text"></p>
      <span class="card__source"></span>
    </a>`);
    card.querySelector('.card__tag').textContent = this.data.keyword[0].toUpperCase() + this.data.keyword.slice(1);
    card.querySelector('.card.card_link').href = this.data.link;
    card.querySelector('.card__image').src = this.data.image;
    card.querySelector('.card__date').textContent = this.data.date;
    card.querySelector('.card__name').textContent = this.data.title;
    card.querySelector('.card__text').textContent = this.data.text;
    card.querySelector('.card__source').textContent = this.data.source;
    return card;
  }
}
