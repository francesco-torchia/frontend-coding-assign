import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import { SERVER } from '../lib/server';

interface RouterParams {
  basePath: string,
  authenticate: boolean,
}

export abstract class Router {

  public router;

  constructor(opt: RouterParams) {

    this.router = express.Router();

    /** Authentication */
    if (opt.authenticate && SERVER.mode === 'prod') {
      this.router.all(opt.basePath, AuthController.jwtAuthenticate);
    }

    /** Set api Headers */
    // this.router.all(basePath, HeaderController.yourMethod);
  }

}