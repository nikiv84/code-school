import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  public emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  public firstnameFormControl = new FormControl('', [Validators.required]);
  public lastnameFormControl = new FormControl('', [Validators.required]);
  public phoneFormControl = new FormControl('');

  public addStudentForm: FormGroup = new FormGroup({
    email: this.emailFormControl,
    firstname: this.firstnameFormControl,
    lastname: this.lastnameFormControl,
    phone: this.phoneFormControl
  });

  constructor(
    public dialogRef: MatDialogRef<AddStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onYesClick(): void {
    if (this.addStudentForm.valid) {
      const student = {
        firstName: this.firstnameFormControl.value,
        lastName: this.lastnameFormControl.value,
        email: this.emailFormControl.value,
        phone: this.phoneFormControl.value
      };
      this.dialogRef.close(student);
    }
  }

}
