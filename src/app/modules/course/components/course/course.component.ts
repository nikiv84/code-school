import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { concatMap, map, takeUntil, tap } from 'rxjs/operators';
import { Course, CourseWithStudents } from './../../../../models/course.model';
import { Student } from './../../../../models/student.model';
import { RemoveDialogComponent } from './../../../../shared/components/remove-dialog/remove-dialog.component';
import { CourseService } from './../../services/course.service';
import { AddStudentToCourseDialogComponent } from './../add-student-to-course-dialog/add-student-to-course-dialog.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, OnDestroy {
  private courseId: string;
  public students$: Observable<Student[]>;
  private studentsNotEnrolled: Student[];
  private courseStudents: Student[];
  public course$: Observable<Course>;
  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.course$ = this.courseService.getCourse(this.courseId);
    this.students$ = this.courseService.getStudentsAsObservable();
    this.getCourseStudents().subscribe();
  }

  private getCourseStudents(): Observable<Student[]> {
    return this.courseService.getCourseStudents(this.courseId)
      .pipe(
        takeUntil(this.unsubscribe),
        tap((courseStudents: Student[]) => {
          this.courseStudents = courseStudents;
          this.getNotEnrolledStudents();
        })
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private getNotEnrolledStudents(): void {
    this.courseService.getAllStudents()
      .pipe(
        takeUntil(this.unsubscribe),
        map((allStudents: Student[]) => {
          const courseStudentsIds = new Set(this.courseStudents.map(({ id }) => id));
          return allStudents.filter(({ id }) => !courseStudentsIds.has(id));
        }),
      )
      .subscribe((students: Student[]) => this.studentsNotEnrolled = students);
  }

  private removeStudentFromCourse(studentId: string) {
    this.courseService.removeStudentFromCourse(this.courseId, studentId)
      .pipe(
        takeUntil(this.unsubscribe),
        concatMap(() => this.getCourseStudents())
      ).subscribe();
  }

  public removeStudentDialog(student: Student): void {
    const dialogRef = this.dialog.open(RemoveDialogComponent, {
      width: '440px',
      data: {
        entityType: 'student',
        message: `${student.firstName} ${student.lastName}`
      }
    });

    dialogRef.afterClosed().subscribe((shouldRemove: boolean) => {
      if (shouldRemove) {
        this.removeStudentFromCourse(student.id);
      }
    });
  }

  public addStudentToCourseDialog(course: CourseWithStudents) {
    const dialogRef = this.dialog.open(AddStudentToCourseDialogComponent, {
      width: '440px',
      data: {
        name: course.name,
        date: course.date,
        students: this.studentsNotEnrolled
      }
    });

    dialogRef.afterClosed().subscribe((studentIds: string[]) => {
      if (studentIds?.length) {
        this.courseService.updateEnrollments(course.id, studentIds)
          .pipe(
            takeUntil(this.unsubscribe),
            concatMap(() => this.getCourseStudents())
          )
          .subscribe();
      }
    });
  }

}
