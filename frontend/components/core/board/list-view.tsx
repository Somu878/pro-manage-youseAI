import { useFetchBoard } from "@/app/hooks/UseFetchBoard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Task } from "@/lib/types";
import { ArrowUpDown, Columns, Loader, MoreHorizontal, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getPriorityColor } from "./Task";
import { TaskDialog } from "../task-dialog";
import { useBoard } from "@/app/hooks/UseBoard";

function ListView() {
  const {updateBoard,board,isLoading,error}=useBoard()
  const [tasks,setTasks]=useState(board)
  const [isOpen,setIsOpen]=useState(false)
  const [task,setTask]=useState<Task | null>(null)

  const [status,setStatus]=useState("all")
  const [priority,setPriority]=useState("all")
  useEffect(() => { 
    let filteredTasks = board;
    
    if (status !== "all") {
      filteredTasks = filteredTasks.filter((task) => task.status === status);
    }
    if (priority !== "all") {
      filteredTasks = filteredTasks.filter((task) => task.priority === priority);
    }
    setTasks(filteredTasks);
  }, [status, priority, board]);
  if (isLoading) return 
  if (error) return <div>Error: {error}</div>;
  return <div>
    <div className="flex justify-end space-x-4 mb-4 ">

    <Select onValueChange={(value)=>setStatus(value)}>
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Filter by Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="todo">Todo</SelectItem>
        <SelectItem value="in_progress">In Progress</SelectItem>
        <SelectItem value="done">Done</SelectItem>
      </SelectContent>
    </Select>
    <Select onValueChange={(value)=>setPriority(value)} >
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Filter by Priority" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="low">Low</SelectItem>
        <SelectItem value="medium">Medium</SelectItem>
        <SelectItem value="high">High</SelectItem>
      </SelectContent>
    </Select>
    <Button variant="secondary" onClick={()=>{setStatus("all");setPriority("all")}}>
      Reset
    </Button>
    </div>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Title
                </TableHead>
                <TableHead>Status
                <ArrowUpDown className="inline ml-2 h-4 w-4" />
                </TableHead>
                <TableHead>Priority
                <ArrowUpDown className="inline ml-2 h-4 w-4" />
                </TableHead>
                <TableHead>Due Date
                </TableHead>
                <TableHead>Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody> 
        {tasks.length > 0 ? (
            tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell className="capitalize" >{
                  task.status.split("_").map((word)=>word.charAt(0).toUpperCase()+word.slice(1)).join(" ")
                }</TableCell>
                <TableCell>
                  <Badge className={`${getPriorityColor(task.priority)} text-white capitalize`}>{task.priority}</Badge>
                </TableCell>
                <TableCell >{task.dueDate ? task.dueDate : "-"}</TableCell>
                <TableCell>
                <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem
                                    onClick={()=>{
                                      setTask(task)
                                      setIsOpen(true)
                                    }}
                                    >Edit</DropdownMenuItem>
                                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No tasks found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TaskDialog isOpen={isOpen} onClose={()=>{setIsOpen(false)}} onSave={()=>{}} task={task as unknown as Task}/>
        </Table>  

  </div>
}

export default ListView;