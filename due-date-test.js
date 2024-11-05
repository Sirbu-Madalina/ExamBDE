import { Selector } from 'testcafe';

fixture`Todo App - Due Date Feature`
    .page`https://sirbumadalina.dk/test/todo/`;  // Use your app's URL

test('Add a todo with due date and verify it appears correctly', async t => {
    // Selectors for elements
    const todoInput = Selector('#todo-input');
    const prioritySelect = Selector('#priority-select');
    const dueDateInput = Selector('#due-date-input');
    const addButton = Selector('.button-add');
    const todoList = Selector('.todo-list');
    
    // Define test data
    const testTodoText = 'Test due date feature';
    const testPriority = 'medium';
    const testDueDate = '2024-12-31';

    // Enter todo text
    await t
        .typeText(todoInput, testTodoText)
        .click(prioritySelect)
        .click(prioritySelect.find('option').withText('Medium'))  // Set priority
        .typeText(dueDateInput, testDueDate)  // Set due date
        .click(addButton);

    // Verify the todo was added with the correct due date and priority
    const addedTodo = todoList.child('li').withText(testTodoText);
    await t
        .expect(addedTodo.exists).ok('Todo item with due date should be added')
        .expect(addedTodo.find('span').withText('Due: 2024-12-31').exists).ok('Due date should be displayed')
        .expect(addedTodo.find('span').withText('MEDIUM').exists).ok('Priority should be displayed');
});
