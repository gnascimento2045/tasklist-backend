import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", taskRoutes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
