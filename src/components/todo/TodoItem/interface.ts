import { TODO } from '../../../interface';

export interface TodoItemProps extends TODO {
    className?: string;
    onDelete: (id: string) => void;
    onLogicDelete: (id: string) => void;
    onFinish: (id: string) => void;
}
