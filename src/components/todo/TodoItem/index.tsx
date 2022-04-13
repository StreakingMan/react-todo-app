import React, { FC, ReactEventHandler, useState } from 'react';
import classnames from 'classnames';
import style from './index.module.scss';
import { TodoItemProps } from './interface';
import { Check, Close, Delete } from '@mui/icons-material';

const initMatrix = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
];

const TodoItem: FC<TodoItemProps> = ({
    title,
    id,
    state,
    onDelete,
    onLogicDelete,
    onFinish,
}) => {
    const [matrix, setMatrix] = useState(initMatrix);
    const [hasTransition, setHasTransition] = useState(true);
    const handleMouseMove: ReactEventHandler = (e) => {
        const { offsetX, offsetY, target } = e.nativeEvent as MouseEvent;
        const x = offsetX - (target as HTMLElement).offsetWidth / 2;
        const y = offsetY - (target as HTMLElement).offsetHeight / 2;
        setMatrix([
            [1, 0, 0, x * 0.0000005],
            [0, 1, 0, y * 0.00001],
            [0, 0, 1, 1],
            [0, 0, 0, 1],
        ]);
        if (hasTransition) {
            setTimeout(() => {
                setHasTransition(false);
            }, 300);
        }
    };
    const handleMouseLeave = () => {
        setHasTransition(true);
        setMatrix(initMatrix);
    };

    return (
        <div
            id={id}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={classnames(style.todoItem, style[state])}
            style={{
                transform: `matrix3d(${matrix.toString()})`,
                transition: hasTransition ? '0.3s' : undefined,
            }}
        >
            <div className={style.todoItemInner}>
                {title}
                <div className={'spacer'} />
                {state === 'doing' ? (
                    <Close
                        className={style.close}
                        onClick={() => onLogicDelete(id)}
                    />
                ) : (
                    <Delete
                        className={style.close}
                        onClick={() => onDelete(id)}
                    />
                )}
                {state === 'doing' && (
                    <Check
                        className={style.check}
                        onClick={() => onFinish(id)}
                    />
                )}
            </div>
        </div>
    );
};

export default TodoItem;
