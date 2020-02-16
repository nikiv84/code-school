import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CourseStudent } from './../../../models/course-student.model';
import { Course, CourseWithStudents } from './../../../models/course.model';
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

  public getAllCoursesWithStudents(): Observable<CourseWithStudents[]> {
    return this.getAllCourses()
      .pipe(
        switchMap((courses: Course[]) => forkJoin(courses.map((course: Course) => this.getAttendanceForCourse(course.id)))
          .pipe(
            map((courseAttendance: number[]) => courses.map((course: Course, index: number) =>
              new CourseWithStudents(course.id, course.name, course.date, courseAttendance[index])))
          )
        ),
      );
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
