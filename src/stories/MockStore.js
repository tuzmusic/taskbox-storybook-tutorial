import * as TaskStories from "../components/Task.stories";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

const task = TaskStories.Default.args.task;
export const mockTasks = [
  { ...task, id: '1', title: 'Task 1' },
  { ...task, id: '2', title: 'Task 2' },
  { ...task, id: '3', title: 'Task 3' },
  { ...task, id: '4', title: 'Task 4' },
  { ...task, id: '5', title: 'Task 5' },
  { ...task, id: '6', title: 'Task 6' },
];

export const MockedState = {
  tasks: mockTasks,
  status: 'idle',
  error: null
}

export const MockStore = ({ taskboxState, children }) => {
  const store = configureStore({
    reducer: {
      taskbox: createSlice({
        name: 'taskbox',
        initialState: taskboxState,
        reducers: {
          updateTaskState: (state, action) => {
            const { id, newTaskState } = action.payload;
            const task = state.tasks.findIndex((task) => task.id === id);
            if (task >= 0) {
              state.tasks[task].state = newTaskState;
            }
          },
        },
      }).reducer,
    }
  })

  return <Provider store={store}>{children}</Provider>
}
