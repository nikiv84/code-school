import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-course-dialog',
  templateUrl: './add-course-dialog.component.html',
  styleUrls: ['./add-course-dialog.component.scss']
})
export class AddCourseDialogComponent implements OnInit {

  public nameFormControl = new FormControl('', [Validators.required]);
  public dateFormControl = new FormControl('', [Validators.required]);

  public addCourseForm: FormGroup = new FormGroup({
    name: this.nameFormControl,
    date: this.dateFormControl
  });

  constructor(
    public dialogRef: MatDialogRef<AddCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit(): void {
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onYesClick(): void {
    if (this.addCourseForm.valid && this.addCourseForm.dirty) {
      const course = {
        name: this.nameFormControl.value,
        date: this.dateFormControl.value
      };
      this.dialogRef.close(course);
    }
  }
}
