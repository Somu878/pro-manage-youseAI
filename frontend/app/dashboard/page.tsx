"use client"
import BoardView from "@/components/core/board/board-view";
import Navbar from "@/components/core/Navbar";
import { useAuth } from "@/app/hooks/UseAuth";
import { User } from "@/components/core/Navbar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ListView from "@/components/core/board/list-view";
import { useFetchBoard } from "../hooks/UseFetchBoard";
import { useState } from "react";
import { TaskDialog } from "@/components/core/task-dialog";
import { DragDropContext } from "react-beautiful-dnd";
export default function Page() {
  const { user } = useAuth();
  const { board, error, loading, updateBoardState } = useFetchBoard();
const [isDialogOpen, setIsDialogOpen] = useState(false)
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  function handleDragEnd(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div>
      <Navbar userName={user as unknown as User} />
      <div className="flex-grow mx-auto container p-4 ">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-md font-bold md:text-2xl">Task Management Dashboard</h1>
          <Button onClick={()=>setIsDialogOpen(true)}>Add Task</Button>
        </div>
        <div>
          <Tabs defaultValue="board">
            <TabsList>
              <TabsTrigger value="board">Board</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>
            <TabsContent value="board">
              <DragDropContext onDragEnd={handleDragEnd}>
              <BoardView board={board} />
              </DragDropContext>
            </TabsContent>
            <TabsContent value="list">
              <ListView board={board} />
            </TabsContent>
          </Tabs>
        </div>
        <div>
        </div>
      </div>
      <TaskDialog isOpen={isDialogOpen} onClose={()=>setIsDialogOpen(false)} onSave={()=>setIsDialogOpen(false)} />
    </div>
  );
}
