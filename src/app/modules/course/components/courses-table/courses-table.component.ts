import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course, CourseWithStudents } from './../../../../models/course.model';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss']
})
export class CoursesTableComponent implements OnInit {
  @Input() courses: CourseWithStudents[];
  @Output() removeCourse = new EventEmitter<Course>();
  @Output() editCourse = new EventEmitter<Course>();

  public displayedCourseColumns: string[] = ['Position', 'Name', 'Date', 'NumOfStudents', 'Manage'];

  constructor() { }

  ngOnInit(): void {
  }

  public onRemoveStudent(course: Course): void {
    this.removeCourse.emit(course);
  }

  public onEditStudent(course: Course): void {
    this.editCourse.emit(course);
  }

}
