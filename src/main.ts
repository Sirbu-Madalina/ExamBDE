// 1 Import the CSS file: This ensures that the styles are applied to the HTML elements.
import './style.css';

// Step 2: Define the Todo interface
// Define the Todo interface: This interface defines the structure of a todo item.
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Step 3: Initialize an empty array to store todos
// Initialize an empty array: This array will store the list of todos.
export let todos: Todo[] = []; 

// Step 4: Get references to the HTML elements
// Get references to the HTML elements: These references will be used to interact with the DOM
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.querySelector('.todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const errorMessage = document.getElementById('error-message') as HTMLParagraphElement;
const addButton = document.querySelector('.button-add') as HTMLButtonElement;

// Add event listener for the "Add" button
addButton.addEventListener('click', () => {
  const text = todoInput.value.trim();
  
  if (text === '') {
    // Show error if input is empty
    console.log("Please enter a todo item");
    todoInput.classList.add('input-error');
    errorMessage.style.display = 'block';
  } else {
    // Add the todo if input is not empty
    todoInput.classList.remove('input-error');
    errorMessage.style.display = 'none';
    addTodo(text);
    todoInput.value = ''; // Clear the input field
  }
});

// Step 5: Function to add a new todo
// Function to add a new todo: This function creates a new todo object and adds it to the array.
export const addTodo = (text: string): void => {
  const newTodo: Todo = {
    id: Date.now(), // Generate a unique ID based on the current timestamp
    text: text,
    completed: false,
  };
  todos.push(newTodo);
  console.log("Todo added: ", todos); // Log the updated list of todos to the console
  renderTodos(); // Render the updated list of todos => create the function next
};

const renderTodos = (): void => {
  // Clear the current list
  todoList.innerHTML = '';

  // Iterate over the todos array and create list items for each todo
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    
    // Create the HTML structure with a checkbox and the task text
    li.innerHTML = `
      <label class="container-checkbox">
      <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} />
      <span class="checkmark"></span>
      </label>
      <span style="text-decoration: ${todo.completed ? 'line-through' : 'none'}">${todo.text}</span>
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

// Step 7: Event listener for the form submission
  todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  const text = todoInput.value.trim(); // Trim whitespace from input value

  if (text === '') {
    // If the input is empty, show error message
    console.log("Please enter a todo item"); // Log message to console
    todoInput.classList.add('input-error'); // Highlight input field with an error style
    errorMessage.style.display = 'block'; // Show the error message
  } else {
    // If the input is valid, continue with adding todo
    todoInput.classList.remove('input-error'); // Clear any error styling
    errorMessage.style.display = 'none'; // Hide error message
    addTodo(text); // Add the todo item
    todoInput.value = ''; // Clear the input field for new todos
  }
});


// Step 8: Function to removes all a todo by ID
// Function to add event listener to the remove button - this function has an callback function that removes the todo item from the array.
const addRemoveButtonListener = (li: HTMLLIElement, id: number): void => {
  const removeButton = li.querySelector('button');
  removeButton?.addEventListener('click', () => removeTodo(id)); // We have an optional chaining operator here to avoid errors if the button is not found - for example, if the button is removed from the DOM.
};

/*
example of explicit null checking - without optional chaining operator, but basically the same as above
const addRemoveButtonListener = (li: HTMLLIElement, id: number): void => {
  const removeButton = li.querySelector('button');
  if (removeButton) {
    removeButton.addEventListener('click', () => removeTodoById(id));
  } else {
    console.error(`Remove button not found for todo item with ID: ${id}`);
  }
};
*/

// Step 8: Function to remove a todo by ID
// Function to remove a todo by ID: This function removes a todo from the array based on its ID.
export const removeTodo = (id: number): void => {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos(); // Re-render the updated list of todos
}; 

// Function to add event listener for the edit button
const addEditButtonListener = (li: HTMLLIElement, id: number): void => {
  const editButton = li.querySelector('.edit-btn');  // Select the Edit button within the li
  editButton?.addEventListener('click', () => editTodo(id));  // Attach the click event listener
};

// Edit function - prompt user to edit the todo
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

/**
 * color picker
 */
// Function to change the background color of the page based on the color picker value
const changeBackgroundColor = (color: string): void => {
  document.body.style.backgroundColor = color;
};

// Function to initialize the color picker event listener
const initializeColorPicker = (): void => {
  const colorPicker = document.getElementById('colorPicker') as HTMLInputElement; // encapsulate the color picker element to this function
  if (colorPicker) {
    colorPicker.addEventListener('input', (event: Event) => {
      const target = event.target as HTMLInputElement;
      changeBackgroundColor(target.value);
    });
  } else {
    console.error('Color picker element not found');
  }
};

// Call the initializeColorPicker function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeColorPicker();
});

// Step 6.1: Function to render the list of todos
// Initial render
renderTodos(); // Call the renderTodos function to display the initial list of todos : Should be at the end of the code to ensure that the function is defined before it is called.
// The initial render is important to display the list of todos when the page is first loaded. Without it, the list would be empty until a new todo is added.
// Move it when code is complete ( refactoring ) 





/** 
 * Kristian: 6th of September 2024, BDE
 * 
 * This is the list of optional features that can be added to the todo list application:
 * You must make at least one of these features to complete the project. The more the merrier.
 * In your submission video, please mention which feature you have implemented and demonstrate how it works. Go through the code and explain how you implemented the feature and how it works.
 * IF, you want to implement something not on list, you can do that as well.
*/


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

// Event listener for the "Add" button to toggle the visibility of the input field
addButton.addEventListener('click', () => {
todoInput.classList.toggle('hidden');  // Toggle the 'hidden' class to show/hide the input field
todoInput.focus();  // Optionally focus on the input field when shown
});


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


// Option 3: Add a button to toggle all todos
// Edit a todo item and update it
// Add an input field to edit a todo item
// Save the updated todo item
// Cancel the editing of a todo item
// Add a button to cancel the editing of a todo item

// Option 4: Add a button to filter todos by status
// Add a button to filter todos by status
// Function to filter todos by status

// Option 5: Add a button to sort todos by status
// Add a button to sort todos by status
// Function to sort todos by status

// Option 6: Due Date for Todos:
// Add a date input field to set a due date for each todo item.
// Display the due date next to each todo item.
// Highlight overdue todos.
// Priority Levels:

// Option 7: Add a dropdown to set the priority level (e.g., Low, Medium, High) for each todo item.
// Display the priority level next to each todo item.
// Sort todos by priority.
// Search Functionality:

// Option 8: Add a search input field to filter todos based on the search query.
// Display only the todos that match the search query.
// Category Tags:

// Option 9: Add a text input field to assign category tags to each todo item.
// Display the tags next to each todo item.
// Filter todos by category tags.
// Progress Indicator:

// Option 10: Add a progress bar to show the percentage of completed todos.
// Update the progress bar as todos are marked as completed or incomplete.
// Dark Mode Toggle:

// Option 11: Add a button to toggle between light and dark modes.
// Change the app's theme based on the selected mode.
// Export/Import Todos:


// Option 12: Add buttons to export the list of todos to a JSON file.
// Add functionality to import todos from a JSON file.
// Notifications:

// Option 13: Add notifications to remind users of due todos.
// Use the Notification API to show browser notifications.

// Option 14: Local Storage:
// Save the list of todos to local storage.
// Retrieve the todos from local storage on page load.
// Add a button to clear all todos from local storage.

// Option 15: JSDOC Comments:
// Add JSDoc comments to document the functions and interfaces in the code.
// Link : https://jsdoc.app/

// Optional 16: Handle Errors:
// Add error handling for user input validation. Show red text or border for invalid input.
// Display error messages for invalid input.