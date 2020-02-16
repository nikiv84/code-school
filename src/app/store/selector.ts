import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICourseState } from './reducer';

const getCourseState = createFeatureSelector<ICourseState>('courses');

export const allCourses = createSelector(getCourseState, (state: ICourseState) => {
  return state.courses;
});
