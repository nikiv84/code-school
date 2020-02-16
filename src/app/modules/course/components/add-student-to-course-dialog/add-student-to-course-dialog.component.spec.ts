import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentToCourseDialogComponent } from './add-student-to-course-dialog.component';

describe('AddStudentToCourseDialogComponent', () => {
  let component: AddStudentToCourseDialogComponent;
  let fixture: ComponentFixture<AddStudentToCourseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStudentToCourseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentToCourseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
