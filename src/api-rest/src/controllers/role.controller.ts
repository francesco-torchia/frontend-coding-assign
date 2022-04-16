import { NextFunction, Request, Response } from 'express';
import { Role } from '../models/user';
import { SERVER } from '../lib/server';
import { http } from '../lib/api/error.api';
import { error } from '../lib/api/message.api';
import { loggedUser } from '../lib/api/user.api';

export const RoleController = {

  allow: (role: Array<Role> | Role) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const user = await loggedUser[SERVER.mode](req);
        if (!user || user.role == null) {
          res.status(http.DENIED).send(error('Unknown user'));
        } else if (!(Array.isArray(role) ? role : [role]).includes(user.role)) {
          res.status(http.DENIED).send(error(`User [${user.name}] is not allowed to perform this action`));
        } else {
          next();
        }
      } catch (err) {
        next(err);
      }
    };
  }

};
