import React, { Component } from 'react';
import './App.css';
import Todos from './Todos';
import Universities from './Universities';
import Movable from './Movable';
import Movable0 from './Movable0';
import Movable1 from './Movable1';
import DropableContainer from './DropableContainer';
import DragArea from './DragArea';
import Draggable from './Draggable';

class App extends Component {

  render() {

    return (


      <DragArea className='app'>
        <DropableContainer>
          <Draggable>
          <p> ЭЭЭЭЙ</p>
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
