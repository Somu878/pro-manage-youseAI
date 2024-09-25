import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Task as TaskType } from "@/lib/types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TaskDialog } from "@/components/core/task-dialog"
import { useState } from "react"
import { formatDate } from "@/lib/helpers"

export const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'high':
      return 'bg-red-500 hover:bg-red-600'
    case 'medium':
      return 'bg-yellow-500 hover:bg-yellow-600'
    case 'low':
      return 'bg-green-500 hover:bg-green-600'
    default:
      return 'bg-gray-500 hover:bg-gray-600'
  }
}
export default function Task({task}: {task: TaskType}) {
const [isDialogOpen, setIsDialogOpen] = useState(false)
    return (
    
        <Card>
            <CardHeader>
              <div className="flex justify-between items-center w-full">
                <CardTitle className="text-xl">{task.title}</CardTitle>
                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem onClick={()=>setIsDialogOpen(true)}>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                </div>
                <CardDescription className="text-ellipsis overflow-hidden whitespace-nowrap">{task.description}</CardDescription>
            </CardHeader>
            <CardFooter className="p-3 pt-0">
                              <div className="flex justify-between items-center w-full px-2">
                                <Badge className={`${getPriorityColor(task.priority)} text-white capitalize`}>
                                  {task.priority}
                                </Badge>
                           {task.dueDate && <span className="text-xs text-gray-500"> {formatDate(task.dueDate)}</span>}
                              </div>
                            </CardFooter>
                            <TaskDialog task={task} isOpen={isDialogOpen} onClose={()=>setIsDialogOpen(false)} onSave={()=>setIsDialogOpen(false)} />
        </Card>
     
    )
}