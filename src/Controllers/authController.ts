import { Request, Response } from "express";
import { authService } from "../Services/auth.services";
import { User } from "../Models/userModel";
import { AuthenticatedRequest } from "../Middlewares/authMiddleware";

class AuthController {
  // Register User
  public async register(req: Request, res: Response) {
    try {
      const { name, email, password, role, managerId } = req.body;
      const user = await authService.register(
        name,
        email,
        password,
        role,
        managerId
      );
      res.status(201).json({ message: "User registered successfully", user });
    } catch (err: any) {
      console.error(err.message);
      res.status(400).json({ message: err.message });
    }
  }

  // Login User
  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { user, token } = await authService.login(email, password);
      res.status(200).json({ message: "Login successful", user, token });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  public async getManager(req: Request, res: Response) {
    try {
      const managers = await User.find({ role: "Manager" });
      res.status(200).json(managers);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  //Getting employees of the specific manager
  public async getEmployeesByManager(req: AuthenticatedRequest, res: Response) {
    try {
      const managerId = req.userId;
      if (!managerId) {
        return res.status(400).json({ message: "Manager ID not found" });
      }
      const employees = await authService.getEmployees(managerId);
      res.status(200).json(employees);
    } catch (error) {}
  }
}

export const authController = new AuthController();
