import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

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

Draggable.propTypes = {
  ID: PropTypes.string.isRequired,
  setDraggable: PropTypes.func.isRequired,
  dragging: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};
export default Draggable;
