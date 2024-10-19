import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../Models/userModel';

class AuthService {
  constructor() {}

  // Register new user
  public async register(name: string, email: string, password: string, role: string, managerId?: string): Promise<IUser> {
    try {
      const userExists = await User.findOne({ email });
      if (userExists) throw new Error('User already exists');
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        username: name, 
        email,
        password: hashedPassword,
        role,
        managerId: managerId ? managerId : undefined,
      });
  
      await user.save();
      return user;
    } catch (error: any) {
      console.error('Error during registration:', error.message);
      throw new Error(error.message || 'Error registering user');
    }
  }

  // Login user
  public async login(email: string, password: string): Promise<{ user: IUser, token: string }> {
    try {
      const user = await User.findOne({ email });
      if (!user) throw new Error('Invalid credentials');
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error('Invalid credentials');
      
      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
      });

      return { user, token };
    } catch (error: any) {
      console.error('Error during login:', error.message);
      throw new Error(error.message || 'Login failed');
    }
  }

 
  public async getEmployees(managerId: string): Promise<IUser[]> {
    try {
      const employees = await User.find({ role: 'Employee', managerId });
      return employees;
    } catch (error: any) {
      console.error('Error fetching employees:', error.message);
      throw new Error(error.message || 'Error fetching employees');
    }
  }
}

export const authService = new AuthService();
