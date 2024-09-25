import axiosInstance from "./axiosClient";
import { Task as TaskType } from '@/lib/types';

export const getBoard = async () => {
    const response = await axiosInstance.get("/task",{
        // headers: {
        //     authorization: token
        // }
    });
    return response.data;
}

export const updateBoard = async (newBoard: TaskType[]): Promise<void> => {
    // Implement your API call to update the board
    // For example:
    // await fetch('/api/board', {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(newBoard),
    // });
};