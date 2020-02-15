import { Component, OnInit } from '@angular/core';

export class AppRoute {
  constructor(
    public path: string,
    public title: string,
    public icon: string
  ) { }
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public readonly routes: AppRoute[] = [
    { path: '/dashboard', icon: 'dashboard', title: 'Dashboard' },
    { path: '/courses', icon: 'class', title: 'Courses' },
    { path: '/students', icon: 'supervised_user_circle', title: 'Students' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
