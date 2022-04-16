import { courseRouter } from './routers/course.router';
import { enrolmentRouter } from './routers/enrolment.router';
import { loginRouter } from './routers/login.router';
import { userRouter } from './routers/user.router';

export const routers = [
  loginRouter,
  courseRouter,
  userRouter,
  enrolmentRouter,
];