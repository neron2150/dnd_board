import React, { Component } from 'react';
import './App.css';
import DropableContainer from '../dnd/DropableContainer';
import DragArea from '../dnd/DragArea';
import Draggable from '../dnd/Draggable';

class App extends Component {
  render() {
    return (
      <DragArea>

        <DropableContainer id={12}>
          <Draggable id={0} />
          <Draggable id={1} />
          <Draggable id={2} />
          <Draggable id={3} />
        </DropableContainer>

        <DropableContainer id={13}>
          <Draggable id={4} />
          <Draggable id={5} />
          <Draggable id={6} />
          <Draggable id={7} />
        </DropableContainer>

        <DropableContainer id={14}>
          <Draggable id={8} />
          <Draggable id={9} />
          <Draggable id={10} />
          <Draggable id={11} />

        </DropableContainer>
      </DragArea>
    );
  }
}

export default App;
