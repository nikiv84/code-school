import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { CourseWithStudents } from './../models/course.model';

export enum CourseActionTypes {
  GetCoursesLoad = '[Course] Get Courses',
  GetCoursesSuccess = '[Course] Get Courses Success',
  GetCoursesFail = '[Course] Get Courses Fail',
  PostCourse = '[Course] Post Course',
  PostCourseSuccess = '[Course] Post Course Success',
  PostCourseFail = '[Course] Post Course Fail',
}

export class GetCoursesLoad implements Action {
  public readonly type = CourseActionTypes.GetCoursesLoad;
}

export class GetCoursesSuccess implements Action {
  public readonly type = CourseActionTypes.GetCoursesSuccess;

  constructor(public payload: CourseWithStudents[]) { }
}

export class GetCoursesFail implements Action {
  public readonly type = CourseActionTypes.GetCoursesFail;

  constructor(public error: HttpErrorResponse) { }
}

export class PostCourse implements Action {
  public readonly type = CourseActionTypes.PostCourse;

  constructor(public payload: CourseWithStudents) { }
}

export class PostCourseSuccess implements Action {
  public readonly type = CourseActionTypes.PostCourseSuccess;

  constructor(public payload: CourseWithStudents) { }
}

export class PostCourseFail implements Action {
  public readonly type = CourseActionTypes.PostCourseFail;

  constructor(public error: HttpErrorResponse) { }
}

export type CourseActions = GetCoursesLoad | GetCoursesSuccess | GetCoursesFail | PostCourse | PostCourseSuccess | PostCourseFail;
