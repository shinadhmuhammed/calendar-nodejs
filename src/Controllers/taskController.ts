import { Request, Response } from "express";
import { taskService } from "../Services/taskServices";
import { AuthenticatedRequest } from "../Middlewares/authMiddleware";
import { User } from "../Models/userModel";

class TaskController {
  public async createTask(req: AuthenticatedRequest, res: Response) {
    try {
      const { title, description, date, assignedTo } = req.body;
      const createdBy = req.userId;
      if (!createdBy) {
        return res
          .status(401)
          .json({ message: "Unauthorized, no user ID provided" });
      }
      const task = await taskService.createTask(
        title,
        description,
        date,
        assignedTo,
        createdBy
      );
      res.status(200).json(task);
    } catch (error: any) {
      console.log(error.message);
      res.status(400).json({ message: error.message });
    }
  }

  public async getTaskById(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.userId;
      if (!userId) {
        return res
          .status(401)
          .json({ message: "Unauthorized, no user ID provided" });
      }
      const task = await taskService.getTask(userId);
      res.status(200).json(task);
    } catch (error: any) {
      console.log(error.message);
      res.status(400).json({ message: error.message });
    }
  }
  public async getTasksForCurrentUser(
    req: AuthenticatedRequest,
    res: Response
  ) {
    try {
      const userId = req.userId;
      if (!userId) {
        return res
          .status(400)
          .json({ message: "User ID not found in request" });
      }

      const tasks = await taskService.getTasksAssignedToUser(userId);
      res.status(200).json(tasks);
    } catch (error: any) {
      console.error("Error fetching tasks for user:", error.message);
      res.status(500).json({ message: "Error fetching tasks" });
    }
  }

  public async getCurrentUserRole(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.userId;
      if (!userId) {
        return res
          .status(400)
          .json({ message: "User ID not found in request" });
      }
      const roles = await taskService.getUsersRole(userId);
      res.status(200).json(roles);
    } catch (error: any) {
      console.error("Error fetching roles for user:", error.message);
      res.status(500).json({ message: "Error fetching roles" });
    }
  }

  public async getTasksByManager(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.userId;
      if (!userId) {
        return res.status(400).json({ message: "User ID not found in request" });
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      if (user.role !== 'Manager') {
        return res.status(403).json({ message: "Access denied. Only managers can view their assigned tasks." });
      }
  
      const tasks = await taskService.getTasksCreatedByManager(userId);
      res.status(200).json(tasks);
    } catch (error: any) {
      console.error("Error fetching tasks created by manager:", error.message);
      res.status(500).json({ message: "Error fetching tasks" });
    }
  }
  

  public async editTask(req: AuthenticatedRequest, res: Response) {
    try {
      const { title, description } = req.body;
      const taskId = req.params.id;
    
      const updateTask = await taskService.updateTasks(
        title,
        description,
        taskId
      );
      res.status(200).json({ message: "update done successfully", updateTask });
    } catch (error) {
      res.status(500).json({ message: "Error editing the task" });
    }
  }
  public async deleteTask(req: Request, res: Response) {
    try {
      const taskId = req.params.id;
      const deleted = await taskService.deleting(taskId);
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting the task" });
    }
  }
}

export const taskController = new TaskController();
