import React, { useState} from "react";


interface TaskInputProps {
    addTask: (taskText: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ addTask }) => {
    const [taskText, setTaskText] = useState("");
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskText(e.target.value);
    };

    
    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        if (taskText.trim()) {
            addTask(taskText);
            setTaskText("");
        }
    }


    return (
        <form onSubmit={handleSubmit} className="task-form">
            <input
                type="text"
                value={taskText}
                onChange={handleInputChange}
                placeholder="Enter a new task"
                className="task-input"
            />
            <button type="submit" className="task-button">Add Task</button>
        </form>
    );
}
export default TaskInput;


