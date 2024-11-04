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
    const todoText = 'Test due date todo';
    const priority = 'medium';
    const dueDate = '2024-12-01';

    await t.wait(1000); // Optional: Wait for the dropdown to be available

    await t
        .typeText(todoInput, todoText)
        .click(prioritySelect) 
        .click(prioritySelect.find('option').withText(priority))
        .typeText(dueDateInput, dueDate)
        .click(addButton);

    // Verify the todo is added (if applicable, check the todo list here)
});

test('Show error message when due date is not set', async t => {
    const todoText = 'Test todo without due date';

    await t
        .typeText(todoInput, todoText)
        .click(addButton);

    await t
        .expect(errorMessage.exists).ok('Error message element should exist')
        .expect(errorMessage.visible).ok('Error message should be visible')
        .expect(errorMessage.innerText).eql('Please enter a todo item', 'Error message text should match');
});
