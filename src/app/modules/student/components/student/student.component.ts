import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { StudentWithCourses } from 'src/app/models/student.model';
import { Student } from './../../../../models/student.model';
import { StudentService } from './../../services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  public students$: Observable<StudentWithCourses[]>;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.students$ = this.getAllStudents();
  }

  public getAllStudents(): Observable<StudentWithCourses[]> {
    return this.studentService.getAllStudents()
      .pipe(
        switchMap((students: Student[]) =>
          forkJoin(students.map((student: Student) => this.studentService.getCourseCountForStudent(student.id)))
            .pipe(
              map((numberOfCourses: number[]) => students.map((student: Student, index: number) =>
                new StudentWithCourses(student.id, student.firstName,
                  student.lastName, student.email, numberOfCourses[index], student.phone)))
            )
        )
      );
  }

}
