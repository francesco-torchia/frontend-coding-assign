import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, UserDetails } from '../models/user';
import { CONFIG } from '../lib/config';
import { http } from '../lib/api/error.api';
import { error } from '../lib/api/message.api';

function matchUser(username: string) {
  return (u: UserDetails) => u.name.replace(/\s/g, '').toUpperCase() === username?.replace(/\s/g, '').toUpperCase();
}

export const LoginController = {

  loginPost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      /** Password could be stored using bcrypt */
      const { username /** ,password */ } = req.body;
      const users = await User.listDetails();
      const user = users.find(matchUser(username));
      if (user) {
        const jwtToken = jwt.sign(
          { id: user.id, name: user.name, role: user.role },
          CONFIG.auth.jwtTokenSecret,
          { expiresIn: CONFIG.auth.jwtTokenExpiresIn }
        );
        res.json({ jwtToken });
      } else {
        res.status(http.BAD_REQUEST).send(error('Invalid Username'));
      }
    } catch (err) {
      next(err);
    }
  },

  /** Todo */
  logoutPost: async () => null,

};
