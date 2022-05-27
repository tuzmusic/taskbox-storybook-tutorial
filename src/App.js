import './App.css';
import Task from "./components/Task";
import { Default } from "./components/Task.stories";

function App() {
  return (
    <div className="App">
      <Task task={Default.args.task}/>
    </div>
  );
}

export default App;
