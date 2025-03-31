import React from "react";
import type { Task } from "../types"


interface Taskprops {
    task: Task;
    index: number;
    toggleComplete: (index:number) => void;
    deleteTask: (index: number) => void;
}

const TaskComponent: React.FC<Taskprops> = ({ task, index, toggleComplete, deleteTask}) => {
    return (
        <li data-testid={`task-${index}`} className={`task-item ${task.completed ? "completed" : ""}`}>
            <span>{task.text}</span>
            <div>
                <button onClick={() => toggleComplete(index)} className="complete-btn">
                    {task.completed ? "Undo" : "Complete"}
                </button>
                <button onClick={() => deleteTask(index)} className="delete-btn">Delete</button>
            </div>
        </li>
        
    );
};
export default TaskComponent;