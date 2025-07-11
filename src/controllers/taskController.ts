import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /tasks
export const getAll = async (_req: Request, res: Response) => {
  const tasks = await prisma.task.findMany({
    orderBy: [{ isFav: "desc" }, { createdAt: "desc" }],
  });
  res.json(tasks);
};

// POST /tasks
export const create = async (req: Request, res: Response) => {
  const { title, color } = req.body;

  if (!title) return res.status(400).json({ error: "Title is required" });

  const task = await prisma.task.create({
    data: { title, color: color || "#FFFFFF", isFav: false },
  });

  res.status(201).json(task);
};

// PUT /tasks/:id
export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, color, isFav } = req.body;

  try {
    const task = await prisma.task.update({
      where: { id },
      data: { title, color, isFav },
    });
    res.json(task);
  } catch (err) {
    res.status(404).json({ error: "Task not found" });
  }
};

// DELETE /tasks/:id
export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.task.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: "Task not found" });
  }
};

// PATCH /tasks/:id/favorite
export const toggleFavorite = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) return res.status(404).json({ error: "Task not found" });

    const updated = await prisma.task.update({
      where: { id },
      data: { isFav: !task.isFav },
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Internal error" });
  }
};

// PATCH /tasks/:id/color
export const changeColor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { color } = req.body;

  if (!color) return res.status(400).json({ error: "Color is required" });

  try {
    const updated = await prisma.task.update({
      where: { id },
      data: { color },
    });

    res.json(updated);
  } catch (err) {
    res.status(404).json({ error: "Task not found" });
  }
};
