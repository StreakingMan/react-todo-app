import React, { useEffect, useState } from 'react';
import './App.scss';
import { Box, Button, Input, List, ListItem } from '@mui/material';
import { TODO } from './interface';
import {
    addTodo,
    getTodoList,
    removeTodo,
} from './utils/local-storge-operator';
import { Delete } from '@mui/icons-material';
import Giraffe, { waveEar } from './components/characters/Giraffe';
import TodoItem from './components/todo/TodoItem';
import TodoList from './components/todo/TodoList';

function App() {
    const [todoList, setTodoList] = useState<TODO[]>(getTodoList());
    const [temp, setTemp] = useState('');
    const onAddClick = () => {
        addTodo({
            id: new Date().getTime().toString(),
            title: temp,
            desc: '',
        });
        setTodoList(getTodoList());
    };
    const onDeleteClick = (id: TODO['id']) => {
        removeTodo(id);
        setTodoList(getTodoList());
    };

    return (
        <Box className={'app'}>
            <Giraffe className={'giraffe'}>
                <Box className={'header'}>
                    <Box
                        sx={{
                            fontFamily: 'Monospace',
                            fontSize: 50,
                            fontWeight: 900,
                        }}
                    >
                        TODO LIST
                    </Box>
                </Box>
                <TodoList>
                    {todoList.map((todo) => (
                        <TodoItem
                            title={todo.title}
                            id={todo.id}
                            key={todo.id}
                            onDelete={onDeleteClick}
                        />
                    ))}
                </TodoList>

                <Input onChange={(e) => setTemp(e.target.value)} />
                <Button onClick={onAddClick}>Add Todo</Button>
            </Giraffe>
        </Box>
    );
}

export default App;
