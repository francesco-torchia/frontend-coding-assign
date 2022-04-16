import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseDetails } from 'src/app/models/course';
import { UserDetails } from 'src/app/models/user';

interface CourseEditDialogData {
  course: CourseDetails;
  teachers: Array<Partial<UserDetails>>;
}

@Component({
  selector: 'app-course-edit-dialog',
  templateUrl: './course-edit-dialog.component.html',
  styleUrls: ['./course-edit-dialog.component.scss']
})
export class CourseEditDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CourseEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CourseEditDialogData,
  ) {
  }

  save() {
    this.dialogRef.close();
  }

}
