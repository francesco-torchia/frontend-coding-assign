import { Request, Response, NextFunction } from 'express';
import { Role, User } from '../models/user';
import { http } from '../lib/api/error.api';
import { error, success } from '../lib/api/message.api';

export const UserController = {

  userListGet: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const role = req.query.role as Role;
      const list = await User.listDetails(role);
      res.status(http.OK).send(success({ data: list }));
    } catch (err) {
      next(err);
    }
  },

  userGet: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const user = await User.getDetail(id);
      if (!user) {
        res.status(http.NOT_FOUND).send(error('User not found'));
      } else {
        res.status(http.OK).send(success({ data: user }));
      }
    } catch (err) {
      next(err);
    }
  },

};
