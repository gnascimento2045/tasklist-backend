import { Router } from "express";
import * as taskController from "../controllers/taskController";

const router = Router();

router.get("/tasks", taskController.getAll);
router.post("/tasks", taskController.create);
router.put("/tasks/:id", taskController.update);
router.delete("/tasks/:id", taskController.remove);
router.patch("/tasks/:id/favorite", taskController.toggleFavorite);
router.patch("/tasks/:id/color", taskController.changeColor);

export default router;
