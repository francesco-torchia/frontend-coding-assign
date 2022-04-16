export interface EnrolmentDetails extends Enrolment {
  student: string,
}

export interface Enrolment {
  id: string;
  mark: boolean;
  courseId: string;
  userId: string;
}
