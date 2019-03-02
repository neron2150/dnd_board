import React, { Component } from 'react';
import { DndContext } from './DndContext';

class DragArea extends Component {
  state = {
    dragStart: false,
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
    deg: 0,
    draggableId: null,
    dropableContainers: [],
  };

  draggable = null;

  setDraggable = (draggable, draggableId) => {
    this.setState({ draggableId });
    this.draggable = draggable;
  };

  setDropable = (dropable, id) => {
    this.setState(prevState => ({
      dropableContainers:
      prevState.dropableContainers.concat([{ dropable, id }]),
    }));
  };

  transformElement = (element, { x, y, deg }) => {
    if (element) element.style.transform = `translate(${x}px, ${y}px) rotate(${deg}deg)`;
  };

  stopDrag = (e) => {
    this.matchDndIntersections(e.pageX, e.pageY);
    this.transformElement(this.draggable, { x: 0, y: 0, deg: 0 });
    this.setState({
      dragStart: false,
      x: 0,
      y: 0,
      lastX: 0,
      lastY: 0,
      deg: 0,
      draggableId: null,
    });
  };

  mouseUp = (e) => {
    if (this.state.dragStart) this.stopDrag(e);
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
    this.transformElement(this.draggable, { x, y, deg });
    this.setState({
      x,
      y,
      deg: nextDeg,
      lastX: e.clientX,
      lastY: e.clientY,
    });
  };

  onDrop = (draggableId, dropableId) => {
    this.props.onDrop(draggableId, dropableId);
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

  matchDndIntersections(x, y) {
    this.state.dropableContainers.forEach(
      (container) => {
        if (x > container.dropable.offsetLeft &&
           x < container.dropable.offsetWidth + container.dropable.offsetLeft &&
           y > container.dropable.offsetTop &&
           y < container.dropable.offsetHeight + container.dropable.offsetTop
        ) {
          this.onDrop(this.state.draggableId, container.id);
        }
      },
    );
  }

  render() {
    return (
      <DndContext.Provider
        value={{
          setDraggable: this.setDraggable,
          setDropable: this.setDropable,
        }}
      >
        <div // eslint-disable-line jsx-a11y/no-static-element-interactions
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
