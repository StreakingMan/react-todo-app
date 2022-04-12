import React, { FC, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import style from './index.module.scss';
import { TodoListProps } from './interface';
import { Box } from '@mui/material';

const TodoList: FC<TodoListProps> = ({ children }) => {
    const listContainer = useRef(null);
    const [height, setHeight] = useState(0);
    useEffect(() => {
        console.log('fuck');
        if (!listContainer.current) return;
        const collection = (listContainer.current as HTMLElement)
            .children as HTMLCollection;
        const length = collection.length;
        let i = 0;
        let totalHeight = 0;
        while (i < length) {
            totalHeight +=
                (collection.item(i) as HTMLElement)?.offsetHeight + 24;
            i = i + 1;
        }
        setHeight(totalHeight);
    }, [React.Children.count(children)]);
    return (
        <Box
            sx={{ height }}
            ref={listContainer}
            className={classnames(style.todoList)}
        >
            {children}
        </Box>
    );
};

export default TodoList;
