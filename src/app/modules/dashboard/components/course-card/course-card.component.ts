import { Component, Input, OnInit } from '@angular/core';
import { CourseWithStudents } from './../../../../models/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {
  @Input() course: CourseWithStudents;

  constructor() { }

  ngOnInit(): void {
  }

}
