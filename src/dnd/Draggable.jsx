import React, { Component } from 'react';
import { DndContext } from './DndContext';

class Draggable extends Component {
  mouseDown = setDraggable => () => {
    setDraggable(this.container);
  };

  render() {
    return (
      <DndContext.Consumer>
        {value => (
          <div
            className="drag"
            onMouseDown={this.mouseDown(value.setDraggable)}
            ref={(el) => { this.container = el; }}
          >
            {this.props.children}
          </div>
        )}
      </DndContext.Consumer>

    );
  }
}
export default Draggable;
