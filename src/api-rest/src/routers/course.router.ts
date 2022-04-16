import { CourseController } from '../controllers/course.controller';
import { RoleController } from '../controllers/role.controller';
import { Router } from './router';

class CourseRouter extends Router {

  constructor() {

    super({
      basePath: '/course*',
      authenticate: true
    });

    this.router.get('/courses', CourseController.courseListGet);

    this.router.get('/course/:id', CourseController.courseGet);

    this.router.get('/course/:id/students', RoleController.allow(['Admin', 'Teacher']), CourseController.courseStudentsGet);

    this.router.post('/course', RoleController.allow('Admin'), CourseController.coursePost);

    this.router.put('/course', RoleController.allow('Admin'), CourseController.coursePut);

    this.router.delete('/course/:id', RoleController.allow('Admin'), CourseController.courseDelete);

  }
}

export const courseRouter = new CourseRouter().router;
