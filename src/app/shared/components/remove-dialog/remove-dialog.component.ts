import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-dialog',
  templateUrl: './remove-dialog.component.html',
  styleUrls: ['./remove-dialog.component.scss']
})
export class RemoveDialogComponent {

  @Input() entityType: string;
  @Input() message: string;

  constructor(
    public dialogRef: MatDialogRef<RemoveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  public onNoClick(): void {
    this.dialogRef.close(false);
  }

  public onYesClick(): void {
    this.dialogRef.close(true);
  }

}
