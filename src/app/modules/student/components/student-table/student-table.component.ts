import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Student, StudentWithCourses } from './../../../../models/student.model';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss']
})
export class StudentTableComponent implements OnInit {
  @Input() students: StudentWithCourses[];
  @Output() removeStudent = new EventEmitter<Student>();
  @Output() editStudent = new EventEmitter<Student>();

  public displayedStudentColumns: string[] = ['Position', 'First Name', 'Last Name', 'E-mail', 'Phone', 'Courses', 'Manage'];

  constructor() { }

  ngOnInit(): void {
  }

  public onRemoveStudent(student: Student): void {
    this.removeStudent.emit(student);
  }

  public onEditStudent(student: Student): void {
    this.editStudent.emit(student);
  }

}
