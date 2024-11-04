import { Selector } from 'testcafe';

fixture `To-Do Priority Tests`
    .page `https://sirbumadalina.dk/test/todo/`;

test('Add to-do with different priorities', async t => {
    const todoInput = Selector('#todo-input');            // Adjust ID based on your HTML
    const prioritySelect = Selector('#priority-select');  // Priority dropdown
    const addButton = Selector('.button-add');            // Adjust based on your button class

    // Add a to-do with low priority
    await t
        .typeText(todoInput, 'Buy groceries')
        .click(prioritySelect)
        .click(prioritySelect.find('option').withText('Low'))
        .click(addButton);

    // Add a to-do with medium priority
    await t
        .typeText(todoInput, 'Clean the house')
        .click(prioritySelect)
        .click(prioritySelect.find('option').withText('Medium'))
        .click(addButton);

    // Add a to-do with high priority
    await t
        .typeText(todoInput, 'Prepare presentation')
        .click(prioritySelect)
        .click(prioritySelect.find('option').withText('High'))
        .click(addButton);

    // Assertions can be added to verify that the items appear with correct priority labels
});
