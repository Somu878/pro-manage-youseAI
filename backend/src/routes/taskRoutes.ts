import { Router } from "express";
import { taskController } from "../controllers/taskController";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

router.use(verifyToken);

//@desc Create a new task
//@route POST /api/tasks
//@access Private
router.post("/",taskController.createTask);

//@desc Get all tasks
//@route GET /api/v1/tasks
//@access Private
router.get("/board",  taskController.getTasks);

//@desc Update Tasks
//@route POST /api/v1/tasks/board
//@acess Private
router.patch("/board", taskController.updateTasksStatus);

//@desc Get task by id
//@route GET /api/tasks/:id
//@access Private
router.get("/:id",  taskController.getTaskById);

//@desc Update task by id
//@route PATCH /api/tasks/:id
//@access Private
router.patch("/:id",  taskController.updateTask);

//@desc Delete task by id
//@route DELETE /api/tasks/:id
//@access Private
router.delete("/:id",  taskController.deleteTask);

export default router;

