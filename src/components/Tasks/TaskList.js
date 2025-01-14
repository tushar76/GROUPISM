import React from "react";

function TaskList({ tasks}) {
  const toggleComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    
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
