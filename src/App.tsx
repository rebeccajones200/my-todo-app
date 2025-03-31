import React, { useState } from 'react';
import TaskComponent from "./components/Task";
import TaskInput from "./components/TaskInput";
import './App.css';
import { Task } from "./types";



const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
 
  const addTask = (taskText: string): void => {
    const newTask: Task = {
      id: Date.now(), 
      text: taskText, 
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]); 
  };
 
  
  const toggleComplete = (index: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i == index ? { ...task, completed: !task.completed } :task
      )
    );
  };

 
  const deleteTask = (index: number) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  
  return (
    <div className='container'> 
    <h1>Task Manager</h1>
      <TaskInput addTask={addTask} />
      <ul className='task-list'>   
        {tasks.map((task, index) => (
          <TaskComponent
            key={task.id} 
            task={task}
            index={index} 
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
};
export default App;
