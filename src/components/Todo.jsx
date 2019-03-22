import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Todo extends Component {
  render() {
    return (
      <div className="todo">
        <p>{`User ${this.props.userId}`}</p>
        <p>{` ${this.props.title}`}</p>
      </div>
    );
  }
}

Todo.propTypes = {
  userId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default Todo;
