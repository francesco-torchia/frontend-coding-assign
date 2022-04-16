import { join } from './db';

const course = {
  select: 'SELECT CourseId AS id, Title AS title, TeacherId AS teacherId, isAvailable FROM courses',
  selectDetails: join([
    'SELECT courses.CourseId AS id,',
    'courses.Title AS title,',
    'courses.TeacherID as teacherId,',
    'users.Name AS teacher,',
    'courses.isAvailable',
    'FROM courses',
    'LEFT JOIN users ON courses.TeacherID = users.UserID'
  ]),
  insert: 'INSERT INTO courses SET ?',
  update: 'UPDATE courses SET ? WHERE courseId = ?',
  delete: 'DELETE FROM courses WHERE courseId = ?',
  where: {
    courseId: 'WHERE courses.CourseID = ?',
    teacherId: 'WHERE courses.TeacherID = ?'
  }
};

const user = {
  select: 'SELECT users.UserId AS id, users.Name AS name, users.RoleId as roleId FROM users',
  selectDetails: join([
    'SELECT users.UserId AS id,',
    'users.Name AS name,',
    'roles.Role as role',
    'FROM users',
    'INNER JOIN roles ON users.RoleId = roles.RoleId'
  ]),
  insert: 'INSERT INTO users SET ?',
  delete: 'DELETE FROM users WHERE UserId = ?',
  where: {
    userId: 'WHERE users.userId = ?',
    role: 'WHERE roles.Role = ?'
  }
};

const enrolment = {
  select: join([
    'SELECT enrolments.EnrolmentID AS id,',
    'enrolments.CourseID as courseId,',
    'enrolments.UserID as userId,',
    'enrolments.Mark as mark',
    'FROM enrolments',
  ]),
  selectDetails: join([
    'SELECT enrolments.EnrolmentID AS id,',
    'enrolments.UserID as userId,',
    'users.Name AS student,',
    'enrolments.Mark as mark',
    'FROM enrolments',
    'LEFT JOIN users ON users.UserID = enrolments.UserID'
  ]),
  insert: 'INSERT INTO enrolments SET ?',
  update: 'UPDATE enrolments SET ? WHERE enrolments.enrolmentID = ?',
  delete: 'DELETE FROM enrolments WHERE enrolments.enrolmentID = ?',
  where: {
    enrolmentId: 'WHERE enrolments.enrolmentID = ?',
    userId: 'WHERE enrolments.UserID = ?',
    courseId: 'WHERE enrolments.CourseID = ?'
  }
};

export const query = {
  user,
  course,
  enrolment
} as const;