import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as _ from 'lodash';
import { lastValueFrom, Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { CourseEditDialogComponent } from 'src/app/components/dialogs/course-edit-dialog/course-edit-dialog.component';
import { CourseDetails } from 'src/app/models/course';
import { UserDetails } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { RestClientService } from 'src/app/services/rest-client.service';

@Component({
  selector: 'app-courses-manage',
  templateUrl: './courses-manage.component.html',
  styleUrls: ['./courses-manage.component.scss']
})
export class CoursesManageComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  readonly tableRefresh$: Subject<void> = new Subject<void>();

  displayedColumns: string[] = ['isAvailable', 'title', 'teacher', 'edit'];
  dataSource: Array<CourseDetails> = [];
  teachers: Array<Partial<UserDetails>> = [];

  constructor(
    public dialog: MatDialog,
    private restClient: RestClientService,
    public authService: AuthService,
  ) {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.tableRefresh$.complete();
  }

  ngOnInit(): void {

    /** Get all Teachers */
    this.restClient.api.getUsers('Teacher').then((list) => {
      this.teachers = list.map(({ id, name }) => ({ id, name }));
    });

    /** Get Courses */
    this.tableRefresh$.pipe(startWith(null)).subscribe(() => {
      this.restClient.api.getCourses().then((list) => {
        this.dataSource = list;
      });
    });
  }

  public async manageCourse(course: CourseDetails) {
    const dialogRef = this.dialog.open(CourseEditDialogComponent, {
      width: '400px',
      height: '400px',
      data: { teachers: this.teachers, course: _.clone(course) },
      disableClose: true
    });
    const res: CourseDetails = await lastValueFrom(dialogRef.afterClosed());
    if (res) {
      await this.restClient.api.updateCourse(res);
      this.tableRefresh$.next();
    }
  }

  // public deleteCourse(course: CourseDetails): void {
  // }

}
