import React, {Component} from 'react';
import {DndContext} from './DndContext'

class DragArea extends Component{
  state = {
    dragStart:false,
    draggable:null
  }
  mouseDown = () => {
    this.setState({dragStart:true})
  }
  mouseUp = () => {
    this.setState({dragStart:false,draggable:null})

  }
  mouseMove = () => {

  }
  dragElement = (element, x, y, deg) => {
    element.style.transform = `translate(${x}px, ${y}px) rotate(${deg}deg)`;

  }
  setDraggable = () => {

      console.log('3');
    this.setState({draggable:DndContext._currentValue.draggable});
  }
  render() {
    return(
      <DndContext.Provider
        value = {{
          state: this.state,
          setDraggable: this.setDraggable,
          draggable:null

        }}>
        <div
          className='app'
          onMouseDown = {this.mouseDown}
          onMouseMove = {this.mouseMove}
          onMouseUp = {this.mouseUp}
          onMouseLeave = {this.mouseUp}
        >
          {this.props.children}
        </div>
      </DndContext.Provider>


    );
  }
}
export default DragArea;
