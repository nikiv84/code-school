import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { mergeAll, switchMap, tap } from 'rxjs/operators';
import { CourseStudent } from './../../../models/course-student.model';
import { Course } from './../../../models/course.model';
import { Student } from './../../../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = 'http://localhost:3000';
  private students$ = new BehaviorSubject<Student[]>(null);

  constructor(private httpClient: HttpClient) { }

  public getStudentsAsObservable(): Observable<Student[]> {
    return this.students$.asObservable();
  }

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
    return this.httpClient.get<CourseStudent[]>(url)
      .pipe(
        mergeAll()
      );
  }

  public getCourseStudents(courseId: string): Observable<Student[]> {
    return this.getEnrollmentForCourse(courseId)
      .pipe(
        switchMap((enrollments: CourseStudent[]) => {
          return !enrollments.length ? of([]) : forkJoin(enrollments.map((enrollment: CourseStudent) =>
            this.getStudent(enrollment.studentId)));
        }),
        tap((students: Student[]) => this.students$.next(students)),
      );
  }

  public removeStudentFromCourse(courseId: string, studentId: string): Observable<{}> {
    return this.getEnrollment(courseId, studentId)
      .pipe(
        switchMap((enrollment: CourseStudent) => {
          const deleteUrl = `${this.baseUrl}/enrollment/${enrollment.id}`;
          return this.httpClient.delete<CourseStudent>(deleteUrl);
        })
      );
  }

}
