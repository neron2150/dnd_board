import React, { Component } from 'react';
class Movable1 extends Component {
//
// state = {
//   x:0,
//   y:0,
//   lx:0,
//   ly:0,
//   inDrag:false,
//   deg:0
// }
// move = (e) => {
//   if(this.state.inDrag)
//    this.setState({
//       x: this.state.x +e.clientX - this.state.lx,
//       y: this.state.y +e.clientY - this.state.ly,
//       deg: (e.clientX - this.state.lx)/4,
//       ly:e.clientY,
//       lx:e.clientX,
//
//     });
//   else {
//     this.setState({
//        ly:e.clientY,
//        lx:e.clientX
//   });
// }}
// onDown = (e) => {
//   this.setState({
//     inDrag:true
//   });
// }
// onUp = (e) => {
//   this.setState({
//     inDrag:false,
//     deg:0
//   });
// }
drag = (e)=>{
  console.log(e.type);
  e.preventDefault();
}
dragEnd = (e)=>{
  e.preventDefault();
  console.log(e.type);
}
dragEnter = (e)=>{
  e.preventDefault();
  console.log(e.type);
}
dragExit= (e)=>{
  e.preventDefault();
  console.log(e.type);
}
dragLeave = (e)=>{
  e.preventDefault();
  console.log(e.type);
}
dragOver = (e)=>{
  e.preventDefault();
  console.log(e.type);
}
dragStart= (e)=>{
  console.log(e.type);
  e.preventDefault();
}
render() {

    return (
      <div
      className='drag'
      draggable = 'true'
      onDrag = {this.drag}
      onDragEnd = {this.dragEnd}
      onDragEnter ={this.dragEnter}
      onDragExit={this.dragExit}
      onDragLeave ={this.dragLeave}
      onDragOver ={this.dragOver}
      onDragStart = {this.dragStart}
      // onMouseDown = {this.onDown}
      // onMouseUp = {this.onUp}
      // onMouseLeave = {this.onUp}
      // onMouseMove = {this.move}
      //
      // style={{
      //   color: '#fff',
      //   transform: 'translate('+this.state.x+'px, '+this.state.y+'px) rotate('+this.state.deg+'deg)',
      //   transition:'transform 50ms',
      // }}
      >
       <p>Movable comp 1</p>

      </div>
    );
  }
}

export default Movable1;
