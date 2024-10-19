import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
}

class taskModel {
  private taskSchema: Schema;

  constructor() {
    this.taskSchema = new Schema({
      title: { type: String, required: true },
      description: { type: String,required:true },
      date: { type: Date, required: true },
      assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    });
  }

  public getModel() {
    return mongoose.model<ITask>("Task", this.taskSchema);
  }
}

export const Task = new taskModel().getModel();
