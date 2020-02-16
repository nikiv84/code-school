import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from './../../../../models/student.model';

export interface DialogData {
  student: Student;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  public onNoClick(): void {
    this.dialogRef.close(false);
  }

  public onYesClick(): void {
    this.dialogRef.close(true);
  }

}
