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
        .selectText(prioritySelect)
        .click(prioritySelect.find('option').withText(priority))
        .typeText(dueDateInput, dueDate)
        .click(addButton);

    // Assert that the todo is added to the list
    const todoItem = todoList.find('li').withText(todoText);
    
    await t
        .expect(todoItem.exists).ok('Todo item should exist in the list')
        .expect(todoItem.innerText).contains(`Due: ${dueDate}`, 'Due date should be displayed correctly');

    // Optionally, check the priority displayed
    await t
        .expect(todoItem.innerText).contains(priority.toUpperCase(), 'Priority should be displayed correctly');
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
