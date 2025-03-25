import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from '@testing-library/user-event';
import App from './App';

describe("Task Manager App", () => {
  test("adds a new task", async () => {
    render(<App />);

    const input = screen.getByPlaceholderText("Enter a new task");
    const addButton =screen.getByText("Add Task");

    await userEvent.type(input, "New task");
    fireEvent.click(addButton);

    expect(screen.getByText("New Task")).toBeInTheDocument();
  })
}); 

