const Task = ({ task, onArchiveTask, onPinTask }) => {
  const { id, title, state } = task;

  return <div className="list-item">
    <input type="text" value={title} readOnly/>
  </div>
}

export default Task;
