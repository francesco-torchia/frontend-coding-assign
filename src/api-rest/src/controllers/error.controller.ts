/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { http } from '../lib/api/error.api';
import { error } from '../lib/api/message.api';
import { log } from '../lib/log';

export const ErrorController = {

  handler: (err: Error, req: Request, res: Response, next: NextFunction) => {
    log.error('error.controller', err as any);
    res.status(http.INTERNAL_SERVER).send(error(err.stack, 'Internal Server Error'));
  },

};