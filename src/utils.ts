import { TODO } from './interface';

export const addTodo = (todo: TODO) => {
    const storage = window.localStorage.getItem('todoList') || '[]';
    const todoList: TODO[] = JSON.parse(storage);
    todoList.push(todo);
    window.localStorage.setItem('todoList', JSON.stringify(todoList));
};

export const getTodoList = () => {
    const storage = window.localStorage.getItem('todoList') || '[]';
    const todoList: TODO[] = JSON.parse(storage);
    return todoList;
};

export const removeTodo = (id: TODO['id']) => {
    const storage = window.localStorage.getItem('todoList') || '[]';
    let todoList: TODO[] = JSON.parse(storage);
    todoList = todoList.filter((todo) => todo.id !== id);
    window.localStorage.setItem('todoList', JSON.stringify(todoList));
};
