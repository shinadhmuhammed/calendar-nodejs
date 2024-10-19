import { Router } from "express";
import { authController } from "../Controllers/authController";
import { authenticateToken } from "../Middlewares/authMiddleware";
import { taskController } from "../Controllers/taskController";

class AuthRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.post("/signup", authController.register);
    this.router.post("/login", authController.login);
    this.router.get("/manager", authController.getManager);
    this.router.get("/employees",authenticateToken,authController.getEmployeesByManager);
    this.router.post("/tasks",authenticateToken,taskController.createTask);
    this.router.get("/getTasks",authenticateToken,taskController.getTaskById);
    this.router.get('/tasks/my-tasks', authenticateToken, taskController.getTasksForCurrentUser);
    this.router.get('/user/role', authenticateToken, taskController.getCurrentUserRole);
    this.router.put('/tasks/:id', authenticateToken, taskController.editTask);
    this.router.delete('/tasks/:id', authenticateToken, taskController.deleteTask);
    
  }
}

export const authRoutes = new AuthRoutes().router;
