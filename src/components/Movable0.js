import React, { Component } from 'react';

class Movable0 extends Component {
state = {
  x: 0,
  y: 0,
  lx: 0,
  ly: 0,
  inDrag: false,
  deg: 0,
  over: false,
}

move = (e) => {
  if (this.state.inDrag && this.container) {
    const { lx, ly, deg } = this.state;
    const x = this.state.x + e.clientX - lx;
    const y = this.state.y + e.clientY - ly;

    this.container.style.transform = `translate(${x}px, ${y}px) rotate(${deg}deg)`;
    this.setState({
      x,
      y,
      deg: (e.clientX - lx) / 4,
      lx: e.clientX,
      ly: e.clientY,
    });
  } else {
    this.setState({
      ly: e.clientY,
      lx: e.clientX,
    });
  }
}

onOverLeave = () => {
  this.setState({ over: true });
}

onDown = (e) => {
  this.container.style['user-select'] = 'none';
  this.setState({
    inDrag: true,
  });
}

onUp = (e) => {
  const defaultDeg = 0;
  if (this.container) {
    this.container.style['user-select'] = 'initial';
    this.container.style.transform =
      `translate(${this.state.x}px, ${this.state.y}px) rotate(${defaultDeg}deg)`;
  }

  this.setState({
    inDrag: false,
    deg: defaultDeg,
    over: false,
  });
}

render() {
  return (
    <div
      ref={(el) => { this.container = el; }}
      className="drag"
      onMouseDown={this.onDown}
      onMouseUp={this.onUp}
      onMouseLeave={this.onUp}
      onMouseMove={this.move}
      onMouseOver={this.onOverLeave}
      stile={{ background: '#ffffff' }}
    />
  );
}
}

export default Movable0;
