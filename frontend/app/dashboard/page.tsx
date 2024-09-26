"use client"
import BoardView from "@/components/core/board/board-view";
import Navbar from "@/components/core/Navbar";
import { useAuth } from "@/app/hooks/UseAuth";
import { User } from "@/components/core/Navbar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ListView from "@/components/core/board/list-view";
import { useState } from "react";
import { TaskDialog } from "@/components/core/task-dialog";
import { BoardProvider } from "@/components/context/BoardContext";
export default function Page() {
  const { user } = useAuth();

const [isDialogOpen, setIsDialogOpen] = useState(false)
  return (
    <div>
      <BoardProvider>
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
            {/* Board view */}
              <BoardView />
             
            </TabsContent>
            <TabsContent value="list">
              {/* <List view /> */}
              <ListView />
            </TabsContent>
          </Tabs>
        </div>
        <div>
        </div>
      </div>
      <TaskDialog isOpen={isDialogOpen} onClose={()=>setIsDialogOpen(false)} onSave={()=>setIsDialogOpen(false)} />
      </BoardProvider>
    </div>
  );
}
