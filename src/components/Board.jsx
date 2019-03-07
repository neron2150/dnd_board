import React, { Component } from 'react';
import './App.css';
import DroppableContainer from '../dnd/DroppableContainer';
import DragArea from '../dnd/DragArea';
import Draggable from '../dnd/Draggable';

const CREATE_TASKS = (count, containerID) => {
  const tasks = [];
  for (let i = 0; i <= count; i++) {
    tasks.push({ ID: Math.random().toString(36).substring(7), containerID });
  }

  return tasks;
};

const createContent = () => {
  const CONTAINERS_NAMES = ['todo', 'doing', 'done'];
  const containers = CONTAINERS_NAMES.map(NAME => ({
    containerID: NAME,
    name: NAME,
    draggables: CREATE_TASKS(5, NAME),
  }));
  return containers;
};

class Board extends Component {
  onDrop = (draggableId, droppableId) => console.log(draggableId, droppableId);

  renderDraggableByID = () => {

  };

  renderDroppableByID = content =>
    (<div className="test">{content}</div>);

  render() {
    return (
      <DragArea
        onDrop={this.onDrop}
        containers={createContent()}
        renderDroppableByID={this.renderDroppableByID}
        renderDraggableByID={this.renderDraggableByID}
      />
    );
  }
}

export default Board;
