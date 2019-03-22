import { TODOS_URL } from './constants';

const getTodos = (callback) => {
  fetch(TODOS_URL)
    .then(response => response.json())
    .then((json) => {
      callback(json);
    });
};

export { getTodos };
