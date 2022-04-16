import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { http } from '../lib/api/error.api';
import { error } from '../lib/api/message.api';
import { CONFIG } from '../lib/config';
import { log } from '../lib/log';

export const AuthController = {

  jwtAuthenticate: async (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;
    if (auth) {
      const token = auth.split(' ')[1];
      try {
        const user = await jwt.verify(token, CONFIG.auth.jwtTokenSecret);
        (req as any).loggedUser = user;
        next();
      } catch (err) {
        log.error('auth.controller', err as string);
        res.status(http.DENIED).send(error('Authentication failed'));
      }
    } else {
      res.status(http.UNAUTHORIZED).send(error('Unauthorized'));
    }
  },
  
};
