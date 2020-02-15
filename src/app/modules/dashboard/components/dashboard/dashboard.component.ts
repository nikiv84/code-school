import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Course, CourseWithStudents } from './../../../../models/course.model';
import { DashboardService } from './../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public courses$: Observable<CourseWithStudents[]>;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.courses$ = this.dashboardService.getAllCourses()
      .pipe(
        switchMap((courses: Course[]) => forkJoin(courses.map((course: Course) => this.dashboardService.getAttendanceForCourse(course.id)))
          .pipe(
            map((courseAttendance: number[]) => courses.map((course: Course, index: number) =>
              new CourseWithStudents(course.id, course.name, course.date, courseAttendance[index])))
          )
        ),
      );
  }

}
