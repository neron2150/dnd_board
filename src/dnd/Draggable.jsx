import React, { Component } from 'react';

class Draggable extends Component {
  draggable = null;

  mouseDown = () => {
    if (this.draggable) {
      this.props.setDraggable(this.draggable, this.props.ID);
    }
  };

  setRef = (el) => { this.draggable = el; };

  render() {
    return (

      <div // eslint-disable-line jsx-a11y/no-static-element-interactions
        className="draggable"
        onMouseDown={this.mouseDown}
        ref={this.setRef}
      >
        {this.props.children}
      </div>

    );
  }
}

export default Draggable;
