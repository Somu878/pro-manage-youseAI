import { useState, useEffect } from 'react';
import { getBoard, updateBoard } from '../api/boardApi';
import { Task as TaskType } from '@/lib/types';

export const useFetchBoard = () => {
  const [board, setBoard] = useState<TaskType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await getBoard();
        setBoard(response);
      } catch (error) {
        setError(error instanceof Error ? error : new Error('An error occurred'));
      } finally {
        setLoading(false);
      }
    };
    fetchBoard();
  }, []);

  const updateBoardState = async (newBoard: TaskType[]) => {
    try {
      await updateBoard(newBoard);
      setBoard(newBoard);
    } catch (error) {
      setError(error instanceof Error ? error : new Error('An error occurred while updating the board'));
    }
  };

  return { board, loading, error, updateBoardState };
};