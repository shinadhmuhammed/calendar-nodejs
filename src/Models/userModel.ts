import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  managerId?: mongoose.Schema.Types.ObjectId;
}

class UserModel {
  private userSchema: Schema;

  constructor() {
    this.userSchema = new Schema({
      username: { type: String, required: true, unique: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      role: { type: String, enum: ["Employee", "Manager"], required: true },
      managerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    });
  }

  public getModel() {
    return mongoose.model<IUser>("User", this.userSchema);
  }
}

export const User = new UserModel().getModel();
