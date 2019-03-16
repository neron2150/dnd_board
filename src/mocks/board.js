const CREATE_TASKS = (count, containerID) => {
  const tasks = {};
  for (let i = 0; i <= count; i++) {
    const id = Math.random().toString(36).substring(7);
    tasks[id] = { ID: id, containerID };
  }

  return tasks;
};

const createContent = () => {
  const CONTAINERS_NAMES = ['todo', 'doing', 'done'];
  const result = {};
  CONTAINERS_NAMES.forEach((ID) => {
    result[ID] = { ID, draggables: CREATE_TASKS(5, ID) };
  });
  return result;
};

export default createContent();
