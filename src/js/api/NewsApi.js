export default class NewsApi {
  constructor(serverUrl, apiKey) {
    this.server = serverUrl;
    this.apiKey = apiKey;
  }

  getNews(q, from, to, pageSize) {
    return fetch(`${this.server}/everything?`
    + `q=${q}&`
    + `from=${from}&`
    + `to=${to}&`
    + `pageSize=${pageSize}&`
    + `apiKey=${this.apiKey}`, {
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
      })
      .then((articles) => articles.articles)
      .catch((err) => Promise.reject(new Error(`Ошибка: ${err.status}`)));
  }
}
