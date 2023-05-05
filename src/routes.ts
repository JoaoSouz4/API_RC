import { Router } from 'express';
import UserController from './controllers/userController';
import { registerValidation } from './middlewares/registerValidation';
import { loginValidation } from './middlewares/loginValidation';
import DrawController from './controllers/drawController';
import { checkToken } from './middlewares/chekToken';
import { checkAuth} from './middlewares/checkAuth';

const routes = Router();

routes.post('/register', registerValidation, UserController.userRegister);
routes.post('/login', loginValidation, UserController.userLogin);

routes.get('/getdraws', DrawController.getAllDraws);
routes.get('/getdraws/:section', DrawController.getSomeDraw);
routes.post('/store', DrawController.store);
routes.get('/auth', checkToken);

routes.post('/likepost/:iduser/:idpost', checkAuth, UserController.userLikePost);
routes.post('/deslikepost/:iduser/:idpost', checkAuth, UserController.userDeslikePost);

routes.post('/insert/:userid/:postid/:commentary', checkAuth, UserController.userComment);
routes.get('/getcomments/:id', UserController.getComments);
routes.post('/dropcomment/:idcomment/:idpost',checkAuth, UserController.dropComment);
export default routes;