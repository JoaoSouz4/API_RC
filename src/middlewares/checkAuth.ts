import { NextFunction, Request, Response } from 'express';
const jwt = require('jsonwebtoken');

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(authHeader);
    console.log(token);
    
    if(!token || token == null) return res.status(401).json({message: "Acesso negado", status: false,});
    try {
        const secret = process.env.SECRET;
        console.log(secret)
        const authData = jwt.verify(token, secret);
        next();
    } catch (error) {
         return res.status(400).json({message: "Token Inválido", status: false,});
    }
}