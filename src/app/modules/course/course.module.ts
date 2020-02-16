import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { CourseTableComponent } from './components/course-table/course-table.component';
import { CourseComponent } from './components/course/course.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { CourseRoutingModule } from './course-routing.module';
import { CoursesComponent } from './components/courses/courses.component';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { EditCourseDialogComponent } from './components/edit-course-dialog/edit-course-dialog.component';
import { AddStudentToCourseDialogComponent } from './components/add-student-to-course-dialog/add-student-to-course-dialog.component';

@NgModule({
  declarations: [
    CourseComponent,
    CourseTableComponent,
    DialogComponent,
    CoursesComponent,
    CoursesTableComponent,
    EditCourseDialogComponent,
    AddStudentToCourseDialogComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    SharedModule
  ]
})
export class CourseModule { }
