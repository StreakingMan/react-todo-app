import { TODOState } from '../../interface';
import { Dispatch, SetStateAction } from 'react';

export interface FilterProps {
    className?: string;
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
    filterOptions: TODOState[];
    setFilterOptions: Dispatch<SetStateAction<TODOState[]>>;
}
