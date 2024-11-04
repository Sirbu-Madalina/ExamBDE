// tests/todo-priority-test.js
import { Selector } from 'testcafe';

fixture`Todo App`
    .page`http://localhost:your_port`; // Replace with your app's URL

test('Select priorities for a new to-do item', async t => {
    const todoInput = Selector('#todo-input');
    const prioritySelect = Selector('#priority-select');
    const addButton = Selector('.button-add');
    const todoList = Selector('#todo-list');
    const getPriority = (priority) => Selector('.priority-' + priority).withText(priority.toUpperCase());

    // Test for 'Low' priority
    await t
        .typeText(todoInput, 'Task with Low Priority')
        .click(prioritySelect)
        .click(prioritySelect.find('option').withText('Low'))
        .click(addButton)
        .expect(todoList.childElementCount).eql(1)
        .expect(getPriority('low').exists).ok();

    // Test for 'Medium' priority
    await t
        .typeText(todoInput, 'Task with Medium Priority', { replace: true })
        .click(prioritySelect)
        .click(prioritySelect.find('option').withText('Medium'))
        .click(addButton)
        .expect(todoList.childElementCount).eql(2)
        .expect(getPriority('medium').exists).ok();

    // Test for 'High' priority
    await t
        .typeText(todoInput, 'Task with High Priority', { replace: true })
        .click(prioritySelect)
        .click(prioritySelect.find('option').withText('High'))
        .click(addButton)
        .expect(todoList.childElementCount).eql(3)
        .expect(getPriority('high').exists).ok();
});
