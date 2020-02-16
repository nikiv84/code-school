import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { concatMap, takeUntil } from 'rxjs/operators';
import { Course, CourseWithStudents } from './../../../../models/course.model';
import { RemoveDialogComponent } from './../../../../shared/components/remove-dialog/remove-dialog.component';
import { CourseService } from './../../services/course.service';
import { AddCourseDialogComponent } from './../add-course-dialog/add-course-dialog.component';
import { EditCourseDialogComponent } from './../edit-course-dialog/edit-course-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnDestroy {
  public courses$: Observable<CourseWithStudents[]>;
  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private courseService: CourseService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.courses$ = this.courseService.getCoursesAsObservable();
    this.courseService.getCoursesWithStudents().pipe(takeUntil(this.unsubscribe)).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public addCourseDialog(): void {
    const dialogRef = this.dialog.open(AddCourseDialogComponent, {
      width: '440px'
    });

    dialogRef.afterClosed().subscribe((course: Course) => {
      if (course) {
        this.courseService.addCourse(course)
          .pipe(
            takeUntil(this.unsubscribe),
            concatMap(() => this.courseService.getCoursesWithStudents())
          )
          .subscribe();
      }
    });
  }

  public removeCourseDialog(course: Course): void {
    const dialogRef = this.dialog.open(RemoveDialogComponent, {
      width: '440px',
      data: {
        entityType: 'course',
        message: course.name
      }
    });

    dialogRef.afterClosed().subscribe((shouldRemove: boolean) => {
      if (shouldRemove) {
        this.removeCourse(course.id);
      }
    });
  }

  private removeCourse(courseId: string): void {
    this.courseService.removeCourse(courseId)
      .pipe(
        takeUntil(this.unsubscribe),
        concatMap(() => this.courseService.getCoursesWithStudents())
      )
      .subscribe();
  }

  public editCourseDialog(course: Course): void {
    const dialogRef = this.dialog.open(EditCourseDialogComponent, {
      width: '440px',
      data: {
        name: course.name,
        date: course.date
      }
    });

    dialogRef.afterClosed().subscribe((courseData: CourseWithStudents) => {
      if (courseData) {
        this.courseService.updateCourse(course.id, courseData)
          .pipe(
            takeUntil(this.unsubscribe),
            concatMap(() => this.courseService.getCoursesWithStudents())
          )
          .subscribe();
      }
    });
  }

  public getSubtitle(courses: CourseWithStudents[]): string {
    const numOfStudents = courses?.length ? courses?.length : 0;
    return numOfStudents === 1 ? `${numOfStudents} course` : `${numOfStudents} courses`;
  }

}
