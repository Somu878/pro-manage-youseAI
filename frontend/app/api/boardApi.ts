import axiosInstance from "./axiosClient";
import { Task as TaskType } from '@/lib/types';

export const getBoard = async () => {
    const response = await axiosInstance.get("/tasks/board");
    if(response.status === 200){
        return response.data
    }
   else{
    throw new Error('Failed to get board');
   }
}

export const updateBoardTasks = async (newBoard: TaskType[]): Promise<void> => {
    const response = await axiosInstance.patch("/tasks/board",{tasks:newBoard});
    if(response.status === 200){
        return response.data
    }
    else{
        throw new Error('Failed to update board');
    }
};

export const addTask = async (task: TaskType): Promise<void> => {
    const response = await axiosInstance.post("/tasks",task);
    console.log(response)
    if(response.status === 201){
        return response.data
    }
    else{
        throw new Error('Failed to add task');
    }
};

export const updateTask = async (task: TaskType): Promise<void> => {
    const response = await axiosInstance.patch(`/tasks/${task.id}`,task);
    if(response.status === 200){
        return response.data
    }
    else{
        throw new Error('Failed to update task');
    }
};

export const deleteTask = async (taskId: string): Promise<void> => {
    const response = await axiosInstance.delete(`/tasks/${taskId}`);
    if(response.status === 200){
        return response.data
    }
    else{
        throw new Error('Failed to delete task');
    }
};