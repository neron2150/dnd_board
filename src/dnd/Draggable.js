import React, {Component} from 'react';
import {DndContext} from './DndContext'
class Draggable extends Component{

  render() {
    return(
      <DndContext.Consumer>
        {(value)=> {
          return (
            <div
              className = 'drag'
              onMouseDown = {value.setDraggable}
              ref={(el) => {DndContext._currentValue.draggable = el;}}
            >
              {this.props.children}
            </div>
          );
        }}
      </DndContext.Consumer>

    );
  }
}
export default Draggable;
