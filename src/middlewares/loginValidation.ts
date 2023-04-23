import User from "../models/userModel";
import { NextFunction, Request, Response } from 'express';
const bcrypt = require('bcrypt');

export const loginValidation = async(req: Request, res: Response, next: NextFunction) => {
    const { userName, userPass } = req.body;
    const user : any = await User.findOne({userName: userName});

    if(!user) return res.status(401).json({
        message: `Usuário ${userName} não registrado no sistema`,
        isSucess: false,
    });

    const checkPassword = await bcrypt.compare(userPass, user.userPass);
    if(!checkPassword) return res.status(401).json({
        message: "Senha incorreta",
        isSucess: false,
    });

    next();
}