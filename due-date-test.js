import { Selector } from 'testcafe';

fixture`Todo App Due Date Feature`
    .page`https://sirbumadalina.dk/test/todo/`;

const todoInput = Selector('#todo-input');
const prioritySelect = Selector('#priority-select');
const dueDateInput = Selector('#due-date-input');
const addButton = Selector('.button-add');
const todoList = Selector('#todo-list');
const errorMessage = Selector('#error-message');

test('Add todo with due date', async t => {
    // Define test data
    const todoText = 'Test due date todo';
    const priority = 'medium';
    const dueDate = '2024-12-01'; // Adjust the due date as necessary

    // Add a new todo
    await t
    .typeText(todoInput, todoText)
    .click(prioritySelect) // Click the dropdown to open it
    .click(prioritySelect.find('option').withText(priority)) // Select the option
    .typeText(dueDateInput, dueDate)
    .click(addButton);


// Attempt to add a todo without setting the due date
await t
    .typeText(todoInput, todoText) // Add text to the todo input
    .click(addButton);

// Check for the error message
await t
    .expect(errorMessage.visible).ok('Error message should be visible')
    .expect(errorMessage.innerText).eql('Please enter a todo item', 'Error message text should match');

});

test('Show error message when due date is not set', async t => {
    const todoText = 'Test todo without due date';

    await t
        .typeText(todoInput, todoText)
        .click(addButton);

    // Check for error message
    await t
        .expect(errorMessage.visible).ok('Error message should be visible')
        .expect(errorMessage.innerText).eql('Please enter a todo item', 'Error message text should match');
});
