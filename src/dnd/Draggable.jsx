import React, { Component } from 'react';

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

      <div // eslint-disable-line jsx-a11y/no-static-element-interactions
        className="draggable"
        onMouseDown={this.mouseDown(this.props.setDraggable)}
        ref={this.setRef}
      >
        {this.props.children}
      </div>

    );
  }
}

export default Draggable;
