import { CourseWithStudents } from './../models/course.model';
import { CourseActions, CourseActionTypes } from './actions';

export interface ICourseState {
  courses: CourseWithStudents[];
  isLoading: boolean;
  message: string;
}

const initialState: ICourseState = {
  courses: null,
  isLoading: false,
  message: ''
};

export function reducer(state = initialState, action: CourseActions): ICourseState {

  switch (action.type) {
    case CourseActionTypes.GetCoursesLoad: {
      return {
        ...state,
        isLoading: true
      };
    }

    case CourseActionTypes.GetCoursesSuccess: {
      return {
        ...state,
        courses: action.payload,
        isLoading: false,
        message: 'Courses fetched successfully!'
      };
    }

    case CourseActionTypes.GetCoursesFail: {
      return {
        courses: [],
        isLoading: false,
        message: 'Something went wrong!'
      };
    }

    case CourseActionTypes.PostCourse: {
      return {
        ...state,
        isLoading: true
      };
    }

    case CourseActionTypes.PostCourseSuccess: {
      const courses = 'courses';
      const updatedData = [...state[courses]];
      updatedData.push(action.payload);
      return {
        ...state,
        courses: updatedData,
        isLoading: false,
        message: 'Data posted Successfully!'
      };
    }

    case CourseActionTypes.PostCourseFail: {
      return {
        courses: [],
        isLoading: false,
        message: 'Something went wrong!'
      };
    }

    default:
      return state;
  }
}
