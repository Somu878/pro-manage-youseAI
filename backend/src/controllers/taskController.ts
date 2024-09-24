import { Request, Response } from "express";
import prisma from "../prisma/_db";
import { handleError } from "../lib/handleError";
import { RequestWithUser } from "../middlewares/verifyToken";

//create task
async function createTask(req: Request, res: Response) {
    try {
        const { title, description, priority,status, dueDate } = req.body;
        const task = await prisma.task.create({
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
        res.status(200).json(tasks);
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
                message: "Task not found"
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
    getTaskById,
    updateTask,
    deleteTask
}


