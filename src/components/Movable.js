import React, { Component } from 'react';
class Movable extends Component {
  
 
  render() {
    
    return (
      <div 
      onMouseOver={this.props.mouseover}
      onMouseOut={this.props.mouseout}
      
      >
       <p>Movable comp 1</p>
       <p>X={this.props.x}</p>
       <p>Y={this.props.y}</p>
       <p>mouseOn={this.props.mouseOn.toString()}</p>
       
      </div>
    );
  }
}

export default Movable;