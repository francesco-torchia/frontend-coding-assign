import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, lastValueFrom, Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/components/dialogs/confirm-dialog/confirm-dialog.component';
import { CourseDetails } from 'src/app/models/course';
import { AuthService } from 'src/app/services/auth.service';
import { RestClientService } from 'src/app/services/rest-client.service';

type Row = CourseDetails & { enrolmentId?: string; attended?: boolean; mark?: boolean };

@Component({
  selector: 'app-courses-enrolment',
  templateUrl: './courses-enrolment.component.html',
  styleUrls: ['./courses-enrolment.component.scss']
})
export class CoursesEnrolmentComponent implements OnInit, OnDestroy {

  readonly tableRefresh$: Subject<void> = new Subject<void>();
  readonly enroled$ = new BehaviorSubject<string | null>(null);

  displayedColumns: string[] = ['isAvailable', 'title', 'teacher', 'mark', 'enrol'];
  dataSource: Array<Row> = [];

  constructor(
    public dialog: MatDialog,
    private restClient: RestClientService,
    public authService: AuthService,
  ) {
  }

  ngOnDestroy(): void {
    this.enroled$.complete();
    this.tableRefresh$.complete();
  }

  ngOnInit(): void {
    this.tableRefresh$.pipe(startWith(null)).subscribe(async () => {
      const [courses, enrolments] = await Promise.all([
        this.restClient.api.getCourses(),
        this.restClient.api.getMyEnrolments()
      ]);
      /** Watch only available courses and get mark from user enrolments*/
      this.dataSource = courses.map((c) => {
        const en = enrolments.find((en) => en.courseId == c.id);
        return {
          ...c,
          enrolmentId: en?.id,
          attended: en != null,
          mark: en?.mark,
        };
      });

      this.enroled$.next(
        this.dataSource.find((c) => c.attended && c.mark == null)?.id as string
      );
    });
  }

  public async enrolCourse(course: Row) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      height: '150px',
      data: { message: 'ENROL_COURSE_CONFIRM_MSG' },
    });
    const res = await lastValueFrom(dialogRef.afterClosed());
    if (res) {
      await this.restClient.api.enrolCourse(course.id);
      this.tableRefresh$.next();
    }
  }

  public async leaveCourse(course: Row) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      height: '150px',
      data: { message: 'LEAVE_COURSE_CONFIRM_MSG' },
    });
    const res = await lastValueFrom(dialogRef.afterClosed());
    if (res && course.enrolmentId) {
      await this.restClient.api.leaveCourse(course.enrolmentId);
      this.tableRefresh$.next();
    }
  }

}
