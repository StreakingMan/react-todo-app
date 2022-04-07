import React, { useEffect, useState } from 'react';
import './App.scss';
import { Box, Button, Input, List, ListItem } from '@mui/material';
import { TODO } from './interface';
import { addTodo, getTodoList, removeTodo } from './utils';
import { Delete } from '@mui/icons-material';

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
        <Box sx={{ maxWidth: 1280, margin: '0 auto' }}>
            <Box sx={{ fontFamily: 'Monospace', fontSize: 50 }}>TODO LIST</Box>
            <Input onChange={(e) => setTemp(e.target.value)} />
            <Button onClick={onAddClick}>Add Todo</Button>
            <List sx={{ width: 500 }}>
                {todoList.map((todo) => (
                    <ListItem
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                        key={todo.id}
                    >
                        {todo.title}
                        <Delete onClick={() => onDeleteClick(todo.id)} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default App;
