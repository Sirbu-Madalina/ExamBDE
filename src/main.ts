// 1 Import the CSS file: This ensures that the styles are applied to the HTML elements.
import './style.css';

// Step 2: Define the Todo interface. This interface defines the structure of a todo item.
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate: string; // Add due date
}

// Step 3: Initialize an empty array: This array will store the list of todos.
export let todos: Todo[] = []; 

// Step 4: Get references to the HTML elements: These references will be used to interact with the DOM
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.querySelector('.todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const errorMessage = document.getElementById('error-message') as HTMLParagraphElement;
const addButton = document.querySelector('.button-add') as HTMLButtonElement;
const prioritySelect = document.getElementById('priority-select') as HTMLSelectElement; // Make sure this is defined in your HTML
const dueDateInput = document.getElementById('due-date-input') as HTMLInputElement;

// Step 5: Add event listener for the "Add" button
addButton.addEventListener('click', () => {
  const text = todoInput.value.trim();
  const priority = prioritySelect.value as 'low' | 'medium' | 'high'; // Capture the priority value
  const dueDate = dueDateInput.value;  // Capture the due date

  if (text === '') {
    // Show error if input is empty
    console.log("Please enter a todo item");
    todoInput.classList.add('input-error');
    errorMessage.style.display = 'block';
  } else {
    // Add the todo if input is not empty
    todoInput.classList.remove('input-error');
    errorMessage.style.display = 'none';
    addTodo(text, priority, dueDate); // Pass the priority here and date
    todoInput.value = ''; // Clear the input field
  }
});

// Step 6: Function to add a new todo: This function creates a new todo object and adds it to the array.
export const addTodo = (text: string, priority: 'low' | 'medium' | 'high', dueDate: string): void => {
  const newTodo: Todo = {
    id: Date.now(),
    text: text,
    completed: false,
    priority: priority,
    dueDate: dueDate, // Add due date here
  };
  todos.push(newTodo);
  renderTodos();
};

// Step 7: Render todos
const renderTodos = (): void => {
  // Clear the current list
  todoList.innerHTML = '';

  // Iterate over the todos array and create list items for each todo
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = `todo-item priority-${todo.priority}`;
    
    // Create the HTML structure with a checkbox and the task text
    li.innerHTML = `
      <label class="container-checkbox">
      <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} />
      <span class="checkmark"></span>
      </label>
      <span style="text-decoration: ${todo.completed ? 'line-through' : 'none'}">${todo.text}</span>
      <span><strong>${todo.priority.toUpperCase()}</strong></span>
      <span>Due: ${todo.dueDate}</span>
      <button class="remove-btn">Remove
      <ion-icon name="trash-outline"></ion-icon>
      </button>
      <button class="edit-btn">Edit
      <ion-icon name="create-outline"></ion-icon>
      </button>
    `;
    // Add event listeners for the buttons and checkbox
    addRemoveButtonListener(li, todo.id);   // Remove button
    addEditButtonListener(li, todo.id);     // Edit button
    addCheckboxListener(li, todo.id);       // Checkbox toggle
    todoList.appendChild(li);
  });
};

// Step 8: Event listener for the form submission
  todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  const text = todoInput.value.trim(); // Trim whitespace from input value
  const priority = prioritySelect.value as 'low' | 'medium' | 'high'; // Capture the priority value
  const dueDate = dueDateInput.value;

  if (text === '') {
    // If the input is empty, show error message
    console.log("Please enter a todo item"); // Log message to console
    todoInput.classList.add('input-error'); // Highlight input field with an error style
    errorMessage.style.display = 'block'; // Show the error message
  } else {
    // If the input is valid, continue with adding todo
    todoInput.classList.remove('input-error'); // Clear any error styling
    errorMessage.style.display = 'none'; // Hide error message
    addTodo(text, priority, dueDate); // Pass the priority here
    todoInput.value = ''; // Clear the input field for new todos
  }
});

// Step 9: Function to removes all a todo by ID
// Function to add event listener to the remove button - this function has an callback function that removes the todo item from the array.
const addRemoveButtonListener = (li: HTMLLIElement, id: number): void => {
  const removeButton = li.querySelector('button');
  removeButton?.addEventListener('click', () => removeTodo(id)); // We have an optional chaining operator here to avoid errors if the button is not found - for example, if the button is removed from the DOM.
};

// Step 10: Function to remove a todo by ID. This function removes a todo from the array based on its ID.
export const removeTodo = (id: number): void => {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos(); // Re-render the updated list of todos
}; 

// Step 11: Function to add event listener for the edit button
const addEditButtonListener = (li: HTMLLIElement, id: number): void => {
  const editButton = li.querySelector('.edit-btn');  // Select the Edit button within the li
  editButton?.addEventListener('click', () => editTodo(id));  // Attach the click event listener
};

// Step 12: Edit function - prompt user to edit the todo
const editTodo = (id: number): void => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    const newText = prompt('Edit todo:', todo.text);
    if (newText !== null && newText.trim() !== '') {  // Check if text is not empty
      todo.text = newText.trim();
      renderTodos();  // Re-render the list to update the UI
    }
  }
};

//Optional features list: 
// Option 1: Add a button to toggle the completed status of a todo item
// Function to toggle the completed status of a todo + 
// Add a button to toggle the completed status of a todo item
// Function to add event listener to the checkbox
const addCheckboxListener = (li: HTMLLIElement, id: number): void => {
const checkbox = li.querySelector('.todo-checkbox') as HTMLInputElement;  // Find the checkbox within the li
checkbox?.addEventListener('change', () => toggleTodoStatus(id));  // Toggle the status on change event
};
// Function to toggle the completed status when the checkbox is changed
const toggleTodoStatus = (id: number): void => {
const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;  // Toggle the completed status
    renderTodos();  // Re-render the list to update the UI
  }
};

// Option 2: Add a button to clear all completed todos
// Add a button to clear all completed todos
// Function to clear all completed todos
// Add a button to toggle all todos
export const clearCompletedTodos = (): void => {
  todos = todos.filter(todo => !todo.completed);
  renderTodos(); // Refresh the todo list
};
document.addEventListener('DOMContentLoaded', () => {
  const clearCompletedBtn = document.getElementById('clear-completed-btn');
  clearCompletedBtn?.addEventListener('click', clearCompletedTodos);
});
export const toggleAllTodos = (): void => {
  const areAllCompleted = todos.every(todo => todo.completed);
  todos = todos.map(todo => ({
    ...todo,
    completed: !areAllCompleted,
  }));
  renderTodos(); // Refresh the todo list
};
document.addEventListener('DOMContentLoaded', () => {
  const toggleAllBtn = document.getElementById('toggle-all-btn');
  toggleAllBtn?.addEventListener('click', toggleAllTodos);
});

// Last Step: Function to render the list of todos
renderTodos(); // Call the renderTodos function to display the initial list of todos : Should be at the end of the code to ensure that the function is defined before it is called.
// The initial render is important to display the list of todos when the page is first loaded. Without it, the list would be empty until a new todo is added.


