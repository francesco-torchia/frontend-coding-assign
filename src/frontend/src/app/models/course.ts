export interface CourseDetails extends Course {
  teacher: string;
}

export interface Course {
  id: string;
  title: string;
  teacherId: string;
  isAvailable: boolean;
}
