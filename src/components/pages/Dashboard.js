import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskList from "../Tasks/TaskList";
import TaskForm from "../Tasks/TaskForm";
import "../styles/App.css";

// Static list of local quotes outside the component
const localQuotes = [
  "The best way to predict the future is to invent it. - Alan Kay",
  "Success is not the key to happiness. Happiness is the key to success. - Albert Schweitzer",
  "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
  "The harder you work for something, the greater you’ll feel when you achieve it. - Unknown",
  "Success doesn’t just find you. You have to go out and get it. - Unknown"
];

const Dashboard = () => {
  const [quote, setQuote] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Function to fetch a random quote from the API or fall back to local quotes
    const fetchQuote = () => {
      axios
        .get("https://zenquotes.io/api/random")
        .then((response) => {
          setQuote(`${response.data[0].q} - ${response.data[0].a}`);
        })
        .catch(() => {
          const randomLocalQuote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
          setQuote(randomLocalQuote);
        });
    };

    // Initially fetch the quote
    fetchQuote();

    // Set an interval to change the quote every 4 seconds
    const intervalId = setInterval(fetchQuote, 4000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  const handleAddTask = (taskName) => {
    const newTask = { name: taskName, completed: false };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Welcome to the Dashboard</h1>
      <p>Quote of the Day: {quote}</p>

      <TaskForm onAddTask={handleAddTask} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default Dashboard;
