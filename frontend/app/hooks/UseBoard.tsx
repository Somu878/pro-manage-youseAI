import { useContext } from "react";
import { BoardContext } from "@/components/context/BoardContext";
export function useBoard() {
    const context = useContext(BoardContext);
    if (context === undefined) {
      throw new Error('useBoard must be used within a BoardProvider');
    }
    return context;
  }