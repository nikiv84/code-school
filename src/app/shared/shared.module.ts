import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { MessageComponent } from './components/message/message.component';
import { RemoveDialogComponent } from './components/remove-dialog/remove-dialog.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    MessageComponent,
    RemoveDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule,
    LoadingSpinnerComponent,
    MessageComponent,
    FormsModule,
    ReactiveFormsModule,
    RemoveDialogComponent
  ]
})
export class SharedModule { }
