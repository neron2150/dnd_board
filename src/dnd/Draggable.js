import React, {Component} from 'react';
import {DndContext} from './DndContext'
class Draggable extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <DndContext.Consumer>
        {(value)=> (
          <div>
            {this.props.children}
          </div>
        )}
      </DndContext.Consumer>

    );
  }
}
export default Draggable;
