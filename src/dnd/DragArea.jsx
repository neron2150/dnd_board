import React, { Component } from 'react';
import { DndContext } from './DndContext';

class DragArea extends Component {
  state = {
    dragStart: false,
    draggable: null,
    x: 0,
    y: 0,
    lx: 0,
    ly: 0,
    deg: 0,
  };

  stopDrag = () => {
    this.transformElement(this.state.draggable, { x: 0, y: 0, deg: 0 });
    this.setState({
      dragStart: false,
      draggable: null,
      x: 0,
      y: 0,
      lx: 0,
      ly: 0,
      deg: 0,
    });
  };

  mouseUp = () => {
    this.stopDrag();
  };

  mouseDown = (e) => {
    this.setState({
      dragStart: true,
      ly: e.clientY,
      lx: e.clientX,
    });
  };

  onDrag = (e) => {
    const { lx, ly, deg } = this.state;
    const x = this.state.x + e.clientX - lx;
    const y = this.state.y + e.clientY - ly;
    // deg = (e.clientX - lx) / 4;
    this.transformElement(this.state.draggable, { x, y, deg });
    this.setState({
      x,
      y,
      deg: (e.clientX - lx) / 4,
      lx: e.clientX,
      ly: e.clientY,
    });
  };

  mouseMove = (e) => {
    if (this.state.dragStart && this.state.draggable) {
      this.onDrag(e);
      e.preventDefault();
    } else {
      this.setState({
        ly: e.clientY,
        lx: e.clientX,
      });
    }
  };

  transformElement = (element, { x, y, deg }) => {
    if (element) { element.style.transform = `translate(${x}px, ${y}px) rotate(${deg}deg)`; }
  };

  setDraggable = (draggable) => {
    this.setState({ draggable });
    console.log('setDraggable', draggable);
  };

  render() {
    return (
      <DndContext.Provider
        value={{
          setDraggable: this.setDraggable,
        }}
      >
        <div
          className="app"
          onMouseDown={this.mouseDown}
          onMouseMove={this.mouseMove}
          onMouseUp={this.mouseUp}
          onMouseLeave={this.mouseUp}
        >
          {this.props.children}
        </div>
      </DndContext.Provider>

    );
  }
}
export default DragArea;
