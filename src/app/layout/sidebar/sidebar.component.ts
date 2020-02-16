import { Component, EventEmitter, OnInit, Output } from '@angular/core';

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
  @Output() toggleTheme = new EventEmitter();

  public readonly routes: AppRoute[] = [
    { path: '/dashboard', icon: 'dashboard', title: 'Dashboard' },
    { path: '/course', icon: 'class', title: 'Courses' },
    { path: '/student', icon: 'supervised_user_circle', title: 'Students' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  public onToggleTheme(): void {
    this.toggleTheme.emit();
  }

}
