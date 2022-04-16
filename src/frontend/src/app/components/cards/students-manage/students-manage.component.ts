import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { StudentsManageDialogComponent } from 'src/app/components/dialogs/students-manage-dialog/students-manage-dialog.component';
import { CourseDetails } from 'src/app/models/course';
import { AuthService } from 'src/app/services/auth.service';
import { RestClientService } from 'src/app/services/rest-client.service';

@Component({
  selector: 'app-students-manage',
  templateUrl: './students-manage.component.html',
  styleUrls: ['./students-manage.component.scss']
})
export class StudentsManageComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  readonly tableRefresh$: Subject<void> = new Subject<void>();

  displayedColumns: string[] = ['isAvailable', 'title', 'edit'];
  dataSource: Array<CourseDetails> = [];

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

  async ngOnInit() {
    /** Get Teacher's Courses and students */
    const courses = await this.restClient.api.getCourses(this.authService.loggedUser?.id as string);
    this.dataSource = courses;
  }

  public async manageStudents(course: CourseDetails) {
    if (!course.isAvailable) {
      return;
    }
    const enrolments = await this.restClient.api.getCourseStudents(course.id);
    this.dialog.open(StudentsManageDialogComponent, {
      width: '400px',
      height: '300px',
      data: { courseTitle: course.title, enrolments },
    });
  }

}
