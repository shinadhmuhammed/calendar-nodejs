import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../Models/userModel';

class AuthService {
  constructor() {}

  public async register(name: string, email: string, password: string, role: string, managerId?: string): Promise<IUser> {
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
  }
  

  public async login(email: string, password: string): Promise<{ user: IUser, token: string }> {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid credentials');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });
    console.log(token)

    return { user, token };
  }

  
  public async getUserById(id: string): Promise<IUser | null> {
    return User.findById(id);
  }
}

export const authService = new AuthService();
