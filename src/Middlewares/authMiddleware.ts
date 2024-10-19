import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../Types/jwtPayload'

interface AuthenticatedRequest extends Request {
  userId?: string; 
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1]; 

  if (!token) return res.status(401).json({ message: 'Access denied' });

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    
    const user = decoded as JwtPayload; 
    req.userId = user.id; 
    next();
  });
};
