import TaskList from './TaskList';
import * as TaskStories from './Task.stories';

export default {
  component: TaskList,
  title: 'TaskList',
  decorators: [story => <div style={{ padding: '3rem' }}>{story()}</div>],
};

const Template = args => <TaskList {...args} />;
const task = TaskStories.Default.args.task;

export const Default = {
  args: {
    tasks: [
      { ...task, id: '1', title: 'Task 1' },
      { ...task, id: '2', title: 'Task 2' },
      { ...task, id: '3', title: 'Task 3' },
      { ...task, id: '4', title: 'Task 4' },
      { ...task, id: '5', title: 'Task 5' },
      { ...task, id: '6', title: 'Task 6' },
    ],
  }
}

export const WithPinnedTasks = Template.bind({});
WithPinnedTasks.args = {
  // Shaping the stories through args composition.
  // Inherited data coming from the Default story.
  tasks: [
    ...Default.args.tasks.slice(0, 5),
    { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  tasks: [],
  loading: true,
};

export const Empty = Template.bind({});
Empty.args = {
  // Shaping the stories through args composition.
  // Inherited data coming from the Loading story.
  ...Loading.args,
  loading: false,
};
