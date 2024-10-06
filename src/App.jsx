import { useState } from "react";
import Header from "./components/Header"; // Use the correct relative path
import Tasks from "./components/Tasks"; // Use the correct relative path
import { v4 as uuidv4 } from "uuid";
import AddTask from "./components/AddTask";

export default function App() {
  const [showAddTask, setShowAddTask] = useState(true);
  const [tasks, setTasks] = useState([]);

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Add Task

  const addTask = (task) => {
    const newTask = { id: uuidv4(), ...task };
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="max-w-[800px] mx-auto my-[30px] overflow-auto min-h-[500px] border border-solid border-orange-600 p-[30px] rounded-md">
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} />
      ) : (
        <p className="text-orange-700 font-semibold"> No Task to Show!</p>
      )}
    </div>
  );
}
