import { query } from '../database/query';
import { DB } from '../database/db';
import _ from 'lodash';

export interface CourseDetails extends Course {
  teacher: string;
}

export interface Course {
  id?: string;
  title: string;
  teacherId: string;
  isAvailable: boolean;
}

export const Course = {
  list: () => {
    return DB.selectAll<Course>(query.course.select);
  },

  listDetails: (teacherId?: string) => {
    return teacherId == null
      ? DB.selectAll<CourseDetails>(query.course.selectDetails)
      : DB.selectAll<CourseDetails>([query.course.selectDetails, query.course.where.teacherId], teacherId);
  },

  get: (id: string) => {
    return DB.select<Course>([query.course.select, query.course.where.courseId], id);
  },

  getDetails: (id: string) => {
    return DB.select<CourseDetails>([query.course.selectDetails, query.course.where.courseId], id);
  },

  create: async (course: Partial<Course>) => {
    const id = await DB.insert<Partial<Course>>(query.course.insert, course);
    return DB.select<Course>([query.course.select, query.course.where.courseId], id);
  },

  update: async (c: Partial<Course>) => {
    await DB.update<Partial<Course>>(query.course.update, { title: c.title, teacherId: c.teacherId, isAvailable: c.isAvailable }, c.id);
    return DB.select<Course>([query.course.select, query.course.where.courseId], c.id);
  },

  remove: (id: string) => {
    return DB.delete(query.course.delete, id);
  },

  validate: {
    create: (course: Course) => {
      return _.isEmpty(course) || _.isEmpty(course.title);
    },
    update: (course: Course) => {
      return _.isEmpty(course) || course.id == null || course.id === '' || _.isEmpty(Object.keys(course).filter((f) => f !== 'id'));
    },
  }
} as const;
