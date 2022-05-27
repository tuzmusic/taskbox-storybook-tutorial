import Task from "./Task";
import PropTypes from "prop-types";

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

const TaskList = ({ loading, tasks, onPinTask, onArchiveTask }) => {
  const events = { onPinTask, onArchiveTask }

  if (loading) return <Loading/>
  if (!tasks.length) return <Empty/>

  const tasksInOrder = [
    ...tasks.filter((t) => t.state === "TASK_PINNED"),
    ...tasks.filter((t) => t.state !== "TASK_PINNED"),
  ];

  return (
    <div className="list-items">
      {tasksInOrder.map((task) => (
        <Task key={task.id} task={task} {...events} />
      ))}
    </div>
  );

}

export default TaskList;

TaskList.propTypes = {
  /** Checks if it's in loading state */
  loading: PropTypes.bool,
  /** The list of tasks */
  tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
  /** Event to change the task to pinned */
  onPinTask: PropTypes.func,
  /** Event to change the task to archived */
  onArchiveTask: PropTypes.func,
};
TaskList.defaultProps = {
  loading: false,
};
