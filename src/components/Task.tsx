import React from "react";

//accepts functions and a task
interface Taskprops {
    task: {
        id: number;
        text: string; 
        completed: boolean;
    };
    index: number;
    toggleComplete: (index:number) => void;
    deleteTask: (index: number) => void;
}
//display task text, completed/undo button and delete button
const Task: React.FC<Taskprops> = ({ task, index, toggleComplete, deleteTask}) => {
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
export default Task;