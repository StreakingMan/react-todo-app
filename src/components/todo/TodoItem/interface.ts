export interface TodoItemProps {
    className?: string;
    id: string;
    title: string;
    desc?: string;
    onDelete: (id: string) => void;
}
