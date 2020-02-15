import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CourseStudent } from './../../../models/course-student.model';
import { Course } from './../../../models/course.model';
import { Student } from './../../../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  public getAllStudents(): Observable<Student[]> {
    const url = `${this.baseUrl}/students`;
    return this.httpClient.get<Student[]>(url);
  }

  public getAllCourses(): Observable<Course[]> {
    const url = `${this.baseUrl}/courses`;
    return this.httpClient.get<Course[]>(url);
  }

  public getEnrollmentForStudent(studentId: string): Observable<number> {
    const url = `${this.baseUrl}/enrollment?studentId=${studentId}`;
    return this.httpClient.get(url)
      .pipe(
        map((enrollment: CourseStudent[]) => enrollment.length)
      );
  }

  public getAttendanceForCourse(courseId: string): Observable<number> {
    const url = `${this.baseUrl}/enrollment?courseId=${courseId}`;
    return this.httpClient.get(url)
      .pipe(
        map((enrollment: CourseStudent[]) => enrollment.length)
      );
  }

}
