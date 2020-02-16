import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { AddStudentDialogComponent } from './components/add-student-dialog/add-student-dialog.component';
import { EditStudentDialogComponent } from './components/edit-student-dialog/edit-student-dialog.component';
import { StudentTableComponent } from './components/student-table/student-table.component';
import { StudentComponent } from './components/student/student.component';
import { StudentRoutingModule } from './student-routing.module';

@NgModule({
  declarations: [
    StudentComponent,
    StudentTableComponent,
    AddStudentDialogComponent,
    EditStudentDialogComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule
  ],
  entryComponents: [
    AddStudentDialogComponent,
  ]
})
export class StudentModule { }
