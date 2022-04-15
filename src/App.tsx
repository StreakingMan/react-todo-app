import React, { useEffect, useState } from 'react';
import './App.scss';
import {
    Box,
    Button,
    TextField,
    ThemeProvider,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from '@mui/material';
import { TODO } from './interface';
import {
    addTodo,
    finishTodo,
    getTodoList,
    removeTodo,
} from './utils/local-storge-operator';
import Giraffe from './components/characters/Giraffe';
import TodoItem from './components/todo/TodoItem';
import TodoList from './components/todo/TodoList';
import { myTheme } from './utils/theme';
import {
    Add,
    Check,
    Close,
    GitHub,
    HourglassTop,
    Search,
} from '@mui/icons-material';

const todoTypeOption = [
    {
        value: 'doing',
        title: '处理中',
        ICON: HourglassTop,
    },
    {
        value: 'finished',
        title: '已完成',
        ICON: Check,
    },
    {
        value: 'deleted',
        title: '回收站',
        ICON: Close,
    },
];

function App() {
    const [todoList, setTodoList] = useState<TODO[]>(getTodoList());
    const [temp, setTemp] = useState('');
    const [search, setSearch] = useState('');
    const [filterOptions, setFilterOptions] = useState<string[]>(['doing']);
    const onFilterOptionsChange = (
        event: React.MouseEvent<HTMLElement>,
        newFormats: string[]
    ) => {
        setFilterOptions(newFormats);
    };
    useEffect(() => {
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
    }, [search, filterOptions]);
    const onAddClick = () => {
        if (!temp) return;
        const id = new Date().getTime().toString();
        addTodo({
            id,
            title: temp,
            state: 'doing',
            type: 'once',
        });
        setTodoList(getTodoList());
        setTemp('');
        setTimeout(() => {
            const newTODOEle = document.getElementById(id);
            newTODOEle?.scrollIntoView({ behavior: 'smooth' });
        });
    };
    const onLogicDeleteClick = (id: TODO['id']) => {
        removeTodo(id, true);
        setTodoList(getTodoList());
    };
    const onDeleteClick = (id: TODO['id']) => {
        removeTodo(id);
        setTodoList(getTodoList());
    };
    const onFinishClick = (id: TODO['id']) => {
        finishTodo(id);
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
                    <Box className={'filter'}>
                        <Search sx={{ mr: 1, my: 0.5 }} />
                        <TextField
                            fullWidth
                            placeholder="Search something"
                            variant="standard"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <ToggleButtonGroup
                            sx={{ ml: 2 }}
                            size={'small'}
                            value={filterOptions}
                            onChange={onFilterOptionsChange}
                            aria-label="text formatting"
                        >
                            {todoTypeOption.map(({ value, title, ICON }) => (
                                <ToggleButton
                                    title={title}
                                    key={value}
                                    value={value}
                                >
                                    <ICON />
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>
                    </Box>
                    <Box className={'operator'}>
                        <TextField
                            fullWidth
                            placeholder="Create a new TODO!"
                            variant="standard"
                            multiline
                            value={temp}
                            onChange={(v) => setTemp(v.target.value)}
                        />
                        <Box sx={{ mt: 2 }}>
                            <Button
                                onClick={onAddClick}
                                variant="contained"
                                startIcon={<Add />}
                            >
                                Add
                            </Button>
                        </Box>
                    </Box>

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
