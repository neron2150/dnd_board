import React, { Component } from 'react';
import './App.css';
import DropableContainer from '../dnd/DropableContainer';
import DragArea from '../dnd/DragArea';
import Draggable from '../dnd/Draggable';

const getRandomTasksIDs = (count) => {
  const tasks = [];

  for (let i = 0; i <= count; i++) { // eslint-disable-line
    tasks.push(Math.random().toString(36).substring(7));
  }

  return tasks;
};

const SECTIONS = ['todo', 'doing', 'done'];

const TASKS_BY_SECTIONS = SECTIONS.reduce(
  (acc, sectionID) => {
    acc[sectionID] = getRandomTasksIDs(5).map(
      taskID => ({
        ID: taskID,
        sectionID,
        status: sectionID,
      }),
    );

    return acc;
  },

  Object.create(null),
);

class App extends Component {
  onDrop = (draggableId, dropableId) => {
    console.log(draggableId, 'dropped in', dropableId);
  };

  render() {
    return (
      <DragArea onDrop={this.onDrop}>
        {SECTIONS.map(
          sectionID => (
            <DropableContainer
              key={sectionID}
              id={sectionID}
            >
              {TASKS_BY_SECTIONS[sectionID].map(
                task => (
                  <Draggable
                    key={task.ID}
                    id={task.ID}
                  />
                ),
              )}
            </DropableContainer>
          ),
        )}
      </DragArea>
    );
  }
}

export default App;
