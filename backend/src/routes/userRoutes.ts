import express from "express";
import { userController } from "../controllers/userControllers";
import { verifyToken } from "../middlewares/verifyToken";

const userRouter = express.Router();



// @desc Signup user
// @route POST /api/v1/user/signup
userRouter.post("/signup", userController.signupUser);

// @desc Login user
// @route POST /api/v1/user/login
userRouter.post("/signin", userController.loginUser);   


// @desc Get user profile
// @route GET /api/v1/user/profile
// @access Private
userRouter.get("/profile", verifyToken, userController.getUserProfile);


export default userRouter;
