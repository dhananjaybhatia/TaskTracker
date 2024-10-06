import Task from "./Task";

export default function Tasks({ tasks, onDelete }) {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          <Task key={task.id} task={task} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
}
