import { query } from '../database/query';
import { DB } from '../database/db';
import _ from 'lodash';

export interface EnrolmentDetails extends Enrolment {
  student: string,
}

export interface Enrolment {
  id?: string;
  mark?: boolean;
  courseId: string;
  userId?: string;
}

export const Enrolment = {

  listByStudentId: (studentId?: string) => {
    return studentId == null
      ? DB.selectAll<Enrolment>(query.enrolment.select)
      : DB.selectAll<Enrolment>([query.enrolment.select, query.enrolment.where.userId], studentId);
  },

  listDetailsByCourseId: (courseId?: string) => {
    return courseId == null
      ? DB.selectAll<EnrolmentDetails>(query.enrolment.selectDetails)
      : DB.selectAll<EnrolmentDetails>([query.enrolment.selectDetails, query.enrolment.where.courseId], courseId);
  },

  get: (id: string) => {
    return DB.select<Enrolment>([query.enrolment.select, query.enrolment.where.enrolmentId], id);
  },

  create: async (enrolment: Partial<Enrolment>) => {
    const id = await DB.insert<Partial<Enrolment>>(query.enrolment.insert, enrolment);
    return DB.select<Enrolment>([query.enrolment.select, query.enrolment.where.enrolmentId], id);
  },

  update: async (enrolment: Partial<Enrolment>) => {
    await DB.update<Partial<Enrolment>>(query.enrolment.update, { mark: enrolment.mark as boolean }, enrolment.id);
    return DB.select<Enrolment>([query.enrolment.select, query.enrolment.where.enrolmentId], enrolment.id);
  },

  remove: (id: string) => {
    return DB.delete(query.enrolment.delete, id);
  },

  validate: {
    create: (enrolment: Enrolment) => {
      return _.isEmpty(enrolment) || enrolment.courseId == null || enrolment.courseId === '';
    },
    update: (enrolment: Enrolment) => {
      return _.isEmpty(enrolment) || enrolment.id == null || enrolment.id === '';
    },
  }
} as const;