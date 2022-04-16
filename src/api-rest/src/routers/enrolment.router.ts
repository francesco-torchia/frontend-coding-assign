import { EnrolmentController } from '../controllers/enrolment.controller';
import { RoleController } from '../controllers/role.controller';
import { Router } from './router';

class EnrolmentRouter extends Router {

  constructor() {

    super({
      basePath: '/enrolment*',
      authenticate: true,
    });

    this.router.get('/enrolments', RoleController.allow('Student'), EnrolmentController.enrolmentListGet);

    this.router.get('/enrolment/:id', RoleController.allow('Student'), EnrolmentController.enrolmentGet);

    this.router.post('/enrolment', RoleController.allow('Student'), EnrolmentController.enrolmentPost);

    this.router.put('/enrolment', RoleController.allow('Teacher'), EnrolmentController.enrolmentPut);

    this.router.delete('/enrolment/:id', RoleController.allow('Student'), EnrolmentController.enrolmentDelete);

  }
}

export const enrolmentRouter = new EnrolmentRouter().router;
