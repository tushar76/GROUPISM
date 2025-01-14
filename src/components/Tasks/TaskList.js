import React from "react";

function TaskList({ tasks  , setTasks}) {
  const toggleComplete = (indexToRemove) => {
    // tasks[index].completed = !tasks[index].completed;
    setTasks((prevTasks) => prevTasks.filter((_, index) => index !== indexToRemove));
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
