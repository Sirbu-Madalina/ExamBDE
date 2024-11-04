import { Selector } from 'testcafe';

// Selectors
const todoInput = Selector('#todo-input');
const addButton = Selector('.button-add');
const prioritySelect = Selector('#priority-select');
const dueDateInput = Selector('#due-date-input');
const todoItem = Selector('.todo-item');

fixture `Todo App Testing`
  .page `https://sirbumadalina.dk/test/todo/`; // Adjust with the correct local URL for your app

test('Add a new todo with high priority', async t => {
        await t
            .click('#show-input-button') // Hypothetical button that reveals the input field
            .typeText(todoInput, 'Test high priority todo')
            .click(prioritySelect)
            .click(prioritySelect.find('option').withText('high'))
            .typeText(dueDateInput, '2024-12-31')
            .click(addButton)
            .expect(todoItem.withText('Test high priority todo').exists).ok();
    });
    

test('Edit a todo item', async t => {
    await t
  
            // Make sure the item exists by possibly adding it first if necessary
            .click(todoItem.withText('Test high priority todo').find('.edit-btn'))
            .typeText(todoInput, 'Updated todo', { replace: true })
            .click(addButton)
            .expect(todoItem.withText('Updated todo').exists).ok();
    });


test('Remove a todo item', async t => {
    await t
        .click(todoItem.withText('Updated todo').find('.remove-btn'))
        .expect(todoItem.withText('Updated todo').exists).notOk();
});

test('Toggle a todo item completed status', async t => {
    await t
        .click(todoItem.withText('Test high priority todo').find('.todo-checkbox'))
        .expect(todoItem.withText('Test high priority todo').find('span').withExactText('Test high priority todo').style('text-decoration')).contains('line-through');
});

test('Clear all completed todos', async t => {
    await t
        .click(Selector('#clear-completed-btn'))
        .expect(todoItem.filter('.completed').exists).notOk();
});
