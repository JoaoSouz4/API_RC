import { Router } from 'express';
import UserController from './controllers/userController';
import { registerValidation } from './middlewares/registerValidation';
import { loginValidation } from './middlewares/loginValidation';
import DrawController from './controllers/drawController';
import { checkToken } from './middlewares/chekToken';

const routes = Router();

routes.post('/register', registerValidation, UserController.userRegister);
routes.post('/login', loginValidation, UserController.userLogin);

routes.get('/getdraws', DrawController.getAllDraws);
routes.post('/store', DrawController.store);
routes.get('/likepost', checkToken)

export default routes;