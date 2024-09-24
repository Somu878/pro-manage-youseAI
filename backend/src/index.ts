import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes";
import taskRouter from "./routes/taskRoutes";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
//json parser middleware
app.use(express.json());

//cors
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],  
}));
//user routes
app.use("/api/v1/user", userRouter);
//task routes
app.use("/api/v1/task", taskRouter);

//health check
app.get("/health", (req, res) => {
    res.status(200).json({
        message: "All systems are running fine...",
    });
});
//server listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🔥🔥`);
});

