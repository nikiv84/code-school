import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Student } from './../../../../models/student.model';

@Component({
  selector: 'app-course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.scss']
})
export class CourseTableComponent implements OnInit {
  @Input() students: Student[];
  @Output() removeStudent = new EventEmitter<Student>();

  public displayedStudentColumns: string[] = ['Position', 'First Name', 'Last Name', 'E-mail', 'Phone', 'Remove'];

  constructor() { }

  ngOnInit(): void {
  }

  public onRemoveStudent(student: Student): void {
    this.removeStudent.emit(student);
  }

}
