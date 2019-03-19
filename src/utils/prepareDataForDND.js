const prepareData = (data) => {
  console.log(data[0]);
  const result = {};
  result.todo1 = { ID: 'todo1', draggables: {} };
  result.doing1 = { ID: 'doing1', draggables: {} };
  result.done1 = { ID: 'done1', draggables: {} };

  data.forEach((todo) => {
    if (todo.completed) {
      result.done1.draggables[todo.id.toString()] = { ID: todo.id.toString(), containerID: 'done1' };
    } else {
      result.todo1.draggables[todo.id.toString()] = { ID: todo.id.toString(), containerID: 'todo1' };
    }
  });
  console.log('---', result);
  return result;
};

export default prepareData;
