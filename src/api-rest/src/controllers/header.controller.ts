import { Response, Request, NextFunction } from 'express';

export const HeaderController = {

  responseTypeJson: async (req: Request, res: Response, next: NextFunction) => {
    res.set('Content-Type', 'application/json');
    next();
  },
  
};
