import React from "react";
import type { Task } from "../types"


interface TaskProps {
    task: Task;
    toggleComplete: (id:number) => void;
    deleteTask: (id: number) => void;
}

const TaskComponent: React.FC<TaskProps> = ({ task, toggleComplete, deleteTask}) => {
    return (
        <li className= {`task-list-item ${task.completed ? "completed" : ""}`}>
            <span>{task.text}</span>
            <div> 
            <button onClick={() => toggleComplete(task.id)} className="complete-btn">
                   {task.completed ? "Undo" : "Complete"}
             </button>
             <button onClick={() => deleteTask(task.id)} className="delete-btn">Delete</button>

            </div>
        </li>
      
    );
};
export default TaskComponent;