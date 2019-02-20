import React, { Component } from 'react';
import './App.css';
import DropableContainer from '../dnd/DropableContainer';
import DragArea from '../dnd/DragArea';
import Draggable from '../dnd/Draggable';

class App extends Component {
  render() {
    return (
      <DragArea>
        <DropableContainer>
          <Draggable />
          <Draggable />
          <Draggable />
          <Draggable />

        </DropableContainer>
      </DragArea>
    );
  }
}

export default App;
