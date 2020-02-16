import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { map, mergeAll, switchMap, tap } from 'rxjs/operators';
import { CourseStudent } from './../../../models/course-student.model';
import { Course, CourseWithStudents } from './../../../models/course.model';
import { Student, StudentWithCourses } from './../../../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = 'http://localhost:3000';
  private students$ = new BehaviorSubject<Student[]>(null);
  private courses$ = new BehaviorSubject<CourseWithStudents[]>(null);

  constructor(private httpClient: HttpClient) { }

  public getStudentsAsObservable(): Observable<Student[]> {
    return this.students$.asObservable();
  }

  public getCoursesAsObservable(): Observable<CourseWithStudents[]> {
    return this.courses$.asObservable();
  }

  public getCourse(courseId: string): Observable<Course> {
    const url = `${this.baseUrl}/courses/${courseId}`;
    return this.httpClient.get<Course>(url);
  }

  public getCourses(): Observable<Course[]> {
    const url = `${this.baseUrl}/courses`;
    return this.httpClient.get<Course[]>(url);
  }

  public getEnrollmentForCourse(courseId: string): Observable<CourseStudent[]> {
    const url = `${this.baseUrl}/enrollment?courseId=${courseId}`;
    return this.httpClient.get<CourseStudent[]>(url);
  }

  // public getAllStudents(): Observable<Student[]> {
  //   const url = `${this.baseUrl}/students`;
  //   return this.httpClient.get<Student[]>(url);
  // }

  public getAllStudents(): Observable<StudentWithCourses[]> {
    const url = `${this.baseUrl}/students`;
    return this.httpClient.get<Student[]>(url)
      .pipe(
        switchMap((students: Student[]) => {
          return !students.length ? of([]) : forkJoin(students.map((student: Student) =>
            this.getCourseCountForStudent(student.id)))
            .pipe(
              map((numberOfCourses: number[]) => students.map((student: Student, index: number) =>
                new StudentWithCourses(student.id, student.firstName,
                  student.lastName, student.email, numberOfCourses[index], student.phone)))
            );
        }),
      );
  }

  public getCourseCountForStudent(studentId: string): Observable<number> {
    return this.getCoursesForStudent(studentId)
      .pipe(
        map((studentCourses: CourseStudent[]) => studentCourses.length)
      );
  }

  public getCoursesForStudent(studentId: string): Observable<CourseStudent[]> {
    const url = `${this.baseUrl}/enrollment?studentId=${studentId}`;
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

  private getCourseAttendance(courseId: string): Observable<number> {
    const url = `${this.baseUrl}/enrollment?courseId=${courseId}`;
    return this.httpClient.get<CourseStudent[]>(url)
      .pipe(
        map((courseStudent: CourseStudent[]) => courseStudent.length)
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

  public getCoursesWithStudents(): Observable<any> {
    return this.getCourses()
      .pipe(
        switchMap((courses: Course[]) => {
          return !courses.length ? of([]) : forkJoin(courses.map((course: Course) =>
            this.getCourseAttendance(course.id)))
            .pipe(
              map((courseAttendance: number[]) =>
                courses.map((course: Course, index: number) =>
                  new CourseWithStudents(course.id, course.name, course.date, courseAttendance[index])))
            );
        }),
        tap((courses: CourseWithStudents[]) => this.courses$.next(courses)),
      );
  }

  public addCourse(course: Course): Observable<{}> {
    const url = `${this.baseUrl}/courses`;
    return this.httpClient.post<Course>(url, course);
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

  public removeCourse(courseId: string): Observable<{}> {
    const url = `${this.baseUrl}/courses/${courseId}`;
    return this.httpClient.delete<Course>(url);
  }

  public updateCourse(courseId: string, course: { name: string, date: Date }): Observable<{}> {
    const url = `${this.baseUrl}/courses/${courseId}`;
    return this.httpClient.put(url, course);
  }

  public updateEnrollment(courseId: string, studentId: string): Observable<{}> {
    const url = `${this.baseUrl}/enrollment`;
    return this.httpClient.post(url, { courseId, studentId });
  }

  public updateEnrollments(courseId: string, studentIds: string[]): Observable<{}> {
    return forkJoin(studentIds.map((studentId: string) => this.updateEnrollment(courseId, studentId)));
  }
}
