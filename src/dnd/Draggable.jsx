import React, { Component } from 'react';
import cx from 'classnames';

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
        className={cx('draggable', {
          dragging: this.props.dragging,
        })}
        onMouseDown={this.mouseDown}
        ref={this.setRef}
      >
        {this.props.children}
      </div>

    );
  }
}

export default Draggable;
