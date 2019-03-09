import React, { Component } from 'react';
import { DndContext } from './DndContext';

class Draggable extends Component {
  draggable = null;

  mouseDown = setDraggable => () => {
    if (this.draggable) {
      setDraggable(this.draggable, this.props.ID);
    }
  };

  setRef = (el) => { this.draggable = el; };

  render() {
    return (
      <DndContext.Consumer>
        {context => (
          <div // eslint-disable-line jsx-a11y/no-static-element-interactions
            onMouseDown={this.mouseDown(context.setDraggable)}
            ref={this.setRef}
          >
            {this.props.children}
          </div>
        )}
      </DndContext.Consumer>
    );
  }
}

export default Draggable;
