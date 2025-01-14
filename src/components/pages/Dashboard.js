import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskList from "../Tasks/TaskList";
import TaskForm from "../Tasks/TaskForm";

const Dashboard = () => {
  const [quote, setQuote] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("https://api.quotable.io/random").then((response) => {
      setQuote(response.data.content);
    }).catch(() => {
      setQuote("Stay positive! Here's a fallback motivational message.");
    });
  }, []);

  const handleAddTask = (taskName) => {
    const newTask = { name: taskName, completed: false };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Welcome to the Dashboard</h1>
      <p>Quote of the Day: {quote}</p>

      {/* Pass the handler function to TaskForm */}
      <TaskForm onAddTask={handleAddTask} />
      <TaskList tasks={tasks}  />
    </div>
  );
};

export default Dashboard;
