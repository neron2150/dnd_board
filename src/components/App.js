import React, { Component } from 'react';
import './App.css';
import Movable from './Movable';
import Movable0 from './Movable0';
import Movable1 from './Movable1';
import DropableContainer from '../dnd/DropableContainer';
import DragArea from '../dnd/DragArea';
import Draggable from '../dnd/Draggable';

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
