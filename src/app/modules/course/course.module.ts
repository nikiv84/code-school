import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { CourseTableComponent } from './components/course-table/course-table.component';
import { CourseComponent } from './components/course/course.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { CourseRoutingModule } from './course-routing.module';
import { CoursesComponent } from './components/courses/courses.component';

@NgModule({
  declarations: [
    CourseComponent,
    CourseTableComponent,
    DialogComponent,
    CoursesComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    SharedModule
  ]
})
export class CourseModule { }
