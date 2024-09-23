import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
// import cors from "cors";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1/user", userRoutes);
app.get("/health", (req, res) => {
    res.status(200).json({
        message: "All systems are running fine...",
    });
});

app.listen(3000, () => {
  console.log(`Server is running on port ${PORT} 🔥🔥`);
});

