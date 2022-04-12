import React, { FC } from 'react';
import classnames from 'classnames';
import style from './index.module.scss';
import { TodoItemProps } from './interface';
import { Close } from '@mui/icons-material';

const TodoItem: FC<TodoItemProps> = ({ title, id, onDelete }) => {
    return (
        <div className={classnames(style.todoItem)}>
            {title}
            <Close onClick={() => onDelete(id)} />
        </div>
    );
};

export default TodoItem;
