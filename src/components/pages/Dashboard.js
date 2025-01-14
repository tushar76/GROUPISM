import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskList from "../Tasks/TaskList";
import TaskForm from "../Tasks/TaskForm";

const Dashboard = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    axios.get("https://api.quotable.io/random").then((response) => {
      setQuote(response.data.content);
    });
  }, []);

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>Quote of the Day: {quote}</p>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default Dashboard;

