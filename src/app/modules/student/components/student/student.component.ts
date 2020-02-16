import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { concatMap, takeUntil } from 'rxjs/operators';
import { StudentWithCourses } from 'src/app/models/student.model';
import { Student } from './../../../../models/student.model';
import { StudentService } from './../../services/student.service';
import { AddStudentDialogComponent } from './../add-student-dialog/add-student-dialog.component';
import { DialogComponent } from './../dialog/dialog.component';
import { EditStudentDialogComponent } from './../edit-student-dialog/edit-student-dialog.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit, OnDestroy {
  public students$: Observable<StudentWithCourses[]>;
  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private studentService: StudentService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.students$ = this.studentService.getStudentsAsObservable();
    this.studentService.getAllStudents().pipe(takeUntil(this.unsubscribe)).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private removeStudent(studentId: string): void {
    this.studentService.removeStudent(studentId)
      .pipe(
        takeUntil(this.unsubscribe),
        concatMap(() => this.studentService.getAllStudents())
      )
      .subscribe();
  }

  public addStudentDialog(): void {
    const dialogRef = this.dialog.open(AddStudentDialogComponent, {
      width: '440px'
    });

    dialogRef.afterClosed().subscribe((studentData: Student) => {
      if (studentData) {
        this.studentService.addStudent(studentData)
          .pipe(
            takeUntil(this.unsubscribe),
            concatMap(() => this.studentService.getAllStudents())
          )
          .subscribe();
      }
    });
  }

  public editStudentDialog(student: Student): void {
    const dialogRef = this.dialog.open(EditStudentDialogComponent, {
      width: '440px',
      data: {
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        phone: student.phone
      }
    });

    dialogRef.afterClosed().subscribe((studentData: Student) => {
      if (studentData) {
        this.studentService.updateStudent(student.id, studentData)
          .pipe(
            takeUntil(this.unsubscribe),
            concatMap(() => this.studentService.getAllStudents())
          )
          .subscribe();
      }
    });
  }

  public openDialog(student: Student): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '440px',
      data: {
        student
      }
    });

    dialogRef.afterClosed().subscribe((shouldRemove: boolean) => {
      if (shouldRemove) {
        this.removeStudent(student.id);
      }
    });
  }

}
