import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatListOption } from '@angular/material/list';

@Component({
  selector: 'app-add-student-to-course-dialog',
  templateUrl: './add-student-to-course-dialog.component.html',
  styleUrls: ['./add-student-to-course-dialog.component.scss']
})
export class AddStudentToCourseDialogComponent implements OnInit {

  public selectedStudent: string;

  constructor(
    public dialogRef: MatDialogRef<AddStudentToCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit(): void {
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onYesClick(students: MatListOption[]): void {
    const selectedStudentIds = students.map(student => student.value);
    this.dialogRef.close(selectedStudentIds);
  }

}
