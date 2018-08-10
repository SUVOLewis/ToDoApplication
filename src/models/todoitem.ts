export interface ITodoItem {
    userId: number;
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

export class TodoItem implements ITodoItem{
    userId: number;
    id: number;
    title: string;
    description: string;
    completed: boolean;
}