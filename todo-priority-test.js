import { Selector } from 'testcafe';

fixture`Todo App Priority Feature`
    .page`https://sirbumadalina.dk/test/todo/`; 

test('Add a new todo with different priority levels', async t => {
    const todoInput = Selector('#todo-input');
    const addButton = Selector('.button-add');
    const prioritySelect = Selector('#priority-select');
    const todoList = Selector('#todo-list');

    // Function to add a todo with a specified priority and verify its appearance
    const addTodoWithPriority = async (text, priority) => {
        await t
            .typeText(todoInput, text)
            .click(prioritySelect)
            .click(prioritySelect.find('option').withText(priority))
            .click(addButton);

        const addedTodo = todoList.find('li').withText(text);
        const priorityText = addedTodo.find('span').withText(priority.toUpperCase());

        await t.expect(addedTodo.exists).ok();
        await t.expect(priorityText.exists).ok(); // Verifies the priority is displayed correctly
    };

    // Test for Low priority
    await addTodoWithPriority('Todo with Low Priority', 'Low');

    // Test for Medium priority
    await addTodoWithPriority('Todo with Medium Priority', 'Medium');

    // Test for High priority
    await addTodoWithPriority('Todo with High Priority', 'High');
});
