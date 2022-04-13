import React, { useState } from 'react';
import './App.scss';
import {
    Box,
    TextField,
    ThemeProvider,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from '@mui/material';
import { TODO } from './interface';
import {
    addTodo,
    getTodoList,
    removeTodo,
} from './utils/local-storge-operator';
import Giraffe from './components/characters/Giraffe';
import TodoItem from './components/todo/TodoItem';
import TodoList from './components/todo/TodoList';
import { myTheme } from './utils/theme';
import {
    AllInbox,
    Check,
    Delete,
    GitHub,
    Search,
    Star,
} from '@mui/icons-material';

function App() {
    const [todoList, setTodoList] = useState<TODO[]>(getTodoList());
    const [temp, setTemp] = useState('');
    const [filterOptions, setFilterOptions] = useState<string[]>([]);
    const onFilterOptionsChange = (
        event: React.MouseEvent<HTMLElement>,
        newFormats: string[]
    ) => {
        console.log(newFormats);
        setFilterOptions(newFormats);
    };
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
        <ThemeProvider theme={myTheme}>
            <Box className={'app'}>
                <Giraffe className={'giraffe'}>
                    <Box className={'info'}>
                        <Typography
                            fontWeight={700}
                            variant="h3"
                            component="h1"
                        >
                            TODO LIST
                            <GitHub
                                sx={{ ml: 2, cursor: 'pointer' }}
                                onClick={() => {
                                    window.open(
                                        'https://github.com/StreakingMan/react-todo-app',
                                        '_blank'
                                    );
                                }}
                            />
                        </Typography>
                    </Box>
                    <Box className={'operator'}>
                        <Search sx={{ mr: 1, my: 0.5 }} />
                        <TextField
                            fullWidth
                            placeholder="Search Something"
                            variant="standard"
                        />
                        <ToggleButtonGroup
                            sx={{ ml: 2 }}
                            size={'small'}
                            value={filterOptions}
                            onChange={onFilterOptionsChange}
                            aria-label="text formatting"
                        >
                            <ToggleButton value="bold" aria-label="bold">
                                <Check />
                            </ToggleButton>
                            <ToggleButton value="italic" aria-label="italic">
                                <Delete />
                            </ToggleButton>
                            <ToggleButton
                                value="underlined"
                                aria-label="underlined"
                            >
                                <AllInbox />
                            </ToggleButton>
                            <ToggleButton value="color" aria-label="color">
                                <Star />
                            </ToggleButton>
                        </ToggleButtonGroup>
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
                </Giraffe>

                <a
                    className={'beian'}
                    href="https://beian.miit.gov.cn/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                >
                    浙ICP备17007857号-2
                </a>
            </Box>
        </ThemeProvider>
    );
}

export default App;
