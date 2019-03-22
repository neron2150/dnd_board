import CONTAINERS from '../constants';

const prepareData = (data) => {
  const result = {};
  result.todo1 = { ID: 'todo1', draggables: {} };
  result.doing1 = { ID: 'doing1', draggables: {} };
  result.done1 = { ID: 'done1', draggables: {} };

  data.forEach((todo) => {
    const todoID = todo.id.toString();
    if (todo.completed) {
      result.done1.draggables[todoID] =
      { ID: todoID, containerID: 'done1' };
    } else {
      result.todo1.draggables[todoID] =
      { ID: todoID, containerID: 'todo1' };
    }
  });
  return result;
};

export default prepareData;
