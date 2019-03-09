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
        ref={(el) => {
          this.container = el;
        }}
      >

        {this.props.children}
      </div>
    );
  }
}

export default DroppableContainer;
