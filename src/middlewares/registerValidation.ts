import { NextFunction, Request, Response } from 'express';
import User from '../models/userModel';

export const registerValidation = async (req: Request, res: Response, next: NextFunction) => {
    const { userName, userEmail, userPass, userConfirmPass }  = req.body;

    const user: any = await User.findOne({userEmail: userEmail});
    const userN: any = await User.findOne({userName: userName});

    if(userN) return res.status(401).json({
        message: `${userName} não está disponível como nome de usuário.`,
        isSucess: false,
    });
    
    if(user) return res.status(401).json({
        message: `O ${userEmail} já está sendo usando por outro usuário.`,
        isSucess: false,
    });

    if(userPass != userConfirmPass) return res.status(401).json({
        message: "As senhas precisam ser iguais",
        isSucess: false
    });

    next();
}