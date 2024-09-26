export type Task = {
    id: string;
    title: string;
    description: string;
    priority: string;
    dueDate: string | null;
    status: TaskStatus;
}

export enum TaskStatus{
    TODO="todo",
    IN_PROGRESS="in_progress",
    DONE="done"
}
