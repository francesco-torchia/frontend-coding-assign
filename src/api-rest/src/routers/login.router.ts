import { LoginController } from '../controllers/login.controller';
import { Router } from './router';

class LoginRouter extends Router {

  constructor() {
    
    super({
      basePath: '/login',
      authenticate: false
    });

    this.router.post('/login', LoginController.loginPost);

    this.router.post('/logout', LoginController.logoutPost);
  }

}

export const loginRouter = new LoginRouter().router;