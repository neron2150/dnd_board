import React, { Component } from 'react';
import { DndContext } from './DndContext';

class DropableContainer extends Component {
  componentDidMount() {
    this.context.setDropable(this.container, this.props.id);
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

DropableContainer.contextType = DndContext;

export default DropableContainer;
