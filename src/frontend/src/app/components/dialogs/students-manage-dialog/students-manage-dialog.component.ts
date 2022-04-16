import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EnrolmentDetails } from 'src/app/models/enrolment';
import { RestClientService } from 'src/app/services/rest-client.service';

interface StudentsManageDialogData {
  courseTitle: string;
  enrolments: Array<EnrolmentDetails>
}

@Component({
  selector: 'app-students-manage-dialog',
  templateUrl: './students-manage-dialog.component.html',
  styleUrls: ['./students-manage-dialog.component.scss']
})
export class StudentsManageDialogComponent {

  displayedColumns: string[] = ['name', 'mark'];
  dataSource: Array<EnrolmentDetails> = [];
  readonly emptyTableMessage = 'NO_STUDENTS';

  constructor(
    public dialogRef: MatDialogRef<StudentsManageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StudentsManageDialogData,
    private restClient: RestClientService,
  ) {
    this.dataSource = data.enrolments;
  }

  updateExamResult(enrolmentId: string, mark: boolean) {
    this.restClient.api.updateExamResult(enrolmentId, mark);
  }

}
