import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";

  fireEvent.change(inputTask, {target: {value: "History Test"}});
  fireEvent.change(inputDate, {target: {value:dueDate}});
  fireEvent.click(element);
  fireEvent.click(element);

  const checkTasks= screen.getAllByText(/History Test/i);
  expect(checkTasks.length).toBe(1);
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";

  fireEvent.change(inputDate, {targe: {value:dueDate}});
  fireEvent.click(element);
  const checkTasks= screen.queryByText(/History Test/i);
  expect(checkTasks).toBeNull();

 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const intputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const element = screen.getByRole('button', {name: /Add/i});
  fireEvent.change(intputTask, {target: {value: "History Test"}});
  fireEvent.click(element);
  const checkTasks= screen.queryByText(/History Test/i);
  expect(checkTasks).toBeNull();
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, {target:{value:'History Test'}});
  fireEvent.change(inputDate, {target:{value:dueDate}});
  fireEvent.click(element);
  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);
  const checkTasks= screen.queryByText(/History Test/i);
  expect(checkTasks).toBeNull();
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const overDueDate = "05/30/2023";
  fireEvent.change(inputTask, {target:{value:'History Test'}});
  fireEvent.change(inputDate, {target:{value:overDueDate}});
  fireEvent.click(element);
  const card = screen.getByTestId('History Test');
  expect(card).toHaveStyle('background-color: red');


 });
