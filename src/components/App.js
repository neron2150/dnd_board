import React, { Component } from 'react';
import './App.css';
import Movable from './Movable';
import Movable0 from './Movable0';
import Movable1 from './Movable1';
import DropableContainer from './DropableContainer';
import DragArea from './DragArea';
import Draggable from './Draggable';

class App extends Component {
  render(){
    return (
      <DragArea >
        <DropableContainer>
          <Draggable>
            <Movable1/>
          </Draggable>
        </DropableContainer>
        <Movable0/>
        <Movable/>
      </DragArea>
    );
  }
}

export default App;
