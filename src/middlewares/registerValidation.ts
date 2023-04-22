import { NextFunction, Request, Response } from 'express';
import User from '../models/userModel';

export const registerValidation = async (req: Request, res: Response, next: NextFunction) => {
    const { userEmail, userPass, userConfirmPass }  = req.body;

    const user: any = await User.findOne({userEmail: userEmail});

    if(user) return res.status(401).json({
        message: "Este email já está sendo usado, por favor, insira um novo e-mail.",
        isSucess: false,
    });

    if(userPass != userConfirmPass) return res.status(401).json({
        message: "As senhas precisam ser iguais",
        isSucess: false
    });

    next();
}