import { Request, Response } from "express";
import prisma from "../prisma/_db";
import { handleError } from "../lib/handleError";
import { RequestWithUser } from "../middlewares/verifyToken";
import { Status } from "@prisma/client";

//create task
async function createTask(req: Request, res: Response) {
    try {
        const { title, description, priority,status, dueDate } = req.body;
        await prisma.task.create({
            data: {
                title,
                description,
                priority,
                dueDate,
                status,
                user: {
                    connect: {
                        id: (req as RequestWithUser).user?.id
                    }
                }
            }
        });
        res.status(201).json({
            message: "Task created successfully"
        });
    } catch (error) {
        handleError(error, res);
    }
}

//get all tasks of current user
async function getTasks(req: Request, res: Response) {
    try {
        const tasks = await prisma.task.findMany({
            where: {
                refUserId: (req as RequestWithUser).user?.id
            }
        });
        if(!tasks){
            return res.status(404).json({
                message: "No tasks found"
            });
        }
        return res.status(200).json(tasks);
    } catch (error) {
        handleError(error, res);
    }
}

async function updateTasksStatus(req: Request, res: Response) {
    try {
      const { tasks } = req.body;
      const userId = (req as RequestWithUser).user?.id;
      //promises based approach to update tasks asynchronously
      const updatePromises = tasks.map(async (task: { id: string; status: Status }) => {
        // fetch the current task
        const currentTask = await prisma.task.findUnique({
          where: { id: task.id, refUserId: userId },
          select: { status: true }
        });
  
        // Only update if the status has changed
        if (currentTask && currentTask.status !== task.status) {
          return prisma.task.update({
            where: { id: task.id, refUserId: userId },
            data: {
              status: task.status,
              updatedAt: new Date()
            }
          });
        }
        return null; // No update needed
      });
  
      const results = await Promise.all(updatePromises);
      const updatedCount = results.filter(Boolean).length;
  
      res.status(200).json({
        message: `${updatedCount} tasks updated successfully`
      });
    } catch (error) {
      handleError(error, res);
    }
  }



//get task by id 
async function getTaskById(req: Request, res: Response) {
    try {
        const task = await prisma.task.findUnique({
            where: {
                id: req.params.id,
                refUserId: (req as RequestWithUser).user?.id
            }
        });
        if(!task){
            return res.status(404).json({
                message: "Task not found"
            });
        }
        res.status(200).json(task);
    }
    catch (error) {
        handleError(error, res);
    }
}

//delete task by id 
async function deleteTask(req: Request, res: Response) {
    try {
        const task = await prisma.task.delete({
            where: {
                id: req.params.id
            }
        });
      
        if(!task){
            return res.status(404).json({
                message: "No task found with this Id"
            });
        }
        if(task?.refUserId !== (req as RequestWithUser).user?.id){
            return res.status(403).json({
                message: "You are not authorized to delete this task!!"
            });
        }
        res.status(200).json({
            message: "Task deleted successfully"
        }); 
    }
    catch (error) { 
        handleError(error, res);
    }
}

//update a task
async function updateTask(req: Request, res: Response) { 
    try {
        const { title, description, priority, status, dueDate } = req.body;
        const task = await prisma.task.update({
            where: {
                id: req.params.id
            },
            data: {
                title, description, priority, status, dueDate, updatedAt: new Date()
            }
        })
        if(!task){
            return res.status(404).json({
                message: "Task not found"
            });
        }

        if(task?.refUserId !== (req as RequestWithUser).user?.id){
            return res.status(403).json({
                message: "You are not authorized to update this task!!"
            });
        }
        res.status(200).json({
            message: "Task updated successfully"
        });
    }
    catch(error){
        handleError(error, res);
    }   
}
export const taskController = {
    createTask,
    getTasks,
    updateTasksStatus,
    getTaskById,
    updateTask,
    deleteTask
}

