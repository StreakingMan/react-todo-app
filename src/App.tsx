import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/utils.scss';
import { Box, ThemeProvider, Typography } from '@mui/material';
import { TODO, TODOState } from './interface';
import {
    finishTodo,
    getTodoList,
    removeTodo,
} from './utils/local-storge-operator';
import Giraffe from './components/characters/Giraffe';
import TodoItem from './components/TodoItem';
import TodoList from './components/TodoList';
import { myTheme } from './utils/theme';
import { GitHub } from '@mui/icons-material';
import Filter from './components/Filter';
import { CreatorProps } from './components/Creator/interface';
import Creator from './components/Creator';
import Info from './components/Info';

function App() {
    const [todoList, setTodoList] = useState<TODO[]>(getTodoList());
    const [search, setSearch] = useState('');
    const [filterOptions, setFilterOptions] = useState<TODOState[]>(['doing']);

    const refreshList = () => {
        const list = getTodoList();
        setTodoList(
            list.filter((todo) => {
                if (filterOptions) {
                    return (
                        filterOptions.includes(todo.state) &&
                        todo.title.includes(search)
                    );
                } else {
                    return todo.title.includes(search);
                }
            })
        );
    };

    const onAdded: CreatorProps['onAdded'] = () => {
        setSearch('');
        setFilterOptions(['doing']);
        refreshList();
    };

    const onLogicDeleteClick = (id: TODO['id']) => {
        removeTodo(id, true);
        refreshList();
    };
    const onDeleteClick = (id: TODO['id']) => {
        removeTodo(id);
        refreshList();
    };
    const onFinishClick = (id: TODO['id']) => {
        finishTodo(id);
        refreshList();
    };

    useEffect(() => {
        refreshList();
    }, [search, filterOptions]);

    return (
        <ThemeProvider theme={myTheme}>
            <Box className={'app'}>
                <Giraffe className={'giraffe'}>
                    <Info />

                    <Filter
                        search={search}
                        setSearch={setSearch}
                        filterOptions={filterOptions}
                        setFilterOptions={setFilterOptions}
                    />

                    <Creator onAdded={onAdded} />

                    <TodoList>
                        {todoList.map((todo) => (
                            <TodoItem
                                {...todo}
                                key={todo.id}
                                onDelete={onDeleteClick}
                                onLogicDelete={onLogicDeleteClick}
                                onFinish={onFinishClick}
                            />
                        ))}
                    </TodoList>
                </Giraffe>
            </Box>
        </ThemeProvider>
    );
}

export default App;
