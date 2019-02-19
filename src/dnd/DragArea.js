import React, {Component} from 'react';
import {DndContext} from './DndContext'

class DragArea extends Component{
  state = {
    dragStart:false,
    draggable:null,
    x:0,
    y:0,
    lx:0,
    ly:0,
    deg:0,
  }
  mouseDown = (e) => {

    this.setState({
      dragStart:true,
      draggable:DndContext._currentValue.draggable,
      ly:e.clientY,
      lx:e.clientX
    })
  }
  mouseUp = () => {
    this.setState({
      dragStart:false,
      draggable:null,
      x:0,
      y:0,
      lx:0,
      ly:0,
      deg:0
    });
    this.transformElement(this.state.draggable,0,0,0);
    DndContext._currentValue.draggable = null;
  }
  mouseMove = (e) => {
    if(this.state.dragStart && this.state.draggable){
      const{lx,ly,deg} = this.state;
      let x = this.state.x +e.clientX - lx;
      let y = this.state.y +e.clientY - ly;
      this.transformElement(this.state.draggable,x,y,deg);
      this.setState({
        x,
        y,
        deg: (e.clientX - lx) / 4,
        lx:e.clientX,
        ly:e.clientY
      });
    } else {
        this.setState({
           ly:e.clientY,
           lx:e.clientX,
        });
      }
  }
  transformElement = (element, x, y, deg) => {
    if(element)
    element.style.transform = `translate(${x}px, ${y}px) rotate(${deg}deg)`;

  }
  setDraggable = () => {
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
