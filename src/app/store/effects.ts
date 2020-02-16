import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as fromCourses from '.';
import { CourseWithStudents } from './../models/course.model';
import { DashboardService } from './../modules/dashboard/services/dashboard.service';

@Injectable()
export class CourseEffects {

  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService
  ) { }

  @Effect()
  getCourses$: Observable<Action> = this.actions$.pipe(
    ofType(fromCourses.CourseActionTypes.GetCoursesLoad),
    mergeMap(() =>
      this.dashboardService.getAllCoursesWithStudents().pipe(
        map((courses: CourseWithStudents[]) => {
          return new fromCourses.GetCoursesSuccess(courses);
        }),
        catchError((error) =>
          of(new fromCourses.GetCoursesFail(error)))
      )
    ));
}
