import { Component, Input, OnInit } from '@angular/core';
import { StudentWithCourses } from './../../../../models/student.model';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss']
})
export class StudentTableComponent implements OnInit {
  @Input() students: StudentWithCourses[];
  public displayedStudentColumns: string[] = ['Position', 'First Name', 'Last Name', 'E-mail', 'Phone', 'Courses'];

  constructor() { }

  ngOnInit(): void {
  }

}
