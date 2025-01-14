import React, { useState } from "react";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index} style={{ textDecoration: task.completed ? "line-through" : "none" }}>
          {task.name}
          <button onClick={() => toggleComplete(index)}>
            {task.completed ? "Undo" : "Complete"}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;

