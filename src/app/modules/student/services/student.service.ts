import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Student, StudentWithCourses } from './../../../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  public getAllStudents(): Observable<Student[]> {
    const url = `${this.baseUrl}/students`;
    return this.httpClient.get<Student[]>(url);
  }

  public getCourseCountForStudent(studentId: string): Observable<number> {
    const url = `${this.baseUrl}/enrollment?studentId=${studentId}`;
    return this.httpClient.get<StudentWithCourses[]>(url)
      .pipe(
        map((studentCourses: StudentWithCourses[]) => studentCourses.length),
        tap(console.log)
      );
  }
}
