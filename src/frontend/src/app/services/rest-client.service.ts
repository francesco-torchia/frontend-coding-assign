import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Course, CourseDetails } from '../models/course';
import { Enrolment, EnrolmentDetails } from '../models/enrolment';
import { Login } from '../models/login';
import { Role, UserDetails } from '../models/user';

interface HttpGetOptionParams {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  context?: HttpContext;
  observe?: 'body';
  params?: HttpParams | {
    [param: string]: string | boolean | ReadonlyArray<string | boolean>;
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

interface ResponseApi<T> {
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class RestClientService {

  private readonly url = `${environment.restURL}/${environment.apiVersion}`;

  // private headers: Headers;

  private http = {
    get: <T>(
      path: string,
      options?: HttpGetOptionParams
    ) => lastValueFrom(this.httpClient.get<ResponseApi<T>>(`${this.url}/${path}`, options).pipe(map(({ data }) => data))),
    post: <T>(
      path: string,
      body: any | null,
      options?: HttpGetOptionParams
    ) => lastValueFrom(this.httpClient.post<ResponseApi<T>>(`${this.url}/${path}`, body, options).pipe(map(({ data }) => data))),
    put: <T>(
      path: string,
      body: any | null,
      options?: HttpGetOptionParams
    ) => lastValueFrom(this.httpClient.put<ResponseApi<T>>(`${this.url}/${path}`, body, options).pipe(map(({ data }) => data))),
    delete: <T>(
      path: string,
      options?: HttpGetOptionParams
    ) => lastValueFrom(this.httpClient.delete<ResponseApi<T>>(`${this.url}/${path}`, options).pipe(map(({ data }) => data))),
  } as const;

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  public api = {

    /** Login */
    
    login: (username: string) => this.httpClient.post<Login>(`${this.url}/login`, { username }),

    /** Course */
    
    getCourses: (teacherId?: string) => this.http.get<Array<CourseDetails>>('courses', teacherId ? { params: { teacherId } } : undefined),

    getCourse: (id: string) => this.http.get<CourseDetails>(`course/${id}`),

    createCourse: (course: Partial<Course>) => this.http.post<CourseDetails>('course', course),

    updateCourse: (course: Partial<Course>) => this.http.put<CourseDetails>('course', course),

    deleteCourse: (id: string) => this.http.delete<void>(`course/${id}`),

    getCourseStudents: (id: string) => this.http.get<EnrolmentDetails>(`course/${id}/students`),

    /** Enrolment */

    getMyEnrolments: () => this.http.get<Array<Enrolment>>('enrolments'),

    enrolCourse: (courseId: string) => this.http.post<UserDetails>('enrolment', { courseId }),

    leaveCourse: (enrolmentId: string) => this.http.delete<UserDetails>(`enrolment/${enrolmentId}`),

    updateExamResult: (enrolmentId: string, mark: boolean) => this.http.put<UserDetails>('enrolment', { id: enrolmentId, mark }),

    /** User */

    getUsers: (role?: Role) => this.http.get<Array<UserDetails>>('users', role ? { params: { role } } : undefined),

    getUser: (id: string) => this.http.get<UserDetails>(`user/${id}`),

  } as const;


}
