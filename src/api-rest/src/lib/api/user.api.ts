import { Request } from 'express';
import { User, UserDetails } from '../../models/user';
import { Mode } from '../server';

export const loggedUser: { [k in Mode]: (req: Request) => Promise<UserDetails> } = {
  prod: async (req) => {
    return (req as any).loggedUser;
  },
  dev: async (req) => {
    const userId = req.query.userId as string;
    if (userId) {
      return await User.getDetail(userId);
    }
    return { id: '', name: '', role: 'NoRole' };
  }
};