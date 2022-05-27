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
    tasks: mockTasks,
  },
  decorators: [
    story => <MockStore taskboxState={MockedState}>{story()}</MockStore>
  ]
}

export const WithPinnedTasks = Template.bind({});
WithPinnedTasks.decorators = [
  (story) => {
    const pinnedtasks = [
      ...MockedState.tasks.slice(0, 5),
      { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' },
    ];

    return (
      <MockStore
        taskboxState={{
          ...MockedState,
          tasks: pinnedtasks,
        }}
      >
        {story()}
      </MockStore>
    );
  },
];

export const Loading = Template.bind({});
Loading.decorators = [
  (story) => (
    <MockStore
      taskboxState={{
        ...MockedState,
        status: 'loading',
      }}
    >
      {story()}
    </MockStore>
  ),
];

export const Empty = Template.bind({});
Empty.decorators = [
  (story) => (
    <MockStore
      taskboxState={{
        ...MockedState,
        tasks: [],
      }}
    >
      {story()}
    </MockStore>
  ),
];
/*

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
*/
