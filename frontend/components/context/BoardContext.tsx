import React, { createContext, useState, ReactNode, useEffect, useCallback } from 'react';
import _ from 'lodash';
import { Task as TaskType } from '@/lib/types';
import { getBoard, updateBoardTasks } from '@/app/api/boardApi';

interface BoardContextType {
  board: TaskType[];
  updateBoard: (newBoard: TaskType[]) => void;
  isLoading: boolean;
  error: string | null;
 refreshBoard: () => void;
}

export const BoardContext = createContext<BoardContextType | undefined>(undefined);

export function BoardProvider({ children }: { children: ReactNode }) {
  const [board, setBoard] = useState<TaskType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBoard = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getBoard();
      setBoard(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  const refreshBoard = () => {
    fetchBoard()
  }

  useEffect(() => {
    fetchBoard();
  }, []);



  const updateBoard = (newBoard: TaskType[]) => {
    setBoard(newBoard);
    const debouncedUpdate = _.debounce(() => updateBoardTasks(newBoard), 3000);
    debouncedUpdate();
  };


  return (
    <BoardContext.Provider value={{ board, updateBoard, isLoading, error,refreshBoard}}>
      {children}
    </BoardContext.Provider>
  );
}

