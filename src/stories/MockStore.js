import * as TaskStories from "../components/Task.stories";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { TasksSlice } from "../lib/store";
import { create } from "react-test-renderer";

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

const configurableSlice = stateOverride => ({
  ...TasksSlice,
  initialState: { ...TasksSlice.getInitialState(), tasks: mockTasks, ...stateOverride }
})

export const MockStore = ({ stateOverride = {}, children, story }) => {
  const configuredSlice = configurableSlice(stateOverride)

  const store = configureStore({
    reducer: {
      taskbox: createSlice(configuredSlice).reducer,
    }
  })

  return <Provider store={store}>{story?.call({}) || children}</Provider>
}
