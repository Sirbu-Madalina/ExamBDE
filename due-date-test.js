import { Selector } from 'testcafe';

fixture `TODO App Due Date Feature`
    .page `https://sirbumadalina.dk/test/todo/`; 

// Define selectors
const todoInput = Selector('#todo-input');
const prioritySelect = Selector('#priority-select');
const dueDateInput = Selector('#.date-pick');
const addButton = Selector('.button-add');
const todoList = Selector('#todo-list');
const todoItem = Selector('.todo-item');

// Test to edit a TODO item's due date
test('Edit TODO item due date', async t => {
    const sampleTodoText = 'Edit Due Date TODO';
    const initialDueDate = '2024-11-30';
    const newDueDate = '2025-01-15';
    
    // Step 1: Add a new TODO item with initial due date
    await t
        .typeText(todoInput, sampleTodoText)
        .click(prioritySelect)
        .click(prioritySelect.find('option').withText('Medium'))
        .typeText(dueDateInput, initialDueDate)
        .click(addButton)
        .expect(todoList.childElementCount).eql(1)
        .expect(todoItem.withText(`${sampleTodoText}`).exists).ok()
        .expect(todoItem.withText(`Due: ${initialDueDate}`).exists).ok();
    
    // Step 2: Edit the due date of the added TODO item
    await t
        .click(todoItem.find('.edit-btn'))  // Click edit button
        .setNativeDialogHandler(() => null) // Handle native dialog prompts if necessary
        .typeText(dueDateInput, newDueDate, { replace: true })  // Replace old due date with new
        .expect(dueDateInput.value).eql(newDueDate)  // Confirm the new due date is displayed
        .click(todoItem.find('.edit-btn'))  // Confirm the edit
        .expect(todoItem.withText(`Due: ${newDueDate}`).exists).ok(); // Verify the due date update
});
