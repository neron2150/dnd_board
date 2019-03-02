import React, { Component } from 'react';
import { DndContext } from './DndContext';

class DropableContainer extends Component {
  state = {
    isSet: false,
  };

  componentDidMount() {
    if (!this.state.isSet) {
      this.setState({ isSet: true });
      this.context.setDropable(this.container, this.props.id);
    }
  }

  render() {
    return (

      <DndContext.Consumer>
        {value => (
          <div
            className="container"
            ref={(el) => {
              this.container = el;
            }}
          >
            <p>{this.props.id}</p>
            {this.props.children}
          </div>
        )
         }
      </DndContext.Consumer>
    );
  }
}
DropableContainer.contextType = DndContext;
export default DropableContainer;
