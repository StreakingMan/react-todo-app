export type TODOType = 'once' | 'daily';

export type TODOState = 'doing' | 'deleted' | 'finished';

export interface TODO {
    id: string;
    title: string;
    type: TODOType;
    state: TODOState;
    deadline?: string;
}
