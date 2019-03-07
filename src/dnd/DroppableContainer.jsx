import React, { Component } from 'react';
import { DndContext } from './DndContext';

class DroppableContainer extends Component {
  static contextType = DndContext;

  componentDidMount() {
    this.props.setDroppable(this.container, this.props.ID);
  }

  render() {
    return (
      <div
        className="container"
        ref={(el) => {
          this.container = el;
        }}
      >
        <p>{this.props.ID}</p>
        {this.props.children}
      </div>
    );
  }
}

export default DroppableContainer;
