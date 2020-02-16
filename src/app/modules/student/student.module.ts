import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StudentComponent } from './components/student/student.component';
import { StudentRoutingModule } from './student-routing.module';
import { StudentTableComponent } from './components/student-table/student-table.component';

@NgModule({
  declarations: [
    StudentComponent,
    StudentTableComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
