import React, { Component } from 'react';
import './App.css';
import DragArea from '../dnd/DragArea';

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

console.log(createContent());
class Board extends Component {
  renderDraggableByID = ID => (
    <div className="drag">
      {ID}
    </div>
  );

  renderDroppableByID = (content, containerInfo) => (
    <div className="container">
      <p>{containerInfo.ID}</p>
      {content}
    </div>
  );

  onDrop = (draggableID, newContainerID, lastContainerID) => {
    console.log(draggableID, newContainerID, lastContainerID);
  };

  render() {
    return (
      <DragArea
        onDrop={this.onDrop}
        containers={createContent()}
        renderDroppableByID={this.renderDroppableByID}
        renderDraggableByID={this.renderDraggableByID}
        shouldRebase
      />
    );
  }
}

export default Board;
