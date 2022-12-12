import React, { FC } from 'react';
import classnames from 'classnames';
import style from './index.module.scss';
import { InfoProps } from './interface';
import { Box } from '@mui/material';
import { GitHub } from '@mui/icons-material';

const Info: FC<InfoProps> = () => {
    return (
        <Box className={classnames(style.info)}>
            <h1>
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
            </h1>
        </Box>
    );
};

export default Info;
