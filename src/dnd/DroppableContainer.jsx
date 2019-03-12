import React, { Component } from 'react';

class DroppableContainer extends Component {
  componentDidMount() {
    this.props.setDroppable(this.container, this.props.ID);
  }

  render() {
    return (
      <div
        className="droppable"
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
