import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  name: string;
  date: Date;
}

@Component({
  selector: 'app-edit-course-dialog',
  templateUrl: './edit-course-dialog.component.html',
  styleUrls: ['./edit-course-dialog.component.scss']
})
export class EditCourseDialogComponent implements OnInit {

  public nameFormControl = new FormControl('', [Validators.required]);
  public dateFormControl = new FormControl('', [Validators.required]);

  public editCourseForm: FormGroup = new FormGroup({
    name: this.nameFormControl,
    date: this.dateFormControl
  });

  constructor(
    public dialogRef: MatDialogRef<EditCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
    this.setFormValues();
  }

  private setFormValues(): void {
    Object.entries(this.data).forEach(([key, value]: string[]) =>
      this.editCourseForm.controls[key].setValue(value));
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onYesClick(): void {
    if (this.editCourseForm.valid && this.editCourseForm.dirty) {
      const course = {
        name: this.nameFormControl.value,
        date: this.dateFormControl.value
      };
      this.dialogRef.close(course);
    }
  }
}
