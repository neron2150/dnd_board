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
    droppableId: null,
    droppableContainers: [],
  };

  draggable = null;

  setDraggable = (draggable, draggableId) => {
    this.setState({ draggableId });
    this.draggable = draggable;
  };

  setDroppable = (droppable, id) => {
    this.setState(prevState => ({
      droppableContainers:
      prevState.droppableContainers.concat([{ droppable, id }]),
    }));
  };

  transformDraggable = ({ x, y, deg }) => {
    if (this.draggable) {
      this.draggable.style.transform =
     `translate(${x}px, ${y}px) rotate(${deg}deg)`;
    }
  };

  stopDrag = (e) => {
    const newDroppable = this.findCurrentContainerID(e.pageX, e.pageY);
    const lastDroppable = this.state.droppableId;
    if (newDroppable && newDroppable !== lastDroppable) {
      this.onDrop(this.state.draggableId, newDroppable);
    }

    this.transformDraggable({ x: 0, y: 0, deg: 0 });
    this.draggable = null;
    this.setState({
      dragStart: false,
      x: 0,
      y: 0,
      lastX: 0,
      lastY: 0,
      deg: 0,
      droppableId: null,
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
      droppableId: this.findCurrentContainerID(e.pageX, e.pageY),
    });
  };

  onDrag = (e) => {
    const { lastX, lastY, deg } = this.state;
    const x = this.state.x + e.clientX - lastX;
    const y = this.state.y + e.clientY - lastY;
    this.transformDraggable({ x, y, deg });
    this.setState(prevState => ({
      x: prevState.x + e.clientX - prevState.lastX,
      y: prevState.y + e.clientY - prevState.lastY,
      deg: (e.clientX - prevState.lastX) / 4,
      lastX: e.clientX,
      lastY: e.clientY,
    }));
  };

  onDrop = (draggableId, droppableId) => {
    this.props.onDrop(draggableId, droppableId);
  };

  mouseMove = (e) => {
    if (this.state.dragStart) {
      e.persist();
      e.preventDefault();
      this.onDrag(e);
    } else {
      this.setState({
        lastY: e.clientY,
        lastX: e.clientX,
      });
    }
  };

  findCurrentContainerID = (x, y) => {
    const currentContainer = this.state.droppableContainers.find(
      (container) => {
        if (!container.droppable) return false;
        const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = container.droppable;
        return x > offsetLeft &&
          x < offsetWidth + offsetLeft &&
          y > offsetTop &&
          y < offsetHeight + offsetTop;
      });
    return currentContainer ? currentContainer.id : null;
  };

  render() {
    return (
      <DndContext.Provider
        value={{
          setDraggable: this.setDraggable,
          setDroppable: this.setDroppable,
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
