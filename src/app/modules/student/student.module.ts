import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { StudentTableComponent } from './components/student-table/student-table.component';
import { StudentComponent } from './components/student/student.component';
import { StudentRoutingModule } from './student-routing.module';

@NgModule({
  declarations: [
    StudentComponent,
    StudentTableComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule
  ]
})
export class StudentModule { }
