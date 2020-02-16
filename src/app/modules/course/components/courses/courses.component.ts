import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CourseWithStudents } from './../../../../models/course.model';
import { CourseService } from './../../services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnDestroy {
  public courses$: Observable<CourseWithStudents[]>;
  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.courses$ = this.courseService.getCoursesAsObservable();
    this.courseService.getCoursesWithStudents().pipe(takeUntil(this.unsubscribe)).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
