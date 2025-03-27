import React, { useState } from 'react';
import Task from "./components/Task";
import TaskInput from "./components/TaskInput";
import './App.css';

//what task looks like
interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]); //state to store tasks
 
  const addTask = (taskText: string): void => {
    const newTask: Task = {
      id: Date.now(), //generating a unique id
      text: taskText, 
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]); //updating the state
  };
 
  //finnd task in list, switch completed i.e true or false
  const toggleComplete = (index: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i == index ? { ...task, completed: !task.completed } :task
      )
    );
  };

 //delete task
  const deleteTask = (index: number) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  //pass addTask to taskInput and loop through task array and renders
  return (
    <div className='conatiner'> 
    <h1>Task Manager</h1>
      <TaskInput addTask={addTask} />
      <ul className='task-list'>   
        {tasks.map((task, index) => (
          <Task
            key={task.id} //ensure key is unique
            task={task}
            index={index} //pass the index to task component
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
};
export default App;
