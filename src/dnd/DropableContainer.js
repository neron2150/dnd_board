import React, { Component } from 'react';
import { DndContext } from './DndContext';

class DropableContainer extends Component {
  render() {
    return (
      <div className="app" dnd="true">
        <DndContext.Consumer>
          {value => (this.props.children)}
        </DndContext.Consumer>
      </div>
    );
  }
}
export default DropableContainer;
