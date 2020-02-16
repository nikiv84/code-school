import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { CourseStudent } from './../../../models/course-student.model';
import { Student, StudentWithCourses } from './../../../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'http://localhost:3000';
  private students$ = new BehaviorSubject<StudentWithCourses[]>(null);

  constructor(private httpClient: HttpClient) { }

  public getStudentsAsObservable(): Observable<StudentWithCourses[]> {
    return this.students$.asObservable();
  }

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
        tap((studentWithCourses: StudentWithCourses[]) => this.students$.next(studentWithCourses)),
      );
  }

  public getCoursesForStudent(studentId: string): Observable<CourseStudent[]> {
    const url = `${this.baseUrl}/enrollment?studentId=${studentId}`;
    return this.httpClient.get<CourseStudent[]>(url);
  }

  public getCourseCountForStudent(studentId: string): Observable<number> {
    return this.getCoursesForStudent(studentId)
      .pipe(
        map((studentCourses: CourseStudent[]) => studentCourses.length)
      );
  }

  public removeStudent(studentId: string): Observable<{}> {
    const url = `${this.baseUrl}/students/${studentId}`;
    return this.httpClient.delete<Student>(url);
  }

  public addStudent(student: { firstName: string, lastName: string, email: string, phone?: string }) {
    const url = `${this.baseUrl}/students`;
    return this.httpClient.post(url, student);
  }

  public updateStudent(studentId: string, student: { firstName: string, lastName: string, email: string, phone?: string }) {
    const url = `${this.baseUrl}/students/${studentId}`;
    return this.httpClient.put(url, student);
  }

}
