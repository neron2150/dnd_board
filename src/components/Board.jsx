import React, { Component } from 'react';
import './App.css';
import DragArea from '../dnd/DragArea';
import getContent from '../mocks/board';
import getTodos from '../services/TodoApi';
import prepareData from '../utils/prepareDataForDND';

class Board extends Component {
  state = {
    containers: null,
    todos: null,
  };

  bindData = (todos) => {
    this.setState({ todos, containers: prepareData(todos) });
  };

  componentDidMount = () => {
    getTodos(this.bindData);
    console.log('готово');
  };

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

  onDrop = (/* draggableID, newContainerID, lastContainerID */) => {

  };

  render() {
    console.log('render', this.state.containers);
    return (
      <DragArea
        onDrop={this.onDrop}
        containers={
          this.state.containers
            ? this.state.containers
            : getContent()
        }
        renderDroppableByID={this.renderDroppableByID}
        renderDraggableByID={this.renderDraggableByID}
        shouldRebase
      />
    );
  }
}

export default Board;
