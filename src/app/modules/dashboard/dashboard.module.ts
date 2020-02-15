import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [DashboardComponent, CourseCardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
