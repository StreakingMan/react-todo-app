// 类型：一次性、日常
export type TODOType = 'once' | 'daily';

// 状态：处理中、已删除、未完成
export type TODOState = 'doing' | 'deleted' | 'finished';

export interface TODO {
    id: string;
    title: string;
    type: TODOType;
    state: TODOState;
    // 一次性任务，截止日期
    deadline?: string;
    // 日常任务，完成打卡
    checkDay?: string[];
}
