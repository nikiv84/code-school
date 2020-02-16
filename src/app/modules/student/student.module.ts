import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StudentComponent } from './components/student/student.component';
import { StudentRoutingModule } from './student-routing.module';

@NgModule({
  declarations: [
    StudentComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
