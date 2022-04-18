import React, { FC, useState } from 'react';
import classnames from 'classnames';
import style from './index.module.scss';
import { CreatorProps } from './interface';
import { Box, Button, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';
import { addTodo } from '../../utils/local-storge-operator';

const Creator: FC<CreatorProps> = ({ onAdded }) => {
    const [input, setInput] = useState('');

    const onAddClick = () => {
        if (!input) return;
        const id = new Date().getTime().toString();
        addTodo({
            id,
            title: input,
            state: 'doing',
            type: 'once',
        });
        onAdded();
        setInput('');
        setTimeout(() => {
            const newTODOEle = document.getElementById(id);
            newTODOEle?.scrollIntoView({ behavior: 'smooth' });
        });
    };

    return (
        <Box className={classnames(style.creator)}>
            <TextField
                fullWidth
                placeholder="Create a new TODO!"
                variant="standard"
                multiline
                value={input}
                onChange={(v) => setInput(v.target.value)}
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
    );
};

export default Creator;
