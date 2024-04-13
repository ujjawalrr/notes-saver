import { Request, Response, NextFunction } from 'express'; // Import types for Express
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json({ message: 'Unauthorised!' });

    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
        if (err) return res.status(403).json({ message: 'Forbidden!' });
        (req as any).user = user;
        next();
    });
};