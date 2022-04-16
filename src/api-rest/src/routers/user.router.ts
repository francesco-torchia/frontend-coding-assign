import { UserController } from '../controllers/user.controller';
import { Router } from './router';

class UserRouter extends Router {

  constructor() {

    super({
      basePath: '/user*',
      authenticate: true,
    });

    this.router.get('/users', UserController.userListGet);

    this.router.get('/user/:id', UserController.userGet);

  }
}

export const userRouter = new UserRouter().router;
