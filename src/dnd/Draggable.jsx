import React, { Component } from 'react';
import { DndContext } from './DndContext';

class Draggable extends Component {
  mouseDown = () => {
    this.context.setDraggable(this.container, this.props.id);
  };

  shouldComponentUpdate(nextProps, nextState) {
    console.log('this.props.children === nextProps.children');
    if (nextProps.id !== 1) {
      console.log(this.props.children === nextProps.children);
      console.log('asdasda');
    }

    console.log('this.props.children === nextProps.children');

    return true;
  }

  render() {
    // console.log('render   ', this.props.id);
    return (

      <div
        className="drag"
        onMouseDown={this.mouseDown}
        ref={(el) => { this.container = el; }}
      >
        <p>{this.props.id}</p>
        {this.props.children}
      </div>

    );
  }
}
Draggable.contextType = DndContext;
export default Draggable;
