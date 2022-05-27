import TaskList from './TaskList';
import { MockedState, MockStore, mockTasks } from "../stories/MockStore";

export default {
  component: TaskList,
  title: 'TaskList',
  decorators: [story => <div style={{ padding: '3rem' }}>{story()}</div>],
  excludeStories: /.*MockedState$/,
};

const Template = args => <TaskList {...args} />;

export const Default = {
  args: {
    // tasks: mockTasks,
  },
  decorators: [
    story => <MockStore story={story}/>
  ]
}

export const WithPinnedTasks = Template.bind({});
WithPinnedTasks.decorators = [
  (story) => {
    const tasks = [
      ...MockedState.tasks.slice(0, 5),
      { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' },
    ];

    return (
      <MockStore stateOverride={{ tasks }} story={story}/>
    );
  },
];

export const Loading = Template.bind({});
Loading.decorators = [
  (story) => (
    <MockStore stateOverride={{ status: 'loading', }} story={story}/>
  ),
];

export const Empty = Template.bind({});
Empty.decorators = [
  (story) => (
    <MockStore stateOverride={{ tasks: [], }} story={story}/>
  ),
];
