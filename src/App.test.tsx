import React from 'react';
import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from '@testing-library/user-event';
import App from './App';

test("adds a new task", async () => {
    render(<App />);


    const input = screen.getByPlaceholderText(/Enter a new task/i); 
    const addButton =screen.getByRole("button", { name: /add task/i}); 
    
    await userEvent.type(input, "Test task");
    fireEvent.click(addButton);


    const taskItem = await screen.findByText("Test task");
    expect(taskItem).toBeInTheDocument();


    const completeButton = screen.getByRole("button", { name: /complete/i});
    fireEvent.click(completeButton);

  
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /undo/i })).toBeInTheDocument();
    });

  
    expect(screen.getByRole("button",  { name: /undo/i } )).toBeInTheDocument();
  });

test("mark a task as completed", async () => {
  render(<App />);

  
  const input = screen.getByPlaceholderText(/enter a new task/i);
  const addButton = screen.getByRole("button", { name: /add task/i});

  await userEvent.type(input, "Complete Me");
  fireEvent.click(addButton);

  
  const taskItem = await screen.findByText("Complete Me");
  expect(taskItem).toBeInTheDocument();

  
  const completeButton = screen.getByRole("button", { name: /complete/i });
  fireEvent.click(completeButton);


  await waitFor(() => {
    expect(taskItem.closest("li")).toHaveClass("completed");
  });
  expect(await screen.findByRole("button", { name: /undo/i })).toBeInTheDocument();
});






test("deletes a task", async () => {
  render(<App />);

  const input = screen.getByPlaceholderText(/enter a new task/i);
  const addButton =screen.getByRole("button", { name: /add task/i});

  
  await userEvent.type(input, "Delete me");
  fireEvent.click(addButton);


  const taskItem = await screen.findByText("Delete me");
    expect(taskItem).toBeInTheDocument();

 
  const deleteButton = screen.getByRole("button", { name: /delete/i});
  fireEvent.click(deleteButton);

  
  await waitFor(() => {
    expect(screen.queryByText("Delete Me")).not.toBeInTheDocument();

  });
  




});