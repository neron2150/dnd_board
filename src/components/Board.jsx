import React, { Component } from 'react';
import './App.css';
import DragArea from '../dnd/DragArea';
import getContent from '../mocks/BoardMocks';

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

  // onDrop = (draggableID, newContainerID, lastContainerID) => {
  // };

  render() {
    return (
      <DragArea
        onDrop={this.onDrop}
        containers={getContent}
        renderDroppableByID={this.renderDroppableByID}
        renderDraggableByID={this.renderDraggableByID}
        shouldRebase
      />
    );
  }
}

export default Board;
