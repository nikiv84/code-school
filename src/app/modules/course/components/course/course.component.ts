import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { concatMap, takeUntil } from 'rxjs/operators';
import { Course } from './../../../../models/course.model';
import { Student } from './../../../../models/student.model';
import { CourseService } from './../../services/course.service';
import { DialogComponent } from './../dialog/dialog.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, OnDestroy {
  private courseId: string;
  public students$: Observable<Student[]>;
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
    this.courseService.getCourseStudents(this.courseId).pipe(takeUntil(this.unsubscribe)).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private removeStudentFromCourse(studentId: string) {
    this.courseService.removeStudentFromCourse(this.courseId, studentId)
      .pipe(
        takeUntil(this.unsubscribe),
        concatMap(() => this.courseService.getCourseStudents(this.courseId))
      ).subscribe();
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
