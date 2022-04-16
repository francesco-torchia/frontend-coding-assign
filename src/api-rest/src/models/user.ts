import { query } from '../database/query';
import { DB } from '../database/db';
import _ from 'lodash';

export type Role = 'Admin' | 'Teacher' | 'Student' | 'NoRole';

export interface UserDetails extends User {
  role: Role;
}

export interface User {
  id?: string;
  name: string;
  roleId?: string;
}

export const User = {
  list: () => {
    return DB.selectAll<User>(query.user.select);
  },

  listDetails: (role?: Role) => {
    return role == null
      ? DB.selectAll<UserDetails>(query.user.selectDetails)
      : DB.selectAll<UserDetails>([query.user.selectDetails, query.user.where.role], role);
  },

  get: (id: string) => {
    return DB.select<User>([query.user.select, query.user.where.userId], id);
  },

  getDetail: (id: string) => {
    return DB.select<UserDetails>([query.user.selectDetails, query.user.where.userId], id);
  },

  create: async (user: User) => {
    const id = await DB.insert<Partial<User>>(query.user.insert, user);
    return DB.select<User>([query.user.select, query.user.where.userId], id);
  },

  /** Todo */
  update: () => null,

  remove: (id: string) => {
    return DB.delete(query.user.delete, id);
  },

  validate: {
    create: (user: User) => {
      return _.isEmpty(user) || _.isEmpty(user.name) || _.isEmpty(user.roleId);
    }
  }
} as const;