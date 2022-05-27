import Task from "./Task";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskState } from "../lib/store";

const LoadingRow = (
  <div className="loading-item">
    <span className="glow-checkbox"/>
    <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
  </div>
);

const Loading = () =>
  (
    <div className="list-items" data-testid="loading" key={"loading"}>
      {LoadingRow}
      {LoadingRow}
      {LoadingRow}
      {LoadingRow}
      {LoadingRow}
      {LoadingRow}
    </div>
  )

const Empty = () => <div className="list-items" key={"empty"} data-testid="empty">
  <div className="wrapper-message">
    <span className="icon-check"/>
    <div className="title-message">You have no tasks</div>
    <div className="subtitle-message">Sit back and relax</div>
  </div>
</div>

const getTasks = state => {
  const tasksInOrder = [
    ...state.taskbox.tasks.filter((t) => t.state === 'TASK_PINNED'),
    ...state.taskbox.tasks.filter((t) => t.state !== 'TASK_PINNED'),
  ];
  return tasksInOrder.filter(
    (t) => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'
  );
}

const TaskList = () => {
  const tasks = useSelector(getTasks)

  const loading = useSelector(state => state.taskbox.status === 'loading')
  const dispatch = useDispatch()

  const pinTask = value => dispatch(updateTaskState({ id: value, newTaskState: 'TASK_PINNED' }));
  const archiveTask = value => dispatch(updateTaskState({ id: value, newTaskState: 'TASK_ARCHIVED' }));

  const events = { pinTask, archiveTask }

  if (loading) return <Loading/>
  if (!tasks.length) return <Empty/>

  const tasksInOrder = [
    ...tasks.filter((t) => t.state === "TASK_PINNED"),
    ...tasks.filter((t) => t.state !== "TASK_PINNED"),
  ];

  return (
    <div className="list-items" data-testid="success" key={"success"}>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onPinTask={(task) => pinTask(task)}
          onArchiveTask={(task) => archiveTask(task)}
        />
      ))}
    </div>
  );
}

export default TaskList;
