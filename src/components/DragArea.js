import React, {Component} from 'react';
import {DndContext} from './DndContext'

class DragArea extends Component{
  state = {
    dragStart:false,
    dragable:null
  }
  mouseDown = () => {
    this.setState({dragStart:true})
  }
  mouseUp = () => {
    this.setState({dragStart:false})
  }
  mouseMove = () => {

  }
  render() {
    return(
      <DndContext.Provider value = {{state:this.state, setDraggable : this.setDraggable}}>
        <div
          className='app'
          onMouseDown = {this.mouseDown}
          onMouseMove = {this.mouseMove}
          onMouseUp = {this.mouseUp}
        >
          {this.props.children}
        </div>
      </DndContext.Provider>


    );
  }
}
export default DragArea;
