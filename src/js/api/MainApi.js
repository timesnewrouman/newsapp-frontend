export default class MainApi {
  constructor(serverUrl) {
    this.server = serverUrl;
  }

  signup(email, password, name) {
    return fetch(`${this.server}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      });
  }

  signin(email, password) {
    return fetch(`${this.server}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      });
  }

  createArticle(keyword, title, text, date, source, link, image) {
    return fetch(`${this.server}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then((data) => data.data);
  }

  removeArticle(id) {
    return fetch(`${this.server}/articles/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      });
  }

  getArticles() {
    return fetch(`${this.server}/articles`, {
      credentials: 'include',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then((data) => data.data);
  }

  getUserData() {
    return fetch(`${this.server}/users/me`, {
      credentials: 'include',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then((data) => data.data);
  }

  removeCookie() {
    return (fetch(`${this.server}/deletecookie`, {
      method: 'DELETE',
      credentials: 'include',
    })
    );
  }
}
