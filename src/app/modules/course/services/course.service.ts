import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeAll, switchMap } from 'rxjs/operators';
import { CourseStudent } from './../../../models/course-student.model';
import { Course } from './../../../models/course.model';
import { Student } from './../../../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  public getCourse(courseId: string): Observable<Course> {
    const url = `${this.baseUrl}/courses/${courseId}`;
    return this.httpClient.get<Course>(url);
  }

  public getEnrollmentForCourse(courseId: string): Observable<CourseStudent[]> {
    const url = `${this.baseUrl}/enrollment?courseId=${courseId}`;
    return this.httpClient.get<CourseStudent[]>(url);
  }

  public getStudent(studentId: string): Observable<Student> {
    const url = `${this.baseUrl}/students/${studentId}`;
    return this.httpClient.get<Student>(url);
  }

  private getEnrollment(courseId: string, studentId: string): Observable<CourseStudent> {
    const url = `${this.baseUrl}/enrollment?studentId=${studentId}&courseId=${courseId}`;
    return this.httpClient.get(url)
      .pipe(
        mergeAll()
      );
  }

  public removeStudentFromCourse(courseId: string, studentId: string): Observable<{}> {
    return this.getEnrollment(courseId, studentId)
      .pipe(
        switchMap((enrollment: CourseStudent) => {
          const deleteUrl = `${this.baseUrl}/enrollment/${enrollment.id}`;
          return this.httpClient.delete(deleteUrl);
        })
      );
  }

}
