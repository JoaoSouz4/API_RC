import Draw from "../models/drawModel";
import User from "../models/userModel";
import Commentary from "../models/commentaryModel";
import { Request, Response} from 'express';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {
   

    public static async userRegister(req: Request, res: Response){
        const { userName, userEmail, userPass } = req.body;
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


    public static async userLikePost( req: Request, res: Response) {
        const userId = req.params.iduser;
        const postId = req.params.idpost

        try {
            const user = await User.findById({ _id :userId});
            const post = await Draw.findById({_id: postId});

            const userInPost = await Draw.findOne({_idUser: userId});
            if(userInPost){
                return res.status(200).json({
                    message: "O usuário já curtiu uma vez",
                    isSucess: true,
                });
            }
            post?.usersLiked.push({_idUser: userId, userName: user?.userName});
            post?.save();

            return res.status(200).json({
                message: "Curtida inserida com sucesso",
                isSucess: true,
                currentQtdLikes: post?.usersLiked.length
            });

        } catch (error) {
            console.log(error);
            return res.status(400).json({message: "não foi possível curtir este post"});
        }
    }



    public static async userDeslikePost(req: Request, res: Response){
        const userId = req.params.iduser;
        const postId = req.params.idpost

        try {
            const user = await User.findById({ _id :userId});
            const post = await Draw.findById({_id: postId});
            
            const resp = await Draw.findOneAndUpdate({ title : post?.title }, {$pull : { usersLiked : {_idUser: userId}}})
            const newFind = await Draw.findOne({title: post?.title});

            return res.status(200).json({
                message: "Curtida tirada do registro",
                isSucess: true,
                currentQtdLikes: newFind?.usersLiked.length,
                resp
            });

        } catch (error) {
            console.log(error);
            return res.status(401).json({message: "não foi possível descurtir este post"});
        }
    }

    public static async userComment(req: Request, res: Response) {
        
        const userId = req.params.userid;
        const postId = req.params.postid;
        const commentary = req.params.commentary

        const user = await User.findById({_id: userId});
        const post = await Draw.findById({_id: postId});

        try {
            post?.usersComments.push( await Commentary.create({
                idUser: userId,
                idPost: postId,
                userName: user?.userName,
                commentary: commentary
        }));

            post?.save();
            return res.status(200).json({ 
                message: "Comentário registrado com sucesso", 
                isSucess: true, 
                currentComments: post?.usersComments
            })

        } catch (error) {
            return res.status(401).json({ message: "Não foi possível registrar o comentário", isSucess: false});
        }
    }

    public static async getComments (req: Request, res: Response){
        const postId = req.params.id;
        const post = await  Draw.findById({_id: postId});
        console.log(post?.usersComments)
        return res.status(200).json({
            isSucess: true,
            currentComments: post?.usersComments
        });
    }

    public static async dropComment (req: Request, res: Response){
        const postId = req.params.idpost;
        const commentId = req.params.idcomment;

        const post : any = await Draw.findById({ _id: postId});

        for( let i in post.usersComments ){

            if (post.usersComments[i]._id == commentId){
                post.usersComments.splice(i, 1);
            }
        }
        await post.save()
        return res.status(200).json({
            isSucess: true,
            currentComments : post.usersComments
        });
    }

}

export default UserController;
