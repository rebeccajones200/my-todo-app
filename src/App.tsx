import React, { useState } from 'react';
import Task from "./components/Task";
import TaskInput from "./components/TaskInput";
import './App.css';


interface Task {
  id: number;
  text: string;
  completed: boolean;
}

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
          <Task
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
