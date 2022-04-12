import React, { FC } from 'react';
import classnames from 'classnames';
import style from './index.module.scss';
import { TodoListProps } from './interface';

const TodoList: FC<TodoListProps> = ({ children }) => {
    return <div className={classnames(style.todoList)}>{children}</div>;
};

export default TodoList;
