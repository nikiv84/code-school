import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CourseStudent } from './../../../../models/course-student.model';
import { Course } from './../../../../models/course.model';
import { Student } from './../../../../models/student.model';
import { CourseService } from './../../services/course.service';
import { DialogComponent } from './../dialog/dialog.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  private courseId: string;
  public students$: Observable<Student[]>;
  public course: Course;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.students$ = this.getCourseData();
  }

  private getCourseData(): Observable<Student[]> {
    return this.courseService.getCourse(this.courseId)
      .pipe(
        switchMap((course: Course) => {
          this.course = course;
          return this.courseService.getEnrollmentForCourse(this.courseId)
            .pipe(
              switchMap((enrollments: CourseStudent[]) =>
                forkJoin(enrollments.map((enrollment: CourseStudent) => this.courseService.getStudent(enrollment.studentId))))
            );
        })
      );
  }

  public removeStudentFromCourse(studentId: string) {
    this.students$ = this.courseService.removeStudentFromCourse(this.courseId, studentId)
      .pipe(
        switchMap(() => this.getCourseData())
      );
  }

  public openDialog(student: Student): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '360px',
      data: {
        student
      }
    });

    dialogRef.afterClosed().subscribe((shouldRemove: boolean) => {
      if (shouldRemove) {
        this.removeStudentFromCourse(student.id);
      }
    });
  }

}
