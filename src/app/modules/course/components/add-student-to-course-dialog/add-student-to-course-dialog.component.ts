import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatListOption } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Student } from './../../../../models/student.model';

export interface DialogData {
  name: string;
  date: Date;
  students: Student[];
  numOfEnrolledStudents: number;
}

@Component({
  selector: 'app-add-student-to-course-dialog',
  templateUrl: './add-student-to-course-dialog.component.html',
  styleUrls: ['./add-student-to-course-dialog.component.scss']
})
export class AddStudentToCourseDialogComponent implements OnInit {

  public selectedStudentIds: string[];

  constructor(
    public dialogRef: MatDialogRef<AddStudentToCourseDialogComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
  }

  onGroupsChange(students: MatListOption[]) {
    this.selectedStudentIds = students.map(student => student.value);
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onYesClick(students: MatListOption[]): void {
    if (this.canAddStudents()) {
      this.dialogRef.close(this.selectedStudentIds);
    } else {
      this.openSnackBar('Can not add more than 5 students to course', 'Dismiss');
    }
  }

  private canAddStudents(): boolean {
    return this.selectedStudentIds?.length + this.data.numOfEnrolledStudents <= 5;
  }

  private openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
