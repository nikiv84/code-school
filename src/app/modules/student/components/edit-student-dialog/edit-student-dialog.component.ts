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
  selector: 'app-edit-student-dialog',
  templateUrl: './edit-student-dialog.component.html',
  styleUrls: ['./edit-student-dialog.component.scss']
})
export class EditStudentDialogComponent implements OnInit {

  public emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  public firstnameFormControl = new FormControl('', [Validators.required]);
  public lastnameFormControl = new FormControl('', [Validators.required]);
  public phoneFormControl = new FormControl('');

  public editStudentForm: FormGroup = new FormGroup({
    email: this.emailFormControl,
    firstName: this.firstnameFormControl,
    lastName: this.lastnameFormControl,
    phone: this.phoneFormControl
  });

  constructor(
    public dialogRef: MatDialogRef<EditStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
    this.setFormValues();
  }

  private setFormValues(): void {
    Object.entries(this.data).forEach(([key, value]: string[]) =>
      this.editStudentForm.controls[key].setValue(value));
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onYesClick(): void {
    if (this.editStudentForm.valid && this.editStudentForm.dirty) {
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
