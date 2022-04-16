import { Request, Response, NextFunction } from 'express';
import { http } from '../lib/api/error.api';
import { error, success } from '../lib/api/message.api';
import { Enrolment } from '../models/enrolment';
import { loggedUser } from '../lib/api/user.api';
import { SERVER } from '../lib/server';
import { Course } from '../models/course';

export const EnrolmentController = {

  enrolmentListGet: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await loggedUser[SERVER.mode](req);

      const list = await Enrolment.listByStudentId(user.id);
      res.status(http.OK).send(success({ data: list })); 
    } catch (err) {
      next(err);
    }
  },

  enrolmentGet: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await loggedUser[SERVER.mode](req);
      const id = req.params.id;
      const enrolment = await Enrolment.get(id);
      if (!enrolment || enrolment.userId != user.id) {
        res.status(http.NOT_FOUND).send(error('Enrolment not found'));
      } else {
        res.status(http.OK).send(success({ data: enrolment }));
      }
    } catch (err) {
      next(err);
    }
  },

  enrolmentPost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await loggedUser[SERVER.mode](req);
      const enrolment: Enrolment = req.body;

      if (Enrolment.validate.create(enrolment)) {
        res.status(http.BAD_REQUEST).send(error('Missing enrolment mandatory properties'));
      } else {
        const course = await Course.get(enrolment.courseId);
        if (!course) {
          res.status(http.NOT_FOUND).send(error(`Course ${enrolment.courseId} not found`));
        } else if (!course.isAvailable) {
          res.status(http.BAD_REQUEST).send(error(`Course ${course.title} is Unavailable`));
        } else {
          const list = await Enrolment.listByStudentId(user.id);

          /** Student must not have an enrolment in progress (mark == null) or already passed the course (mark === true) */
          const inProgressCourse = list.find((c) => c.mark == null);
          const passedCourse = list.find((en) => enrolment.courseId == en.courseId && en.mark === true);
          const failedCourse = list.find((en) => enrolment.courseId == en.courseId && en.mark === false);

          if (inProgressCourse || passedCourse) {
            res.status(http.BAD_REQUEST).send(
              error(`Student ${user.id} already enroled to course: ${(inProgressCourse || passedCourse)?.courseId}`)
            );
          } else { 
            if (failedCourse) {
              await Enrolment.remove(failedCourse.id as string);
            }
            const en = await Enrolment.create({ courseId: enrolment.courseId, userId: user.id });
            res.status(http.OK).send(success({ data: en }));
          }
        }
      }
    } catch (err) {
      next(err);
    }
  },

  enrolmentPut: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teacher = await loggedUser[SERVER.mode](req);
      const en: Enrolment = req.body;

      if (Enrolment.validate.update(en)) {
        res.status(http.BAD_REQUEST).send(error('Missing Enrolment mandatory properties'));
      } else {
        const enrolment = await Enrolment.get(en.id as string);
        if (!enrolment) {
          res.status(http.BAD_REQUEST).send(error(`Enrolment ${en.id} not found`));
        } else {
          const course: Course = await Course.get(enrolment.courseId);
          if (course.teacherId != teacher.id) {
            res.status(http.BAD_REQUEST).send(error(`Error, User ${enrolment.userId} is not your student`));
          } else {
            const upd = await Enrolment.update({ id: en.id, mark: en.mark });
            res.status(http.OK).send(success({ data: upd }));
          }
        }
      }
    } catch (err) {
      next(err);
    }
  },

  enrolmentDelete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await loggedUser[SERVER.mode](req);
      const userId = user.id as string;
      const enrolmentId = req.params.id;

      const en: Enrolment = await Enrolment.get(enrolmentId);
      if (!en) {
        res.status(http.NOT_FOUND).send(error('Enrolment not found'));
      } else if (en.userId != userId) {
        res.status(http.BAD_REQUEST).send(error('Cannot remove an Enrolment of another student'));
      } else if (en.mark == true) {
        res.status(http.NOT_FOUND).send(error('Cannot delete a Course with passed exam'));
      } else {
        await Enrolment.remove(enrolmentId);
        res.status(http.OK).send(success());
      }
    } catch (err) {
      next(err);
    }
  },

};
