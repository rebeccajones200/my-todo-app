import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from '@testing-library/user-event';
import App from './App';

describe("Task Manager App", () => {
  test("adds a new task", async () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/Enter a new task/i); //case-insensetive match
    const addButton =screen.getByRole("button", { name: /add task/i}); //more flexible matching
    
    await userEvent.type(input, "New task");
    fireEvent.click(addButton);

    expect(
      await screen.findByText((content) => content.includes("New task"))) 
  })
}); 

test("mark a task as completed", async () => {
  render(<App />);

  const input = screen.getByPlaceholderText("Enter a new task");
  const addButton = screen.getByText("add text");

  //Add a task
  await userEvent.type(input, "Complete this task");
  fireEvent.click(addButton);

  //Click complete task button
  const completeButton = screen.getByText("Complete");
  fireEvent.click(completeButton);

  //check if task has a strikethrough(complete was applied)
  const taskText = screen.getByText("Complete this task");
  expect(taskText).toHaveClass("completed");
});

test("deletes a task", async () => {
  render(<App />);

  const input = screen.getByPlaceholderText("Enter a new task");
  const addButton = screen.getByText((content) => content.includes("add task"));

  //Add a task
  await userEvent.type(input, "Task to delete");
  fireEvent.click(addButton);

  //Click delete task button
  const deleteButton = screen.getByText("Delete");
  fireEvent.click(deleteButton);

  //check if task is no longer in the document
  expect(screen.queryByText("Task to delete")).not.toBeInTheDocument();





});