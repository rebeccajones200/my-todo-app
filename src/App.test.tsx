import React from 'react';
import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from '@testing-library/user-event';
import App from './App';

test("adds a new task", async () => {
    render(<App />);

  //add a task
    const input = screen.getByPlaceholderText(/Enter a new task/i); //case-insensetive match
    const addButton =screen.getByRole("button", { name: /add task/i}); //more flexible matching
    
    await userEvent.type(input, "Test task");
    fireEvent.click(addButton);

  //wait for task to appear
    const taskItem = await screen.findByText("Test task");
    expect(taskItem).toBeInTheDocument();

//find first complete button
    const completeButton = screen.getByRole("button", { name: /complete/i});
    fireEvent.click(completeButton);

  //wait for button text to change to undo
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /undo/i })).toBeInTheDocument();
    });

  //ensure task has completed class
    expect(screen.getByRole("button",  { name: /undo/i } )).toBeInTheDocument();
  });

test("mark a task as completed", async () => {
  render(<App />);

  //Add a new task
  const input = screen.getByPlaceholderText(/enter a new task/i);
  const addButton = screen.getByRole("button", { name: /add task/i});

  await userEvent.type(input, "Complete Me");
  fireEvent.click(addButton);

  //wait for task to appear in list
  const taskItem = await screen.findByText("Complete Me");
  expect(taskItem).toBeInTheDocument();

  //find and click "complete" button
  const completeButton = screen.getByRole("button", { name: /complete/i });
  fireEvent.click(completeButton);

//wait for UI update and check correct element (li)
  await waitFor(() => {
    expect(taskItem.closest("li")).toHaveClass("completed");
  });
  expect(await screen.findByRole("button", { name: /undo/i })).toBeInTheDocument();
});






test("deletes a task", async () => {
  render(<App />);

  const input = screen.getByPlaceholderText(/enter a new task/i);
  const addButton =screen.getByRole("button", { name: /add task/i});

  //Add a task
  await userEvent.type(input, "Delete me");
  fireEvent.click(addButton);

//wait for task to appear
  const taskItem = await screen.findByText("Delete me");
    expect(taskItem).toBeInTheDocument();

  //find delete task button
  const deleteButton = screen.getByRole("button", { name: /delete/i});
  fireEvent.click(deleteButton);

  //ensure task is removed from Dom
  await waitFor(() => {
    expect(screen.queryByText("Delete Me")).not.toBeInTheDocument();

  });
  




});