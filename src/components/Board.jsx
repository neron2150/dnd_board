import React, { Component } from 'react';
import './App.css';
import DragArea from '../dnd/DragArea';
import { getTodos } from '../services';
import getDNDModel from '../utils/dnd';

class Board extends Component {
  state = {
    containers: {},
    todos: null,
  };

  bindData = (todos) => {
    this.setState({ todos, containers: getDNDModel(todos) });
  };

  componentDidMount = () => {
    getTodos(this.bindData);
  };

  renderDraggableByID = (ID) => {
    const foundTodo = this.state.todos.find(
      todo => todo.id.toString() === ID) || {};
    return (
      <div className="drag">
        {foundTodo.title}
      </div>);
  };

  renderDroppableByID = (content, containerInfo) => (
    <div className="container">
      <p>{containerInfo.ID}</p>
      {content}
    </div>
  );

  render() {
    return (
      <DragArea
        containers={this.state.containers}
        renderDroppableByID={this.renderDroppableByID}
        renderDraggableByID={this.renderDraggableByID}
        shouldRebase
      />
    );
  }
}

export default Board;
