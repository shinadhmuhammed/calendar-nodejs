import { Task } from "../Models/taskModel";
import { User } from "../Models/userModel";

class TaskService {
  constructor() {}

  public async createTask(
    title: string,
    description: string,
    date: Date,
    assignedTo: string,
    createdBy: string
  ) {
    try {
      const newTask = new Task({
        title,
        description,
        date: new Date(date),
        assignedTo,
        createdBy,
      });
      await newTask.save();
      return newTask;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error creating task:", error.message);
        throw new Error(error.message || "Error creating task");
      }
    }
  }
  public async getTask(userId: string) {
    try {
      const tasks = await Task.find({ createdBy: userId }).populate(
        "assignedTo",
        "username"
      );
      return tasks;
    } catch (error: any) {
      console.error("Error fetching tasks:", error.message);
      throw new Error(error.message || "Error fetching tasks");
    }
  }

  public async getTasksAssignedToUser(userId: string) {
    try {
      const tasks = await Task.find({ assignedTo: userId }).populate(
        "createdBy",
        "username"
      );
      return tasks;
    } catch (error: any) {
      console.error("Error fetching tasks:", error.message);
      throw new Error(error.message || "Error fetching tasks");
    }
  }

  public async getTasksCreatedByManager(managerId: string) {
    try {
      const tasks = await Task.find({ createdBy: managerId }).populate('assignedTo', 'username');
      return tasks;
    } catch (error: any) {
      console.error("Error fetching tasks created by manager:", error.message);
      throw new Error(error.message || "Error fetching tasks created by manager");
    }
  }
  

  public async getUsersRole(userId: string) {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error: any) {
      throw new Error(
        error.message || "Error fetching role of the currentuser"
      );
    }
  }

  public async updateTasks(title: string, description: string, taskId: string) {
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { title, description },
        { new: true }
      );
      return updatedTask;
    } catch (error: any) {
      throw new Error(error.message || "Error updating the task");
    }
  }

  public async deleting(taskId: string) {
    try {
      const deletedTask = await Task.findByIdAndDelete(taskId);
      return deletedTask;
    } catch (error: any) {
      throw new Error(error.message || "Error deleting the task");
    }
  }
}

export const taskService = new TaskService();
