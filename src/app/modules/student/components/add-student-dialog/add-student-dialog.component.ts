import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

@Component({
  selector: 'app-add-student-dialog',
  templateUrl: './add-student-dialog.component.html',
  styleUrls: ['./add-student-dialog.component.scss']
})
export class AddStudentDialogComponent implements OnInit {
  public firstName: string;
  public lastName: string;
  public email: string;
  public phone: string;

  constructor(
    public dialogRef: MatDialogRef<AddStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onYesClick(): void {
    const student = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone
    };
    this.dialogRef.close(student);
  }

}
