import React, { FC, useEffect, useState } from 'react';
import classnames from 'classnames';
import style from './index.module.scss';
import { FilterProps } from './interface';
import { TODOState } from '../../interface';
import { Box, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Check, Close, HourglassTop, Search } from '@mui/icons-material';
import { getTodoList } from '../../utils/local-storge-operator';

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

const Filter: FC<FilterProps> = ({
    search,
    setSearch,
    filterOptions,
    setFilterOptions,
}) => {
    const onFilterOptionsChange = (
        event: React.MouseEvent<HTMLElement>,
        newFormats: TODOState[]
    ) => {
        if (newFormats.length) setFilterOptions(newFormats);
    };

    return (
        <Box className={classnames(style.filter)}>
            <Search sx={{ mr: 1, my: 0.5 }} />
            <TextField
                fullWidth
                placeholder="Search something and filter by type"
                variant="standard"
                onChange={(e) => setSearch(e.target.value)}
            />
            <ToggleButtonGroup
                sx={{ ml: 2 }}
                size={'small'}
                value={filterOptions}
                onChange={onFilterOptionsChange}
            >
                {todoTypeOption.map(({ value, title, ICON }) => (
                    <ToggleButton title={title} key={value} value={value}>
                        <ICON />
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </Box>
    );
};

export default Filter;
