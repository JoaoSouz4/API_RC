import User from "../models/userModel";
import { NextFunction, Request, Response } from 'express';
const bcrypt = require('bcrypt')

export const loginValidation = async(req: Request, res: Response, next: NextFunction) => {
    const { userEmail, userPass } = req.body;

    const user : any = await User.findOne({userEmail: userEmail});

    if(!user) return res.status(401).json({
        message: "Email de usuário não registrado no sistema",
        isSucess: false
    });

    const checkPassword = await bcrypt.compare(userPass, user.pass);
    if(!checkPassword) return res.status(401).json({
        message: "Senha incorreta",
        isSucess: false
    });

    next();
}