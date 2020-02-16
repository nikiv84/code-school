import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CourseWithStudents } from './../../../../models/course.model';
import * as fromCourses from './../../../../store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public courses$: Observable<CourseWithStudents[]>;

  constructor(
    private store: Store<fromCourses.ICourseState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new fromCourses.GetCoursesLoad());
    this.courses$ = this.store.pipe(select(fromCourses.allCourses));
  }

}
