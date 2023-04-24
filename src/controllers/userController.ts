import User from "../models/userModel";
import { Request, Response} from 'express';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {
   

    public static async userRegister(req: Request, res: Response){
        const { userName, userLastName, userEmail, userPass } = req.body;
        const salt = await bcrypt.genSalt(12);
        const  passHash = await bcrypt.hash(userPass, salt);

        const user = new User({
            userName,
            userEmail,
            userPass: passHash
        });

        try {
            await user.save();
            return res.status(200).json({
                message: "Cadastro realizdo com sucesso",
                isSucess: true
            });
        }catch(error) {
            return res.status(500).json({error})
        }
    }

    public static async userLogin(req: Request, res: Response) {

        const { userName } = req.body;
        const user: any = await User.findOne({userName: userName});

        try{
            const secret = process.env.SECRET;
            const token = jwt.sign({id: user._id, userName: userName}, secret);

            return res.status(200).json({
                message: "login realizado com sucesso",
                isSucess: true,
                token: token
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export default UserController;