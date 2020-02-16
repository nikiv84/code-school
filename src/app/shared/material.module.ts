import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [],
  imports: [
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class MaterialModule { }
