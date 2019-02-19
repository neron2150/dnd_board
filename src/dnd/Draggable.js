import React, {Component} from 'react';
import {DndContext} from './DndContext'
class Draggable extends Component{
  mouseDown = () =>{
    DndContext._currentValue.draggable = this.container;
  }
  render() {
    return(
      <DndContext.Consumer>
        {(value)=> {
          return (
            <div
              className = 'drag'
              onMouseDown = {this.mouseDown}
              ref={(el) => { this.container = el;}}
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
