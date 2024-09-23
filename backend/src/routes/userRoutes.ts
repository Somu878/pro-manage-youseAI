import express from "express";
import { getUsers } from "../controllers/userControllers";

const userRoutes = express.Router();

userRoutes.get("/", getUsers);

export default userRoutes;
