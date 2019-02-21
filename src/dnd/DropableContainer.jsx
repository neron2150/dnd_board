import React, { Component } from 'react';

class DropableContainer extends Component {
  render() {
    return (
      <div className="app" dnd="true">
        {this.props.children}
      </div>
    );
  }
}
export default DropableContainer;
