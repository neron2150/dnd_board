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
    this.setState({
      dragStart: true,
      lastY: e.clientY,
      lastX: e.clientX,
      lastDroppableId: this.findCurrentContainerID(e.pageX, e.pageY),
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

  onDrop = (draggableId, newDroppableId, lastDroppableId) => {
    this.props.onDrop(draggableId, newDroppableId, lastDroppableId);
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

  renderDraggable = ID => (

    <Draggable
      key={ID}
      ID={ID}
      setDraggable={this.setDraggable}
    >
      {this.props.renderDraggableByID(ID)}
    </Draggable>

  );

  renderDroppableContainer = (container) => {
    const CONTAINER = (
      <DroppableContainer
        key={container.containerID}
        ID={container.containerID}
        setDroppable={this.setDroppable}
      >
        {container.draggables.map(draggable =>
          this.renderDraggable(draggable.ID),
        )}
      </DroppableContainer>
    );

    return this.props.renderDroppableByID(
      CONTAINER, container);
  };

  renderContent = () => this.props.containers.map(container => (
    this.renderDroppableContainer(container)
  ));

  rebaseDraggable = () => {

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
        {this.renderContent()}
      </div>

    );
  }
}
export default DragArea;
