import { Router } from 'express';
import UserController from './controllers/userController';
import { registerValidation } from './middlewares/registerValidation';
import { loginValidation } from './middlewares/loginValidation';

const routes = Router();

routes.post('/register', registerValidation, UserController.userRegister);
routes.post('/login', loginValidation, UserController.userLogin);

export default routes;