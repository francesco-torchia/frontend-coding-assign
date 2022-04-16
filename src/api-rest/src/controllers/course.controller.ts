import { NextFunction, Request, Response } from 'express';
import { Course } from '../models/course';
import { User } from '../models/user';
import { error, success } from '../lib/api/message.api';
import { http } from '../lib/api/error.api';
import { Enrolment, EnrolmentDetails } from '../models/enrolment';

export const CourseController = {

  courseListGet: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teacherId = req.query.teacherId as string;
      const list = await Course.listDetails(teacherId);
      res.status(http.OK).send(success({ data: list }));
    } catch (err) {
      next(err);
    }
  },

  courseStudentsGet: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;
      const course = await Course.get(courseId);
      if (!course) {
        res.status(http.NOT_FOUND).send(error('Course not found'));
      } else {
        const list: Array<EnrolmentDetails> = await Enrolment.listDetailsByCourseId(courseId);
        res.status(http.OK).send(success({ data: list }));
      }
    } catch (err) {
      next(err);
    }
  },

  courseGet: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const course = await Course.getDetails(id);
      if (!course) {
        res.status(http.NOT_FOUND).send(error('Course Not found'));
      } else {
        res.status(http.OK).send(success({ data: course }));
      }
    } catch (err) {
      next(err);
    }
  },

  coursePost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newCourse: Course = req.body;
      if (Course.validate.create(newCourse)) {
        res.status(http.BAD_REQUEST).send(error('Missing course mandatory properties'));
      } else {
        const courses = await Course.list();
        if (courses.find((c) => c.title === newCourse.title)) {
          res.status(http.BAD_REQUEST).send(error(`Course ${newCourse.title} already exists`));
        } else {
          const course = await Course.create(newCourse);
          res.status(http.OK).send(success({ data: course }));
        }
      }
    } catch (err) {
      next(err);
    }
  },

  coursePut: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const course: Course = req.body;
      if (Course.validate.update(course)) {
        res.status(http.BAD_REQUEST).send(error('Missing course mandatory properties'));
      } else {
        const teacher = await User.getDetail(course.teacherId);
        if (course.teacherId && !teacher) {
          res.status(http.BAD_REQUEST).send(error(`TeacherId ${course.teacherId} not found`));
        } else if (teacher && teacher.role !== 'Teacher') {
          res.status(http.BAD_REQUEST).send(error(`User ${teacher.name} is not a teacher`));
        } else {
          const courses = await Course.list();
          if (courses.find((c) => c.title === course.title && c.id != course.id)) {
            res.status(http.BAD_REQUEST).send(error(`Course ${course.title} already exists`));
          } else {
            const coursesUpd = await Course.update(course);
            if (!coursesUpd) {
              res.status(http.NOT_FOUND).send(error(`Course ${course.id} not found`));
            } else {
              res.status(http.OK).send(success({ data: coursesUpd }));
            }
          }
        }
      }
    } catch (err) {
      next(err);
    }
  },

  courseDelete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const course = await Course.get(id);
      if (!course) {
        res.status(http.NOT_FOUND).send(error('Course not found'));
      } else {
        await Course.remove(id);
        res.status(http.OK).send(success());
      }
    } catch (err) {
      next(err);
    }
  },

};
