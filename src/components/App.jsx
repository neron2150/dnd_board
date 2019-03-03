import React, { Component } from 'react';
import './App.css';
import DroppableContainer from '../dnd/DroppableContainer';
import DragArea from '../dnd/DragArea';
import Draggable from '../dnd/Draggable';

const getRandomTasksIDs = (count) => {
  const tasks = [];

  for (let i = 0; i <= count; i++) {
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
  onDrop = (draggableId, droppableId) => ({ draggableId, droppableId });

  render() {
    return (
      <DragArea onDrop={this.onDrop}>
        {SECTIONS.map(
          sectionID => (
            <DroppableContainer
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
            </DroppableContainer>
          ),
        )}
      </DragArea>
    );
  }
}

export default App;
