import React, { Component } from 'react';
import { DndContext } from './DndContext';

class DroppableContainer extends Component {
  static contextType = DndContext;

  componentDidMount() {
    this.context.setDroppable(this.container, this.props.id);
  }

  render() {
    return (
      <div
        className="container"
        ref={(el) => {
          this.container = el;
        }}
      >
        <p>{this.props.id}</p>
        {this.props.children}
      </div>
    );
  }
}

export default DroppableContainer;
