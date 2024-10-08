"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Task, TaskStatus } from "@/lib/types"
import { addTask, updateTask } from "@/app/api/boardApi"
import { useBoard } from "@/app/hooks/UseBoard"
import { taskSchema } from "@/lib/validations/task-validation"


interface TaskDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (task: Task) => void
  task?: Task | null
}

export function TaskDialog({ isOpen, onClose, onSave, task }: TaskDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState<Task['status']>()
  const [priority, setPriority] = useState<Task['priority']>("medium")
  const [dueDate, setDueDate] = useState<Date | null>(null)
  const {refreshBoard}=useBoard()
const [action,setAction]=useState<"add" | "edit">("add")
useEffect(()=>{
if(!task){
  resetForm()
}
},[isOpen,task])
function resetForm(){
  setTitle("")
  setDescription("")
  setStatus(undefined)
  setPriority("")
  setDueDate(null)
  setAction("add")
}
  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDescription(task.description)
      setStatus(task.status)
      setPriority(task.priority)
      setDueDate(new Date(task.dueDate as string))
      setAction("edit")
    } else {
resetForm()
    }
  }, [task])

  const handleSave = async () => {
    try{
    await taskSchema.parseAsync({
      title,
      description,
      status,
      priority,
      dueDate: dueDate?.toISOString() as string | null,
    });
if (action==="add"){
  const newTask: Task = {
    id: Date.now().toString(),
    title,
    description,
    status:status as TaskStatus,
    priority,
    dueDate:dueDate?.toISOString() as string | null,
  }
  await addTask(newTask)
  refreshBoard()
  onClose()
  onSave(newTask)
  resetForm()
}
else{
  const updatedTask = {
    ...task,
    title,
    description,
    status:status as TaskStatus,
    priority,
    dueDate: dueDate ? dueDate.toISOString() : null,
  }
  await updateTask(updatedTask as Task)
  onClose()
  onSave(updatedTask as Task)
  resetForm()
  refreshBoard()
}
  }
catch(error){
  console.log(error)
  return
}
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[350px] rounded-lg md:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>{task ? "Edit Task" : "Add New Task"}</DialogTitle>
          <DialogDescription>
            {task ? "Make changes to your task here. Click save when you're done." : "Fill in the details for your new task."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select value={status} onValueChange={(value: Task['status']) => setStatus(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-right">
              Priority
            </Label>
            <Select value={priority} onValueChange={(value: Task['priority']) => setPriority(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dueDate" className="text-right">
              Due Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "col-span-3 justify-start text-left font-normal",
                    !dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dueDate ? dueDate : undefined}
                  onSelect={(date) => setDueDate(date as Date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            {task ? "Update Task" : "Add Task"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}