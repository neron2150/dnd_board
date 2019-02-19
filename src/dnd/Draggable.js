import React, {Component} from 'react';
import {DndContext} from './DndContext'
class Draggable extends Component{
  constructor(props){
    super(props);

  }

  render() {
    return(
      <DndContext.Consumer>
        {(value)=> {
          return (
            <div
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
