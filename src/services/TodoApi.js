const gettodos = (up) => {
  fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then((json) => {
      up(json);
    });
};

export default gettodos;
