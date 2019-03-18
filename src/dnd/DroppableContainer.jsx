import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DroppableContainer extends Component {
  componentDidMount() {
    this.props.setDroppable(this.container, this.props.ID);
  }

  render() {
    return (
      <div
        className="droppable"
        ref={(el) => {
          this.container = el;
        }}
      >

        {this.props.children}
      </div>
    );
  }
}
DroppableContainer.propTypes = {
  ID: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};
export default DroppableContainer;
