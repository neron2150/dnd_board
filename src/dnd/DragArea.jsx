import React, { Component } from 'react';
import { DndContext } from './DndContext';

function getDefaulsState() {
  return {
    dragStart: false,
    draggable: null,
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
    deg: 0,
  };
}

class DragArea extends Component {
  state = getDefaulsState();

  stopDrag = () => {
    this.transformElement(this.state.draggable, { x: 0, y: 0, deg: 0 });
    this.setState(getDefaulsState());
  };

  mouseUp = () => {
    this.stopDrag();
  };

  mouseDown = (e) => {
    this.setState({
      dragStart: true,
      lastY: e.clientY,
      lastX: e.clientX,
    });
  };

  onDrag = (e) => {
    const { lastX, lastY, deg } = this.state;
    const x = this.state.x + e.clientX - lastX;
    const y = this.state.y + e.clientY - lastY;
    const nextDeg = (e.clientX - lastX) / 4;
    this.transformElement(this.state.draggable, { x, y, deg });
    this.setState({
      x,
      y,
      deg: nextDeg,
      lastX: e.clientX,
      lastY: e.clientY,
    });
  };

  mouseMove = (e) => {
    if (this.state.dragStart) {
      this.onDrag(e);
      e.preventDefault();
    } else {
      this.setState({
        lastY: e.clientY,
        lastX: e.clientX,
      });
    }
  };

  transformElement = (element, { x, y, deg }) => {
    if (element) { element.style.transform = `translate(${x}px, ${y}px) rotate(${deg}deg)`; }
  };

  setDraggable = (draggable) => {
    this.setState({ draggable });
  };

  render() {
    return (
      <DndContext.Provider
        value={{
          setDraggable: this.setDraggable,
        }}
      >
        <div
          className="area"
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
