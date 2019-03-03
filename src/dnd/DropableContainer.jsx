import React, { Component } from 'react';

class DropableContainer extends Component {
  render() {
    return (
      <div
        className="container"
        dnd="true"

      >
        {this.props.children}
      </div>
    );
  }
}
export default DropableContainer;
