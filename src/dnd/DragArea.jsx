import React, { Component } from 'react';
import DroppableContainer from './DroppableContainer';
import Draggable from './Draggable';

class DragArea extends Component {
  state = {
    dragStart: false,
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
    deg: 0,
    draggableId: null,
    lastDroppableId: null,
    droppableContainers: [],
    containers: this.props.containers,
  };

  draggable = null;

  setDraggable = (draggable, draggableId) => {
    // TODO: resolve the problem with finding z-index
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
    const lastDroppable = this.state.lastDroppableId;
    if (newDroppable && newDroppable !== lastDroppable) {
      this.onDrop(this.state.draggableId, newDroppable, lastDroppable);
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
      lastDroppableId: null,
      draggableId: null,
    });
  };

  mouseUp = (e) => {
    if (this.state.dragStart) this.stopDrag(e);
  };

  mouseDown = (e) => {
    if (this.draggable) {
      this.setState({
        dragStart: true,
        lastY: e.pageY,
        lastX: e.pageX,
        lastDroppableId: this.findCurrentContainerID(e.pageX, e.pageY),
      });
    }
  };

  onDrag = (e) => {
    const { lastX, lastY, deg } = this.state;
    const x = this.state.x + e.pageX - lastX;
    const y = this.state.y + e.pageY - lastY;
    this.transformDraggable({ x, y, deg });
    this.setState(prevState => ({
      x: prevState.x + e.pageX - prevState.lastX,
      y: prevState.y + e.pageY - prevState.lastY,
      deg: (e.pageX - prevState.lastX) / 4,
      lastX: e.pageX,
      lastY: e.pageY,
    }));
  };

  onDrop = (draggableId, newDroppableId, lastDroppableId) => {
    if (this.props.onDrop) this.props.onDrop(draggableId, newDroppableId, lastDroppableId);
    if (this.props.shouldRebase) this.rebaseDraggable(draggableId, newDroppableId, lastDroppableId);
  };

  mouseMove = (e) => {
    if (this.state.dragStart) {
      e.persist();
      e.preventDefault();
      this.onDrag(e);
    } else {
      this.setState({
        lastY: e.pageY,
        lastX: e.pageX,
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

  renderDraggable = ID => (

    <Draggable
      key={ID}
      ID={ID}
      setDraggable={this.setDraggable}
      dragging={ID === this.state.draggableId}
    >
      {this.props.renderDraggableByID(ID)}
    </Draggable>

  );

  renderDroppableContainer = (container) => {
    const draggables = Object.keys(container.draggables).map(this.renderDraggable);
    return (
      <DroppableContainer
        key={container.ID}
        ID={container.ID}
        setDroppable={this.setDroppable}
      >
        {this.props.renderDroppableByID(
          draggables, container)}
      </DroppableContainer>
    );
  };

  rebaseDraggable = (draggableID, newDroppableID, lastDroppableID) => {
    this.setState((prevState) => {
      const containers = Object.assign({}, prevState.containers);
      const newDroppable = containers[newDroppableID];
      const oldDroppable = containers[lastDroppableID];

      containers[newDroppableID] = {
        ...newDroppable,
        draggables: {
          ...newDroppable.draggables,
          [draggableID]: {
            ID: draggableID,
            containerID: newDroppableID,
          },
        },
      };

      const updatedOldDraggables = { ...oldDroppable.draggables };
      delete updatedOldDraggables[draggableID];

      containers[lastDroppableID] = {
        ...oldDroppable,
        draggables: updatedOldDraggables,
      };

      return { containers };
    });
  };

  render() {
    return (
      <div // eslint-disable-line jsx-a11y/no-static-element-interactions
        className="area"
        onMouseDown={this.mouseDown}
        onMouseMove={this.mouseMove}
        onMouseUp={this.mouseUp}
        onMouseLeave={this.mouseUp}
      >
        {Object.values(this.state.containers).map(this.renderDroppableContainer)}
      </div>

    );
  }
}
export default DragArea;
